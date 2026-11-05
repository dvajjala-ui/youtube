# `studio/` — the shared package

Everything an episode or client project reuses. Extracted from `episodes/E01-regex-outage` on
2026-11-05; E01 renders from it unchanged.

```
studio/
  src/
    theme.ts     Theme type, defaultTheme (E01 palette), <ThemeProvider>, useTheme(), legacy constants
    kit.tsx      Stage, Head, Mono, Panel, Terminal, Captions, Progress, enter()
    clock.ts     createClock(words.json) -> spoken(), segRange(), captionChunks(), toSrt()
    layouts.ts   FORMATS (yt / reel / square), useLayout(), compId()
  tools/
    tts.mjs          Cartesia TTS with word timestamps -> narration/*.wav + transcript/words.json
    audition.mjs     TTS -> STT -> keyword coverage per voice
    placeholder.mjs  silent master + estimated clock for smoke tests
    build.mjs        copies audio + clock into composition/, renders one or all compositions
    _episode.mjs     shared: --episode <dir>, repo root, API key, WAV helper
```

## Use in a project

```json
// composition/package.json
{ "dependencies": { "@studio/kit": "*" },
  "studio": { "comp": "E01Short", "out": "out/e01-short.mp4" } }
```

```ts
// composition/src/lib/clock.ts
import data from "../data/words.json";
import { createClock } from "@studio/kit";
export const clock = createClock(data);
export const { fr, spoken, segRange, captionChunks, totalFrames } = clock;
```

```bash
npm install                                    # once, at the repo root (npm workspaces)
cd episodes/E01-regex-outage
node tools/tts.mjs --voice <id>                # thin shims forward to studio/tools with --episode .
node tools/build.mjs --slice 60
```

Rules that keep the pipeline honest: reveals are keyed to `spoken("word")`, never to elapsed
seconds; `build.mjs` refuses silent audio; one theme per brand; one component or one scene per
agent prompt, and always render stills to check.
