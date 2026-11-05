# Free compute: is Oracle the only option, and what survives when the trial ends?

## 1. What happens when the Oracle Free Trial ends

| Thing | After the trial (account becomes "Always Free") |
|---|---|
| Credits | Gone. Nothing is charged unless you upgrade to Pay As You Go yourself |
| VMs that fit Always Free (A1.Flex up to 4 OCPU/24 GB total, boot volumes within 200 GB) | **Keep running** |
| Anything that only fit the paid shapes/limits (x86 Standard shapes, GPUs, storage beyond 200 GB) | Stopped and then reclaimed (Oracle gives a grace window, then deletes) |
| Idle Always Free VMs | Oracle may stop them if CPU/network stay very low for 7 days. A tiny cron keep-alive prevents this |
| Our actual work | **Never depends on the VM.** Code and scripts live in git on GitHub; narration and renders are copied back (`scp`) or pushed to object storage. If the VM dies, `create-vm.sh` + `setup.sh` rebuild it in 15 minutes |

So the rule is: **create only Always-Free-eligible resources** (that is what `infra/oracle/create-vm.sh` does), and treat the VM as disposable.

## 2. Alternatives (all legitimate, all free or near-free)

| Option | Free amount | Good for | Catch |
|---|---|---|---|
| **Oracle Always Free A1** (chosen) | 4 OCPU / 24 GB, forever | 24/7 render box, batch jobs, client review page | A1 capacity in Mumbai is often "out"; the script retries every 5 min across ADs |
| **GitHub Actions** (`.github/workflows/render.yml`, added) | 2,000 min/month private repo (unlimited on public) | Clean-machine proof renders, CI for every episode, batch renders on demand with no server to maintain | 6-hour job limit; cold start ~1 min; no persistent disk; secrets needed for TTS |
| **Remotion Lambda on AWS** | AWS Free Tier: 1M Lambda requests + 400k GB-s/month, S3 5 GB (12 months) | Fastest renders by far (a 16-min video in a couple of minutes, split across lambdas); Remotion's own tooling | AWS account + card; costs pennies beyond free tier; more setup |
| **Google Cloud Run jobs** | 180k vCPU-s + 360k GiB-s/month free | Occasional headless renders in containers | Needs a container build; cold starts |
| **Hetzner CAX11 (arm)** | ~€3.8/month, not free | Reliable 2 vCPU/4 GB box when Oracle has no capacity | Paid, but the most reliable cheap box |
| Google Colab free GPU | a few hours/day, T4 | One-off tests of open-weight AI video/TTS models | Not for production; sessions die |
| Azure free ($200/30 days + B1s 12 months) / GCP e2-micro / AWS t2.micro | tiny VMs | Nothing heavy; 1 GB RAM cannot run Chrome renders reliably | Too small for Remotion |

**Recommendation:** Oracle A1 as the always-on box, GitHub Actions as the zero-maintenance batch
renderer (already wired), Remotion Lambda later when a client needs 100 variants in an hour.

## 3. One manual step (blocked for me by the permission check)

Adding an API key to your Oracle user is a credential change, so do it yourself (2 minutes):

1. Console → top-right user menu → **My profile** → **API keys** → **Add API key**.
2. Choose **Paste a public key** and paste the contents of
   `C:\Users\dwarkesh.vajjala\.oci\oci_api_key_public.pem` (the key pair is already generated; the private key never leaves your machine).
3. Click **Add**. The dialog shows a config preview; it must match `~/.oci/config`, which is already written with your user OCID, tenancy OCID, fingerprint `a7:c8:30:f2:e5:04:4e:5b:9f:99:80:43:e1:67:88:ab` and region `ap-mumbai-1`.

Then I (or you) run:

```bash
oci iam region list --query 'data[0]' --output table      # auth check
```

```bash
bash infra/oracle/create-vm.sh                            # retries until A1 capacity appears
```

```bash
ssh -i ~/.ssh/oracle_render ubuntu@<ip> 'bash -s' < infra/oracle/setup.sh
```
