# Remote render box (Oracle Cloud) and working in parallel

## 1. What the Oracle account gives you

Checked in the console on 2026-11-05 (tenancy `contactdwarkesh`, home region Mumbai):
**Free Tier account, currently in the Free Trial.** When the trial ends the account drops to
Always Free resources.

| | Free Trial (30 days) | Always Free (no end date, subject to capacity) |
|---|---|---|
| Credits | US$300 of credits for any service | none |
| Compute | anything the credits cover (incl. x86 VMs; GPUs usually need a limit increase and are not free) | **Ampere A1 (arm64): up to 4 OCPU + 24 GB RAM total**, split across 1–4 VMs; plus 2 micro AMD VMs (1/8 OCPU, 1 GB) |
| Storage | | 200 GB block + boot, 10 GB object storage |
| Network | | 10 TB/month outbound |
| Known catch | credits expire; cards are verified but not charged unless you upgrade | A1 capacity in a region is often "Out of capacity"; retry at off-peak hours or script retries. Oracle reclaims **idle** Always Free VMs, so keep a small cron job running |

The exact credit balance and trial end date are on the Billing → Subscriptions page (I could not read
the amount from the console text; check it there).

## 2. What it is good for

| Task | On the box? | Why |
|---|---|---|
| **Remotion renders** (headless Chrome + FFmpeg) | ✅ | Remotion supports Linux arm64. 4 OCPU/24 GB is close to a laptop; the win is that it runs while your laptop is off, and batches overnight |
| **Cartesia TTS, word clock** | ✅ | API calls; nothing heavy |
| **Kokoro TTS (draft voice)** | ✅ slow | CPU-only; fine for scratch narration |
| **Batch variants** (formats × languages × CTAs) | ✅ | This is what the box is for once clients exist |
| **Open-weight AI video** (Wan, LTX, Hunyuan) | ❌ | Needs a 24 GB+ GPU. No free GPU on Oracle. Use trial credits for a one-off GPU test at most |
| **Serving a client review page** | ✅ | Static files behind nginx or a tunnel |
| **Running a self-hosted LLM to write scripts** | ❌ not worth it | CPU inference is too slow; Claude/ChatGPT subscriptions are already paid |

So: **no "free AI video generation" here.** The free value is a second machine that renders and
batches 24/7. The laptop stays for Studio preview and scene work.

## 3. Setup (15 minutes)

1. Console → Compute → Create instance → Image: Ubuntu 24.04 (aarch64) → Shape: `VM.Standard.A1.Flex`, 4 OCPU, 24 GB → add your SSH key → create. If "Out of capacity", try 2 OCPU/12 GB or another AD, or retry later.
2. `ssh ubuntu@<ip> 'bash -s' < infra/oracle/setup.sh` (installs Node 22, Chrome deps, FFmpeg, clones the repo, renders a silent smoke slice).
3. `scp .secrets.env ubuntu@<ip>:~/youtube/` (never commit it).
4. Render: `ssh ubuntu@<ip> 'cd ~/youtube/episodes/E01-regex-outage && node tools/tts.mjs --voice <id> && node tools/build.mjs'`, then `scp` the MP4 back or push it to OCI Object Storage.
5. Keep-alive: `crontab -e` → `*/10 * * * * uptime >> ~/keepalive.log` so Oracle does not reclaim it as idle.

Push the branch first; the box clones from GitHub. The repo is `dvajjala-ui/youtube`, branch
`docs/playbook-and-e01` until merged.

## 4. Working in parallel (agents and chats)

One chat can spawn several agents at once for **independent** work. What splits cleanly now:

| Lane | Needs | Output |
|---|---|---|
| A. Portfolio piece 1: 30 s feature reel for a public devtool | `studio/` (done) | `clients/_portfolio/reel-01/` rendered |
| B. Portfolio piece 2: 60–90 s launch explainer | `studio/` | `clients/_portfolio/explainer-01/` rendered |
| C. Site: Next.js + Remotion Player, pricing, brief form | nothing | `site/` deployable to Vercel |
| D. Oracle render box: create VM, run `setup.sh`, prove a remote render | your console session (VM creation needs your account) | box renders E01 |
| E. E01 long-form: beats 1–12 scenes | `studio/`, narration | 16-min cut |

Rules so parallel work doesn't collide: one lane per folder, nobody edits `studio/` except through a
small PR, and every lane ends with rendered stills in its folder so the result can be checked
without a chat log. Lanes A, B, C can start now; D needs you to click "Create instance" (I can do
the rest once a VM exists); E needs the voice decision.
