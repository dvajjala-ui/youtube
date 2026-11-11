import data from "../data/words.json";
import { createClock } from "@studio/kit";
import type { WordEntry } from "@studio/kit";

export type { WordEntry };

export const clock = createClock(data as { fps?: number; duration_s: number; words: WordEntry[] });

export const FPS = clock.fps;
export const WORDS = clock.words;
export const TOTAL_SECONDS = clock.totalSeconds;
export const { fr, segRange, spoken, captionChunks } = clock;

/** Silent tail after the last spoken word, so the end card gets a beat on screen. */
export const END_CARD_SECONDS = 2.6;
/** Narration length from the clock, plus the end-card tail. */
export const totalFrames = clock.totalFrames + fr(END_CARD_SECONDS);
