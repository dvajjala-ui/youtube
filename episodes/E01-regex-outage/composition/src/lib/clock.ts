import data from "../data/words.json";

export const FPS = 30;

export type WordEntry = {
  w: string;
  raw: string;
  s: number;
  e: number;
  seg: string;
  gap?: boolean;
};

type Clock = { fps: number; duration_s: number; words: WordEntry[] };
const clock = data as unknown as Clock;

export const WORDS = clock.words;
export const TOTAL_SECONDS = clock.duration_s;

/** seconds -> frames */
export const fr = (sec: number) => Math.round(sec * FPS);

export const totalFrames = Math.max(1, Math.round(TOTAL_SECONDS * FPS));

/** First and last spoken second of a narration segment. Throws if the id is wrong. */
export function segRange(seg: string): { start: number; end: number } {
  const hits = WORDS.filter((x) => x.seg === seg && !x.gap);
  if (hits.length === 0) throw new Error(`clock: no spoken words for segment "${seg}"`);
  return { start: hits[0].s, end: hits[hits.length - 1].e };
}

/** Frame at which a word starts being spoken, after an optional floor time. */
export function spoken(word: string, afterSec = 0): number {
  const needle = word.toLowerCase();
  const hit = WORDS.find((x) => !x.gap && x.w.includes(needle) && x.s >= afterSec - 0.001);
  if (!hit) throw new Error(`clock: "${word}" is not spoken after ${afterSec}s — fix the script or the trigger`);
  return fr(hit.s);
}

/** Groups the segment's words into caption chunks of `size` spoken words. */
export function captionChunks(seg: string, size = 4): { text: string; s: number; e: number }[] {
  const hits = WORDS.filter((x) => x.seg === seg && !x.gap);
  const out: { text: string; s: number; e: number }[] = [];
  for (let i = 0; i < hits.length; i += size) {
    const slice = hits.slice(i, i + size);
    out.push({
      text: slice.map((x) => x.raw || x.w).join(" "),
      s: slice[0].s,
      e: slice[slice.length - 1].e,
    });
  }
  return out;
}
