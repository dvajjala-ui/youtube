import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Captions, Progress, useTheme } from "@studio/kit";
import { SCENES } from "./scenes";
import { captionChunks, fr, segRange, TAIL_FRAMES, TOTAL_SECONDS, totalFrames } from "./lib/clock";

const ALL_CHUNKS = SCENES.flatMap((s) => captionChunks(s.seg, 4));
const LEAD = 0.25; // seconds a scene cuts in before its first word

const activeIndex = (t: number) => {
  for (let i = 0; i < SCENES.length; i++) {
    const start = segRange(SCENES[i].seg).start - LEAD;
    const end = i + 1 < SCENES.length ? segRange(SCENES[i + 1].seg).start - LEAD : Infinity;
    if (t >= start && t < end) return i;
  }
  return SCENES.length - 1;
};

export const Main: React.FC = () => {
  const t = useTheme();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;
  const i = activeIndex(sec);
  const Scene = SCENES[i].Comp;
  const cut = frame - fr(segRange(SCENES[i].seg).start - LEAD);
  const flash = cut >= 0 && cut < 4 ? 1 - cut / 4 : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: t.bg }}>
      <Audio src={staticFile("narration/master.wav")} />

      <Scene />

      {/* hard-cut flash between scenes */}
      <AbsoluteFill style={{ backgroundColor: "#FFFFFF", opacity: flash * 0.14, pointerEvents: "none" }} />

      {/* vignette keeps the eye in the middle on a phone */}
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          background: "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      <Captions chunks={ALL_CHUNKS} fps={fps} />

      <div
        style={{
          position: "absolute",
          bottom: 54,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: t.mono,
          fontSize: 26,
          color: t.dim,
          letterSpacing: 2,
        }}
      >
        FEATURE REEL · POSTGRESQL 18 · ASYNC I/O
      </div>

      <Progress totalFrames={totalFrames + TAIL_FRAMES} />
    </AbsoluteFill>
  );
};

export { TOTAL_SECONDS };
