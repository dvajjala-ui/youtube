# Codex Repository Instructions — Animated Tech Story Studio
## Mission
Build a repeatable, original, code-driven tech-story animation tool. Human editors control research, final scripts, voice choice and publication.

## Priorities
1. Technical accuracy and original source/asset provenance.
2. Narration sync, readability and sound clarity.
3. Deterministic render pipeline.
4. Maintainable reusable React/Remotion components.
5. Faster production **after** quality meets baseline.

## Hard boundaries
- Never copy Pouria's or other creators' scripts, frames, branded character art, audio or distinctive voice.
- Never clone identifiable voices without demonstrable permission and usage rights.
- Do not invent a real incident; annotate dramatizations explicitly.
- Do not use an API key from another service or assume the ChatGPT subscription covers API billing.
- Never make a purchase, call paid media generation, publish/upload to YouTube, or mutate external accounts without user approval.
- No committed secrets, `.env`, audio obtained without rights, or third-party copyrighted clips.
- Do not claim code is tested when dependencies were unavailable.

## Engineering practices
- Default 1920×1080, 30fps, 48kHz voice WAV.
- Validate input schema, local asset existence and scene frame boundaries.
- Each component needs a small example scene; tests for transformations that can be unit-tested.
- Render short chapters before full length and report failures concretely.
- Store versioned script, scene JSON, narration manifest and asset provenance.
- Keep scene specs data-driven and animation component code separate.
- Follow current official Remotion docs; don't assume older API behavior.

## Human approval gates
Script/facts → Voice → 60-second visual proof → Final video/publish.

## Initial target
Implement E001 45–60 second proof from `/pilot/` and show a rendered local preview plus exact commands. User's computer supplies Node/npm tools and audio assets; this documentation package does not contain licensed narration audio or installed runtime dependencies.
