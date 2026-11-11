# Frame-capture method (how the evidence in `qwen/audit-2026-11-11/` was collected)

Reusable recipe for pulling real frames out of YouTube reference videos in a
controlled browser, without ffmpeg or yt-dlp. Used on 2026-11-11 for the BugX
and pouria teardowns.

## Setup

1. Start the local receiver (saves base64 JPEG POSTs to disk):

   ```sh
   node qwen/tools/frame-server.mjs qwen/audit-2026-11-11/frames
   # listens on http://127.0.0.1:8765, POST { name, data }
   ```

2. Open the video page in the browser tool, mute it, and **keep it playing**.
   Bring the page to the front (`select_page` with `bringToFront: true`).

## Page-side capture snippet

Run via `evaluate_script` on the watch page. YouTube's `<video>` is not
CORS-tainted, so canvas capture works:

```js
async function grab(name, t) {
  const v = document.querySelector('video');
  v.currentTime = t;
  // keep playing muted: a paused video in a hidden tab never decodes a new frame
  await new Promise(r => setTimeout(r, 1200));
  const c = document.createElement('canvas');
  c.width = v.videoWidth; c.height = v.videoHeight;
  c.getContext('2d').drawImage(v, 0, 0);
  const data = c.toDataURL('image/jpeg', 0.85).split(',')[1];
  await fetch('http://127.0.0.1:8765', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, data })
  });
  return data.length; // sanity check: distinct frames => distinct lengths
}
```

## Caveats learned the hard way

- **Paused + hidden tab = frozen frames.** `requestVideoFrameCallback` never
  fires and every capture is byte-identical. Keep the video playing (muted)
  while seeking, and verify captures differ (dataURL length / file hash).
- **Ads pollute captures.** Mid-roll ads played at ~500s (BugX restart video)
  and ~46s (backups video). Check duration/seekbar before grabbing; if an ad
  is up, wait or skip it, then re-capture. Ad frames are excluded from the
  evidence index in `qwen/reference-design-schema.md` §8.
- **DOM selectors for channel grids fail.** Use the accessibility tree
  (`take_snapshot`) to read video titles/view counts/ids from channel pages.
- **Transcripts are gated.** The transcript panel would not load and the
  `timedtext` API returned 200 with an empty body (POT token gate). Fallback:
  read `ytInitialPlayerResponse.microformat` for description + chapters.
  A full narration pass of the reference videos is still an open item.
- Thumbnails were saved directly from `i.ytimg.com/vi/<id>/hqdefault.jpg`.

## Files

- `frame-server.mjs` — receiver; first arg = output dir (default `frames`).
- `../audit-2026-11-11/frames/` — 17 evidence frames (timestamps in filenames
  are seconds). Stale debug/ad captures were removed before committing.
- `../audit-2026-11-11/thumbs/` — 10 thumbnails, named by video id.