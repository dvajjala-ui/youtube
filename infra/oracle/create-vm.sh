#!/usr/bin/env bash
# Creates the Always-Free render box on OCI with the CLI, retrying while the region is out of
# A1 capacity. Idempotent: re-running reuses the VCN/subnet/instance it already created.
#
# Prereqs: `pip install oci-cli`, ~/.oci/config with [DEFAULT] user/tenancy/fingerprint/key_file/region,
#          ~/.ssh/oracle_render.pub (ssh-keygen -t ed25519 -f ~/.ssh/oracle_render).
# Usage:   bash infra/oracle/create-vm.sh            # 4 OCPU / 24 GB (Always Free max)
#          OCPUS=2 MEM=12 bash infra/oracle/create-vm.sh
set -euo pipefail

NAME="${NAME:-render-box}"
OCPUS="${OCPUS:-4}"
MEM="${MEM:-24}"
SHAPE="VM.Standard.A1.Flex"
SSH_PUB="${SSH_PUB:-$HOME/.ssh/oracle_render.pub}"
RETRY_SECONDS="${RETRY_SECONDS:-300}"
MAX_TRIES="${MAX_TRIES:-200}"

q() { oci "$@" --output json; }

TENANCY=$(oci iam availability-domain list --query 'data[0]."compartment-id"' --raw-output)
COMP="${COMPARTMENT:-$TENANCY}"   # root compartment by default
echo "tenancy/compartment: $COMP"

# ---- network (one VCN "studio-vcn", one public subnet) --------------------------------------
VCN=$(oci network vcn list -c "$COMP" --display-name studio-vcn --query 'data[0].id' --raw-output 2>/dev/null || true)
if [ -z "$VCN" ] || [ "$VCN" = "null" ]; then
  echo "creating VCN"
  VCN=$(oci network vcn create -c "$COMP" --display-name studio-vcn --cidr-block 10.0.0.0/16 --dns-label studio \
        --wait-for-state AVAILABLE --query data.id --raw-output)
  IGW=$(oci network internet-gateway create -c "$COMP" --vcn-id "$VCN" --is-enabled true --display-name studio-igw \
        --wait-for-state AVAILABLE --query data.id --raw-output)
  RT=$(oci network vcn get --vcn-id "$VCN" --query 'data."default-route-table-id"' --raw-output)
  oci network route-table update --rt-id "$RT" --force \
      --route-rules "[{\"destination\":\"0.0.0.0/0\",\"destinationType\":\"CIDR_BLOCK\",\"networkEntityId\":\"$IGW\"}]" >/dev/null
  SL=$(oci network vcn get --vcn-id "$VCN" --query 'data."default-security-list-id"' --raw-output)
  # SSH (22) + HTTP (80) in; everything out
  oci network security-list update --security-list-id "$SL" --force \
      --ingress-security-rules '[{"protocol":"6","source":"0.0.0.0/0","tcpOptions":{"destinationPortRange":{"min":22,"max":22}}},{"protocol":"6","source":"0.0.0.0/0","tcpOptions":{"destinationPortRange":{"min":80,"max":80}}}]' \
      --egress-security-rules '[{"protocol":"all","destination":"0.0.0.0/0"}]' >/dev/null
fi
SUBNET=$(oci network subnet list -c "$COMP" --vcn-id "$VCN" --query 'data[0].id' --raw-output 2>/dev/null || true)
if [ -z "$SUBNET" ] || [ "$SUBNET" = "null" ]; then
  SUBNET=$(oci network subnet create -c "$COMP" --vcn-id "$VCN" --cidr-block 10.0.1.0/24 --display-name studio-public \
           --dns-label pub --wait-for-state AVAILABLE --query data.id --raw-output)
fi
echo "vcn: $VCN  subnet: $SUBNET"

# ---- existing instance? ---------------------------------------------------------------------
EXISTING=$(oci compute instance list -c "$COMP" --display-name "$NAME" --lifecycle-state RUNNING --query 'data[0].id' --raw-output 2>/dev/null || true)
if [ -n "$EXISTING" ] && [ "$EXISTING" != "null" ]; then
  echo "instance already running: $EXISTING"
  oci compute instance list-vnics --instance-id "$EXISTING" --query 'data[0]."public-ip"' --raw-output
  exit 0
fi

# ---- image: latest Ubuntu 24.04 for aarch64 -------------------------------------------------
IMAGE=$(oci compute image list -c "$COMP" --operating-system "Canonical Ubuntu" --operating-system-version "24.04" \
        --shape "$SHAPE" --sort-by TIMECREATED --sort-order DESC --query 'data[0].id' --raw-output)
echo "image: $IMAGE"

# ---- launch, retrying across ADs while out of capacity --------------------------------------
mapfile -t ADS < <(oci iam availability-domain list --query 'data[].name' --raw-output | tr -d '[]", ' | sed '/^$/d')
echo "availability domains: ${ADS[*]}"
for ((try=1; try<=MAX_TRIES; try++)); do
  for AD in "${ADS[@]}"; do
    echo "[$(date +%H:%M:%S)] try $try  AD $AD  ${OCPUS} OCPU / ${MEM} GB"
    set +e
    OUT=$(oci compute instance launch -c "$COMP" --availability-domain "$AD" --shape "$SHAPE" \
          --shape-config "{\"ocpus\":$OCPUS,\"memoryInGBs\":$MEM}" --image-id "$IMAGE" --subnet-id "$SUBNET" \
          --assign-public-ip true --display-name "$NAME" \
          --metadata "{\"ssh_authorized_keys\":\"$(cat "$SSH_PUB")\"}" \
          --boot-volume-size-in-gbs 100 --query data.id --raw-output 2>&1)
    RC=$?
    set -e
    if [ $RC -eq 0 ]; then
      ID="$OUT"
      echo "launched: $ID"
      oci compute instance get --instance-id "$ID" --wait-for-state RUNNING >/dev/null
      IP=$(oci compute instance list-vnics --instance-id "$ID" --query 'data[0]."public-ip"' --raw-output)
      echo "RUNNING  public ip: $IP"
      echo "ssh -i ~/.ssh/oracle_render ubuntu@$IP"
      exit 0
    fi
    if echo "$OUT" | grep -qi "capacity"; then
      echo "   out of capacity in $AD"
    else
      echo "$OUT" | tail -5
      echo "non-capacity error, stopping"; exit 1
    fi
  done
  sleep "$RETRY_SECONDS"
done
echo "gave up after $MAX_TRIES rounds"; exit 1
