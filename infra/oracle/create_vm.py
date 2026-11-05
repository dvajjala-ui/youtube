#!/usr/bin/env python
"""
Create the Always-Free render box on OCI with the Python SDK (no CLI needed).
Retries across availability domains while the region is out of A1 capacity.
Idempotent: reuses the VCN, subnet and instance it already created.

  pip install oci
  python infra/oracle/create_vm.py                 # 4 OCPU / 24 GB (Always Free max)
  python infra/oracle/create_vm.py --ocpus 2 --mem 12 --retry 300

Needs ~/.oci/config ([DEFAULT] user, tenancy, fingerprint, key_file, region)
and ~/.ssh/oracle_render.pub.
"""
import argparse, os, sys, time
import oci

p = argparse.ArgumentParser()
p.add_argument("--name", default="render-box")
p.add_argument("--ocpus", type=float, default=4)
p.add_argument("--mem", type=float, default=24)
p.add_argument("--retry", type=int, default=300, help="seconds between capacity retries")
p.add_argument("--max-rounds", type=int, default=288, help="288 x 5 min = 24 h")
p.add_argument("--ssh-pub", default=os.path.expanduser("~/.ssh/oracle_render.pub"))
p.add_argument("--boot-gb", type=int, default=100)
a = p.parse_args()

cfg = oci.config.from_file()
oci.config.validate_config(cfg)
comp = os.environ.get("COMPARTMENT", cfg["tenancy"])
ident = oci.identity.IdentityClient(cfg)
net = oci.core.VirtualNetworkClient(cfg)
compute = oci.core.ComputeClient(cfg)
SHAPE = "VM.Standard.A1.Flex"

def log(msg):
    print(time.strftime("[%H:%M:%S] ") + msg, flush=True)

# ---- auth check ----------------------------------------------------------------------------
ads = [ad.name for ad in ident.list_availability_domains(comp).data]
log(f"authenticated. availability domains: {ads}")

# ---- network -------------------------------------------------------------------------------
vcns = net.list_vcns(comp, display_name="studio-vcn").data
if vcns:
    vcn = vcns[0]
else:
    log("creating VCN studio-vcn")
    vcn = net.create_vcn(oci.core.models.CreateVcnDetails(
        compartment_id=comp, display_name="studio-vcn", cidr_block="10.0.0.0/16", dns_label="studio")).data
    oci.wait_until(net, net.get_vcn(vcn.id), "lifecycle_state", "AVAILABLE")
    vcn = net.get_vcn(vcn.id).data
    igw = net.create_internet_gateway(oci.core.models.CreateInternetGatewayDetails(
        compartment_id=comp, vcn_id=vcn.id, is_enabled=True, display_name="studio-igw")).data
    oci.wait_until(net, net.get_internet_gateway(igw.id), "lifecycle_state", "AVAILABLE")
    net.update_route_table(vcn.default_route_table_id, oci.core.models.UpdateRouteTableDetails(route_rules=[
        oci.core.models.RouteRule(destination="0.0.0.0/0", destination_type="CIDR_BLOCK", network_entity_id=igw.id)]))
    tcp = lambda port: oci.core.models.IngressSecurityRule(
        protocol="6", source="0.0.0.0/0",
        tcp_options=oci.core.models.TcpOptions(destination_port_range=oci.core.models.PortRange(min=port, max=port)))
    net.update_security_list(vcn.default_security_list_id, oci.core.models.UpdateSecurityListDetails(
        ingress_security_rules=[tcp(22), tcp(80), tcp(443)],
        egress_security_rules=[oci.core.models.EgressSecurityRule(protocol="all", destination="0.0.0.0/0")]))
subnets = net.list_subnets(comp, vcn_id=vcn.id).data
if subnets:
    subnet = subnets[0]
else:
    log("creating public subnet")
    subnet = net.create_subnet(oci.core.models.CreateSubnetDetails(
        compartment_id=comp, vcn_id=vcn.id, cidr_block="10.0.1.0/24", display_name="studio-public", dns_label="pub")).data
    oci.wait_until(net, net.get_subnet(subnet.id), "lifecycle_state", "AVAILABLE")
log(f"vcn {vcn.id[-12:]}  subnet {subnet.id[-12:]}")

def public_ip(instance_id):
    for att in compute.list_vnic_attachments(comp, instance_id=instance_id).data:
        if att.vnic_id:
            ip = net.get_vnic(att.vnic_id).data.public_ip
            if ip:
                return ip
    return None

# ---- existing instance? --------------------------------------------------------------------
for inst in compute.list_instances(comp, display_name=a.name).data:
    if inst.lifecycle_state in ("RUNNING", "PROVISIONING", "STARTING"):
        log(f"instance already exists ({inst.lifecycle_state}): {inst.id}")
        oci.wait_until(compute, compute.get_instance(inst.id), "lifecycle_state", "RUNNING", max_wait_seconds=900)
        print("PUBLIC_IP", public_ip(inst.id))
        sys.exit(0)

# ---- image: latest Ubuntu 24.04 that supports the A1 shape ---------------------------------
images = compute.list_images(comp, operating_system="Canonical Ubuntu", operating_system_version="24.04",
                             shape=SHAPE, sort_by="TIMECREATED", sort_order="DESC").data
if not images:
    sys.exit("no Ubuntu 24.04 image for A1 found")
image = images[0]
log(f"image: {image.display_name}")

with open(a.ssh_pub) as f:
    ssh_pub = f.read().strip()

# ---- launch with capacity retry ------------------------------------------------------------
for rnd in range(1, a.max_rounds + 1):
    for ad in ads:
        log(f"round {rnd}  {ad}  {a.ocpus:g} OCPU / {a.mem:g} GB")
        try:
            inst = compute.launch_instance(oci.core.models.LaunchInstanceDetails(
                compartment_id=comp, availability_domain=ad, shape=SHAPE, display_name=a.name,
                shape_config=oci.core.models.LaunchInstanceShapeConfigDetails(ocpus=a.ocpus, memory_in_gbs=a.mem),
                source_details=oci.core.models.InstanceSourceViaImageDetails(image_id=image.id, boot_volume_size_in_gbs=a.boot_gb),
                create_vnic_details=oci.core.models.CreateVnicDetails(subnet_id=subnet.id, assign_public_ip=True),
                metadata={"ssh_authorized_keys": ssh_pub})).data
            log(f"launched {inst.id}; waiting for RUNNING")
            oci.wait_until(compute, compute.get_instance(inst.id), "lifecycle_state", "RUNNING", max_wait_seconds=900)
            ip = public_ip(inst.id)
            log(f"RUNNING  public ip {ip}")
            print("PUBLIC_IP", ip)
            print(f"ssh -i ~/.ssh/oracle_render ubuntu@{ip}")
            sys.exit(0)
        except oci.exceptions.ServiceError as e:
            msg = (e.message or "").lower()
            if "capacity" in msg or e.code in ("InternalError", "LimitExceeded", "TooManyRequests"):
                log(f"   no capacity in {ad} ({e.code}: {e.message[:80]})")
                continue
            log(f"   error {e.status} {e.code}: {e.message}")
            sys.exit(1)
    time.sleep(a.retry)
sys.exit("gave up: no A1 capacity after all rounds")
