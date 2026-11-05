import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { SCENES } from "./scenes";
import { captionChunks, fr, segRange, TOTAL_SECONDS, totalFrames, WORDS } from "./lib/clock";
import { BG, Captions, DIM, MONO, Progress } from "./kit";

const ALL_CHUNKS = SCENES.flatMap((s) => captionChunks(s.seg, 4));

const activeIndex = (t: number) => {
  for (let i = 0; i < SCENES.length; i++) {
    const start = segRange(SCENES[i].seg).start - 0.25;
    const end = i + 1 < SCENES.length ? segRange(SCENES[i + 1].seg).start - 0.25 : TOTAL_SECONDS;
    if (t >= start && t < end) return i;
  }
  return SCENES.length - 1;
};

export const Short: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const i = activeIndex(t);
  const Scene = SCENES[i].Comp;
  const cut = frame - fr(segRange(SCENES[i].seg).start - 0.25);
  const flash = cut >= 0 && cut < 4 ? 1 - cut / 4 : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <Audio src={staticFile("narration/master.wav")} />

      <Scene />

      {/* hard-cut flash between scenes: cheap, and it hides the pop */}
      <AbsoluteFill style={{ backgroundColor: "#FFFFFF", opacity: flash * 0.16, pointerEvents: "none" }} />

      {/* vignette keeps the eye in the middle on a phone */}
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          background: "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.55) 100%)",
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
          fontFamily: MONO,
          fontSize: 26,
          color: DIM,
          letterSpacing: 2,
        }}
      >
        A TRUE STORY · EPISODE 01
      </div>

      <Progress totalFrames={totalFrames} />
    </AbsoluteFill>
  );
};

export { WORDS };
