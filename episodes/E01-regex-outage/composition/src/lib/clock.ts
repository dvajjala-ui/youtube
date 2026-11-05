import data from "../data/words.json";
import { createClock } from "@studio/kit";
import type { WordEntry } from "@studio/kit";

export type { WordEntry };

export const clock = createClock(data as { fps?: number; duration_s: number; words: WordEntry[] });

export const FPS = clock.fps;
export const WORDS = clock.words;
export const TOTAL_SECONDS = clock.totalSeconds;
export const totalFrames = clock.totalFrames;
export const { fr, segRange, spoken, captionChunks } = clock;
