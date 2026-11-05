#!/usr/bin/env bash
# One-shot setup for a render box on Oracle Cloud (Ubuntu 22.04/24.04, Ampere A1 arm64 or x86).
# Installs Node 22, Chrome-headless deps, FFmpeg, clones the repo and renders a smoke slice.
#
#   ssh ubuntu@<ip> 'bash -s' < infra/oracle/setup.sh
#
# Secrets: copy .secrets.env separately (scp), never bake it into this script.
set -euo pipefail

REPO_URL="${REPO_URL:-https://github.com/dvajjala-ui/youtube.git}"
BRANCH="${BRANCH:-docs/playbook-and-e01}"
DIR="$HOME/youtube"

echo "== apt"
sudo apt-get update -y
sudo DEBIAN_FRONTEND=noninteractive apt-get install -y \
  git curl ca-certificates ffmpeg fonts-liberation fonts-dejavu-core \
  libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 libxkbcommon0 libxcomposite1 \
  libxdamage1 libxfixes3 libxrandr2 libgbm1 libasound2t64 libpango-1.0-0 libcairo2 \
  2>/dev/null || sudo DEBIAN_FRONTEND=noninteractive apt-get install -y libasound2

echo "== node 22"
if ! command -v node >/dev/null || [ "$(node -v | cut -c2-3)" -lt 22 ]; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi
node -v && npm -v

echo "== repo"
if [ -d "$DIR/.git" ]; then git -C "$DIR" pull --ff-only; else git clone --branch "$BRANCH" "$REPO_URL" "$DIR"; fi
cd "$DIR"
npm install --no-audit --no-fund

echo "== remotion browser (downloads a headless chrome build the first time)"
cd episodes/E01-regex-outage/composition
npx remotion browser ensure

echo "== smoke render (placeholder clock, silent audio; real narration needs the Cartesia key)"
cd ..
node tools/placeholder.mjs
node tools/build.mjs --slice 30 --allow-silent
ls -la composition/out/

cat <<'EOF'

Done. Next:
  scp .secrets.env ubuntu@<ip>:~/youtube/.secrets.env     # Cartesia key, never committed
  ssh ubuntu@<ip> 'cd ~/youtube/episodes/E01-regex-outage && node tools/tts.mjs --voice <id> && node tools/build.mjs'
  scp ubuntu@<ip>:~/youtube/episodes/E01-regex-outage/composition/out/e01-short.mp4 .
Set Config.setConcurrency() in remotion.config.ts to the box's OCPU count (4 on Always Free A1).
EOF
