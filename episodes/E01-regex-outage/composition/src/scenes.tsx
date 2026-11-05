import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fr, segRange, spoken } from "./lib/clock";
import { AMBER, DIM, GREEN, Head, INK, MONO, Panel, RED, Stage, Terminal, Mono } from "./kit";

const lcg = (seed: number) => () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296;

const useLocal = (seg: string) => {
  const frame = useCurrentFrame();
  const r = segRange(seg);
  const base = fr(r.start);
  const { fps } = useVideoConfig();
  return { frame, base, secs: (frame - base) / fps, r };
};

/* ------------------------------------------------------------ s1 the hook */
export const S1_Hook: React.FC = () => {
  const { base, secs } = useLocal("s1");
  const rows = [
    { n: "27", u: "MINUTES", c: INK, at: 0 },
    { n: "80%", u: "OF TRAFFIC GONE", c: RED, at: 1.4 },
    { n: "1", u: "REGULAR EXPRESSION", c: INK, at: 3.0 },
  ];
  return (
    <Stage from={base}>
      <div style={{ display: "flex", flexDirection: "column", gap: 70, alignItems: "center" }}>
        {rows.map((r) => {
          const o = interpolate(secs, [r.at, r.at + 0.35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={r.u} style={{ opacity: o, transform: `translateY(${(1 - o) * 30}px)`, textAlign: "center" }}>
              <div style={{ fontFamily: SANS_BIG, fontWeight: 800, fontSize: 170, lineHeight: 1, color: r.c, letterSpacing: -6 }}>
                {r.n}
              </div>
              <div style={{ fontFamily: MONO, fontSize: 46, color: DIM, marginTop: 10, letterSpacing: 4 }}>{r.u}</div>
            </div>
          );
        })}
      </div>
    </Stage>
  );
};
const SANS_BIG = "'Inter', 'Segoe UI', Arial, sans-serif";

/* ------------------------------------------------------------- s2 deploy */
export const S2_Deploy: React.FC = () => {
  const { base, frame } = useLocal("s2");
  const local = frame - base;
  const typed = Math.max(0, local - 6) * 3.6;
  const done = local > fr(3.4);
  return (
    <Stage from={base}>
      <div style={{ display: "flex", flexDirection: "column", gap: 36, alignItems: "center" }}>
        <Head text="2 JULY 2019 · 13:42 UTC" size={62} color={DIM} from={base} />
        <Terminal
          typedUntil={typed}
          title="waf managed ruleset · global"
          lines={[
            { t: "$ git diff rules/xss.re" },
            { t: '  - .* = .*' },
            { t: '  + .* (?: .* = .* )' },
            { t: "$ deploy --all-cities" },
            { t: done ? "  ✓ 3,868 rules · pushed worldwide" : "", c: GREEN },
          ]}
        />
        <Mono size={36} color={DIM} align="center">
          a minor change to one XSS rule
        </Mono>
      </div>
    </Stage>
  );
};

/* ----------------------------------------------------------- s3 simulate */
export const S3_Simulate: React.FC = () => {
  const { base, secs } = useLocal("s3");
  const N = 8;
  const passed = Math.floor(interpolate(secs, [0.2, 3.0], [0, N], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const running = secs > 3.2;
  return (
    <Stage from={base}>
      <div style={{ display: "flex", flexDirection: "column", gap: 40, alignItems: "center" }}>
        <Head text="MODE: SIMULATE" size={78} color={AMBER} from={base} />
        <Panel w={940}>
          <Mono size={34} color={DIM}>
            real customer traffic →
          </Mono>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 26 }}>
            {Array.from({ length: N }, (_, i) => (
              <div
                key={i}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 9,
                  backgroundColor: i < passed ? INK : "#26262C",
                }}
              />
            ))}
            <div style={{ fontSize: 44, color: DIM }}>→</div>
            <div
              style={{
                width: 280,
                height: 170,
                borderRadius: 14,
                border: `3px solid ${running ? RED : AMBER}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                backgroundColor: running ? "rgba(255,59,48,0.08)" : "transparent",
              }}
            >
              <div style={{ fontFamily: MONO, fontSize: 30, color: running ? RED : AMBER }}>rule runs</div>
              <div style={{ fontFamily: MONO, fontSize: 28, color: DIM }}>blocks: 0</div>
            </div>
          </div>
          <div style={{ marginTop: 30 }}>
            <Mono size={34} color={running ? RED : DIM}>
              {running ? "nothing is blocked — but the engine still executes" : "not blocking anything, so what could go wrong?"}
            </Mono>
          </div>
        </Panel>
      </div>
    </Stage>
  );
};

/* -------------------------------------------------------- s4 backtracking */
export const S4_Backtrack: React.FC = () => {
  const { base, frame, secs } = useLocal("s4");
  const { fps } = useVideoConfig();
  const W = 880;
  const H = 620;
  const maxDepth = 6;
  const depth = Math.min(maxDepth, Math.max(0, Math.floor((secs - 0.6) / 0.55)));

  const nodes: { x: number; y: number; d: number; k: string }[] = [];
  const edges: { x1: number; y1: number; x2: number; y2: number; k: string }[] = [];
  const rnd = lcg(11);
  const jit: Record<string, number> = {};
  for (let d = 0; d <= depth; d++) {
    const count = 1 << d;
    const y = 30 + (d * (H - 70)) / maxDepth;
    for (let i = 0; i < count; i++) {
      const x = (W / (count + 1)) * (i + 1) + (rnd() - 0.5) * 12;
      const k = `${d}-${i}`;
      jit[k] = rnd();
      nodes.push({ x, y, d, k });
      if (d > 0) {
        const p = nodes.find((n) => n.k === `${d - 1}-${i >> 1}`)!;
        edges.push({ x1: p.x, y1: p.y, x2: x, y2: y, k });
      }
    }
  }
  const appear = (d: number) => interpolate(secs, [0.6 + d * 0.55, 1.0 + d * 0.55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const stepWord = spoken("twenty", segRange("s4").start);
  // the tree only turns red when the narrator actually says the big number
  const bigWord = spoken("five", segRange("s4").start);
  const hot = frame >= bigWord;
  const shown = frame >= stepWord ? (hot ? 5353 : 23) : 0;

  return (
    <Stage from={base}>
      <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "center" }}>
        <Head text=".*(?:.*=.*)" size={72} color={hot ? RED : INK} from={base} />
        <Panel w={W + 60} border={hot ? RED : "#26262C"}>
          <svg width={W} height={H}>
            {edges.map((e) => (
              <line key={e.k} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke={hot ? RED : "#3A3A44"} strokeWidth={2} opacity={appear(Number(e.k.split("-")[0]))} />
            ))}
            {nodes.map((n) => (
              <circle key={n.k} cx={n.x} cy={n.y} r={n.d === 0 ? 15 : 8 + jit[n.k] * 3} fill={n.d === 0 ? AMBER : hot ? RED : "#5A5A66"} opacity={appear(n.d)} />
            ))}
          </svg>
        </Panel>
        <div style={{ display: "flex", gap: 60, alignItems: "baseline" }}>
          <div style={{ fontFamily: MONO, fontSize: 40, color: DIM }}>
            steps {shown ? `→ ${shown.toLocaleString("en-US")}` : ""}
          </div>
          <div style={{ fontFamily: MONO, fontSize: 34, color: hot ? RED : DIM }}>
            {hot ? "backtracking, not matching" : "x = x"}
          </div>
        </div>
      </div>
    </Stage>
  );
};

/* -------------------------------------------------------------- s5 impact */
export const S5_Impact: React.FC = () => {
  const { base, frame, secs } = useLocal("s5");
  const { fps } = useVideoConfig();
  const W = 820;
  const H = 380;
  const N = 110;
  const upto = Math.max(1, Math.floor(interpolate(secs, [0.2, 3.4], [1, N], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })));
  const cpu: string[] = [];
  const traffic: string[] = [];
  for (let i = 0; i < upto; i++) {
    const x = (i / (N - 1)) * W;
    const p = i / (N - 1);
    const c = Math.min(1, 0.05 + Math.pow(p, 1.7) * 1.05);
    const t = Math.max(0.2, 1 - Math.pow(p, 0.9) * 0.82);
    cpu.push(`${x.toFixed(1)},${(H - c * (H - 30) - 15).toFixed(1)}`);
    traffic.push(`${x.toFixed(1)},${(H - t * (H - 30) - 15).toFixed(1)}`);
  }
  const cpuPct = Math.round(interpolate(secs, [0.2, 3.4], [5, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const cities = Math.round(interpolate(secs, [0.8, 4.0], [0, 180], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const pop = spring({ frame: frame - base - 30, fps, config: { damping: 15 } });

  return (
    <Stage from={base}>
      <div style={{ display: "flex", flexDirection: "column", gap: 26, alignItems: "center" }}>
        <Panel w={W + 70} border={cpuPct > 88 ? RED : "#26262C"}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <Mono size={34} color={DIM}>
              edge CPU · all cores
            </Mono>
            <div style={{ fontFamily: MONO, fontSize: 92, fontWeight: 700, color: cpuPct > 88 ? RED : INK, transform: `scale(${0.6 + pop * 0.4})` }}>
              {cpuPct}%
            </div>
          </div>
          <svg width={W} height={H} style={{ marginTop: 6 }}>
            {[0.5, 1].map((g) => (
              <line key={g} x1={0} y1={H - g * (H - 30) - 15} x2={W} y2={H - g * (H - 30) - 15} stroke="#232329" strokeWidth={2} />
            ))}
            <polyline points={traffic.join(" ")} fill="none" stroke={DIM} strokeWidth={4} strokeDasharray="12 9" />
            <polyline points={cpu.join(" ")} fill="none" stroke={cpuPct > 88 ? RED : GREEN} strokeWidth={6} strokeLinejoin="round" />
          </svg>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
            <Mono size={28} color={DIM}>
              ┄ traffic (−80%)
            </Mono>
            <Mono size={28} color={cpuPct > 88 ? RED : DIM}>
              ━ cpu
            </Mono>
          </div>
        </Panel>
        <div style={{ display: "flex", gap: 70, alignItems: "flex-end" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: MONO, fontSize: 110, fontWeight: 700, color: RED }}>{cities}</div>
            <Mono size={34} color={DIM} align="center">
              cities
            </Mono>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: MONO, fontSize: 110, fontWeight: 700, color: INK }}>502</div>
            <Mono size={34} color={DIM} align="center">
              for customers
            </Mono>
          </div>
        </div>
      </div>
    </Stage>
  );
};

/* -------------------------------------------------------------- s6 lesson */
export const S6_Lesson: React.FC = () => {
  const { base, frame, secs } = useLocal("s6");
  const local = frame - base;
  const typed = Math.max(0, local - 5) * 3.8;
  const rolled = local > fr(2.0);
  const at = (w: string) => spoken(w, segRange("s6").start);
  return (
    <Stage from={base}>
      <div style={{ display: "flex", flexDirection: "column", gap: 38, alignItems: "center" }}>
        <Terminal
          typedUntil={typed}
          title="incident: mitigation"
          lines={[
            { t: "$ waf terminate --global" },
            { t: rolled ? "  ✓ 14:07 UTC · traffic recovering" : "", c: GREEN },
            { t: rolled ? "  ✓ 14:09 UTC · cpu normal" : "", c: GREEN },
          ]}
        />
        <Head text="A REGEX IS CODE" size={100} from={base + fr(3.2)} />
        <Head text="AND IT WAS NEVER" size={58} color={DIM} from={at("runaway") - 12} />
        <Head text="TESTED FOR TIME" size={72} color={RED} from={at("runaway")} />
        <div style={{ opacity: interpolate(secs, [7.0, 7.6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          <Mono size={40} color={INK} align="center">
            full story · episode 01 · A TRUE STORY
          </Mono>
        </div>
      </div>
    </Stage>
  );
};

export const SCENES = [
  { seg: "s1", Comp: S1_Hook },
  { seg: "s2", Comp: S2_Deploy },
  { seg: "s3", Comp: S3_Simulate },
  { seg: "s4", Comp: S4_Backtrack },
  { seg: "s5", Comp: S5_Impact },
  { seg: "s6", Comp: S6_Lesson },
];
