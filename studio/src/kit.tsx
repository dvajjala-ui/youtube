import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame } from "remotion";
import { useTheme } from "./theme";

/** Fades in over `len` frames starting at `from` (absolute frame). */
export const enter = (from: number, len = 10) => {
  const f = useCurrentFrame();
  return interpolate(f, [from, from + len], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

export const Stage: React.FC<{
  children?: React.ReactNode;
  from?: number;
  pad?: string;
}> = ({ children, from = 0, pad = "0 70px" }) => {
  const t = useTheme();
  const o = enter(from, 8);
  return (
    <AbsoluteFill
      style={{
        backgroundColor: t.bg,
        justifyContent: "center",
        alignItems: "center",
        opacity: o,
        padding: pad,
      }}
    >
      {/* faint engineering grid so the dark canvas never reads as "empty slide" */}
      {t.grid > 0 ? (
        <AbsoluteFill
          style={{
            opacity: 0.5,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: `${t.grid}px ${t.grid}px`,
          }}
        />
      ) : null}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: pad }}>
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const Mono: React.FC<{
  children: React.ReactNode;
  size?: number;
  color?: string;
  bold?: boolean;
  align?: "left" | "center";
  lh?: number;
}> = ({ children, size = 44, color, bold, align = "left", lh = 1.35 }) => {
  const t = useTheme();
  return (
    <div
      style={{
        fontFamily: t.mono,
        fontSize: size,
        color: color ?? t.ink,
        fontWeight: bold ? 700 : 400,
        lineHeight: lh,
        textAlign: align,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}
    >
      {children}
    </div>
  );
};

export const Head: React.FC<{
  text: string;
  size?: number;
  color?: string;
  from?: number;
}> = ({ text, size = 104, color, from = 0 }) => {
  const t = useTheme();
  const o = enter(from, 9);
  const y = interpolate(o, [0, 1], [26, 0]);
  return (
    <div
      style={{
        opacity: o,
        transform: `translateY(${y}px)`,
        fontFamily: t.sans,
        fontWeight: 800,
        fontSize: size,
        lineHeight: 1.08,
        color: color ?? t.ink,
        letterSpacing: -2,
        textTransform: "uppercase",
        textAlign: "center",
      }}
    >
      {text}
    </div>
  );
};

export const Panel: React.FC<{
  children: React.ReactNode;
  w?: number | string;
  border?: string;
  pad?: string;
}> = ({ children, w = 900, border, pad = "34px 40px" }) => {
  const t = useTheme();
  return (
    <div
      style={{
        width: w,
        backgroundColor: t.panel,
        border: `2px solid ${border ?? t.panelBorder}`,
        borderRadius: 18,
        padding: pad,
        boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
      }}
    >
      {children}
    </div>
  );
};

/** Terminal chrome with a typed command line. `typedUntil` is the number of characters revealed. */
export const Terminal: React.FC<{
  lines: { t: string; c?: string }[];
  typedUntil: number;
  title?: string;
  w?: number;
}> = ({ lines, typedUntil, title = "edge-01:~", w = 920 }) => {
  const th = useTheme();
  let budget = typedUntil;
  return (
    <div
      style={{
        width: w,
        backgroundColor: "#0A0A0C",
        border: "2px solid #2A2A31",
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "16px 22px",
          backgroundColor: "#141418",
          borderBottom: "2px solid #2A2A31",
        }}
      >
        {["#FF5F57", "#FEBC2E", "#28C840"].map((d) => (
          <div key={d} style={{ width: 20, height: 20, borderRadius: 20, backgroundColor: d }} />
        ))}
        <div style={{ marginLeft: 12, fontFamily: th.mono, fontSize: 26, color: th.dim }}>{title}</div>
      </div>
      <div style={{ padding: "28px 30px", fontFamily: th.mono, fontSize: 34, lineHeight: 1.6 }}>
        {lines.map((l, i) => {
          const shown = Math.max(0, Math.min(l.t.length, budget));
          budget -= l.t.length;
          return (
            <div key={i} style={{ color: l.c || th.ink, whiteSpace: "pre-wrap" }}>
              {l.t.slice(0, shown)}
              {shown > 0 && shown < l.t.length ? (
                <span style={{ backgroundColor: th.ink }}> </span>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/** Word-synced caption bar (burned captions for vertical cuts). */
export const Captions: React.FC<{
  chunks: { text: string; s: number; e: number }[];
  fps: number;
  bottom?: number;
  size?: number;
}> = ({ chunks, fps, bottom = 150, size = 62 }) => {
  const t = useTheme();
  const frame = useCurrentFrame();
  const sec = frame / fps;
  const active = chunks.find((c) => sec >= c.s - 0.08 && sec <= c.e + 0.22) || null;
  if (!active) return null;
  const pop = spring({
    frame: frame - Math.round(active.s * fps),
    fps,
    config: { damping: 200, stiffness: 180 },
  });
  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        right: 60,
        bottom,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
      }}
    >
      <div
        style={{
          fontFamily: t.sans,
          fontWeight: 800,
          fontSize: size,
          lineHeight: 1.12,
          color: t.ink,
          letterSpacing: -1,
          textAlign: "center",
          textTransform: "uppercase",
          backgroundColor: "rgba(10,10,12,0.82)",
          border: `3px solid ${t.accent}`,
          borderRadius: 14,
          padding: "18px 34px",
          transform: `translateY(${(1 - pop) * 22}px)`,
          opacity: pop,
        }}
      >
        {active.text}
      </div>
    </div>
  );
};

export const Progress: React.FC<{ totalFrames: number }> = ({ totalFrames }) => {
  const t = useTheme();
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: 8,
        width: `${(frame / totalFrames) * 100}%`,
        backgroundColor: t.accent,
      }}
    />
  );
};
