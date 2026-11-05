/**
 * The word clock: narration word timestamps drive every reveal.
 * `tools/tts.mjs` writes `transcript/words.json`; a project builds a clock from it with
 * `createClock(data)` and keys animation to `spoken("word")`, never to elapsed seconds.
 */
export type WordEntry = {
  w: string;
  raw: string;
  s: number;
  e: number;
  seg: string;
  gap?: boolean;
};

export type ClockData = { fps?: number; duration_s: number; words: WordEntry[] };

export type CaptionChunk = { text: string; s: number; e: number };

export type Clock = {
  fps: number;
  words: WordEntry[];
  totalSeconds: number;
  totalFrames: number;
  /** seconds -> frames */
  fr: (sec: number) => number;
  /** First and last spoken second of a narration segment. Throws if the id is wrong. */
  segRange: (seg: string) => { start: number; end: number };
  /** Frame at which a word starts being spoken, after an optional floor time. Throws if missing. */
  spoken: (word: string, afterSec?: number) => number;
  /** Groups the segment's words into caption chunks of `size` spoken words. */
  captionChunks: (seg: string, size?: number) => CaptionChunk[];
  /** All caption chunks for a list of segment ids, in order. */
  allCaptions: (segs: string[], size?: number) => CaptionChunk[];
};

export function createClock(data: ClockData, fps = data.fps ?? 30): Clock {
  const words = data.words;
  const fr = (sec: number) => Math.round(sec * fps);

  const segRange = (seg: string) => {
    const hits = words.filter((x) => x.seg === seg && !x.gap);
    if (hits.length === 0) throw new Error(`clock: no spoken words for segment "${seg}"`);
    return { start: hits[0].s, end: hits[hits.length - 1].e };
  };

  const spoken = (word: string, afterSec = 0) => {
    const needle = word.toLowerCase();
    const hit = words.find((x) => !x.gap && x.w.includes(needle) && x.s >= afterSec - 0.001);
    if (!hit) {
      throw new Error(`clock: "${word}" is not spoken after ${afterSec}s — fix the script or the trigger`);
    }
    return fr(hit.s);
  };

  const captionChunks = (seg: string, size = 4) => {
    const hits = words.filter((x) => x.seg === seg && !x.gap);
    const out: CaptionChunk[] = [];
    for (let i = 0; i < hits.length; i += size) {
      const slice = hits.slice(i, i + size);
      out.push({
        text: slice.map((x) => x.raw || x.w).join(" "),
        s: slice[0].s,
        e: slice[slice.length - 1].e,
      });
    }
    return out;
  };

  const allCaptions = (segs: string[], size = 4) => segs.flatMap((s) => captionChunks(s, size));

  return {
    fps,
    words,
    totalSeconds: data.duration_s,
    totalFrames: Math.max(1, Math.round(data.duration_s * fps)),
    fr,
    segRange,
    spoken,
    captionChunks,
    allCaptions,
  };
}

/** SRT text from a clock, `size` words per cue. Upload this as closed captions on long-form. */
export function toSrt(clock: Clock, segs: string[], size = 6): string {
  const pad = (n: number, w = 2) => String(n).padStart(w, "0");
  const ts = (sec: number) => {
    const ms = Math.round(sec * 1000);
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return `${pad(h)}:${pad(m)}:${pad(s)},${pad(ms % 1000, 3)}`;
  };
  return clock
    .allCaptions(segs, size)
    .map((c, i) => `${i + 1}\n${ts(c.s)} --> ${ts(c.e)}\n${c.text}\n`)
    .join("\n");
}
