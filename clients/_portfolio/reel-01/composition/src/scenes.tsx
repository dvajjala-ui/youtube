import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Head, Mono, Panel, Stage, Terminal, useTheme } from "@studio/kit";
import { fr, segRange, spoken, WORDS } from "./lib/clock";

/* ------------------------------------------------------------------ helpers */

/** 0..1 ramp over `len` frames from absolute frame `from`. Pure, safe inside loops. */
const ramp = (frame: number, from: number, len = 9) =>
  interpolate(frame, [from, from + len], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

/** Second at which `word` starts, searching after `afterSec`. Throws like spoken(). */
const secOf = (word: string, afterSec: number) => {
  const needle = word.toLowerCase();
  const hit = WORDS.find((x) => !x.gap && x.w.includes(needle) && x.s >= afterSec - 0.001);
  if (!hit) throw new Error(`clock: "${word}" is not spoken after ${afterSec}s`);
  return hit.s;
};

/** Per-scene clock: frame, scene base frame, and `at(word)` = frame the word is spoken in this segment. */
const useScene = (seg: string) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = segRange(seg);
  const base = fr(r.start);
  const at = (word: string, afterWord?: string) =>
    spoken(word, afterWord ? secOf(afterWord, r.start) + 0.01 : r.start);
  return { frame, fps, base, at, start: r.start };
};

/** Text-only wordmark. No downloaded logo: nominative text, "18" in the accent color. */
const Wordmark: React.FC<{ from: number; size?: number; top?: number }> = ({ from, size = 40, top = 240 }) => {
  const t = useTheme();
  const frame = useCurrentFrame();
  const o = ramp(frame, from, 8);
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 0,
        right: 0,
        textAlign: "center",
        opacity: o,
        transform: `translateY(${(1 - o) * 12}px)`,
        fontFamily: t.mono,
        fontSize: size,
        letterSpacing: 2,
        color: t.ink,
      }}
    >
      PostgreSQL <span style={{ color: t.accent, fontWeight: 700 }}>18</span>
    </div>
  );
};

/** A labelled chip that pops in at `from`. */
const Chip: React.FC<{ text: string; from: number; color?: string; w?: number }> = ({ text, from, color, w = 760 }) => {
  const t = useTheme();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - from, fps, config: { damping: 18, stiffness: 160 } });
  const o = ramp(frame, from, 6);
  return (
    <div
      style={{
        width: w,
        opacity: o,
        transform: `scale(${0.92 + pop * 0.08})`,
        backgroundColor: t.panel,
        border: `3px solid ${color ?? t.panelBorder}`,
        borderRadius: 16,
        padding: "22px 34px",
        fontFamily: t.mono,
        fontSize: 42,
        fontWeight: 700,
        color: color ?? t.ink,
        textAlign: "center",
        letterSpacing: 1,
      }}
    >
      {text}
    </div>
  );
};

/* ----------------------------------------------------------- s1 the hook */
/* "Postgres used to read your table one block at a time, and wait." */
export const S1_Hook: React.FC = () => {
  const t = useTheme();
  const { frame, fps, base, at } = useScene("s1");
  const N = 8;
  const tTable = at("table");
  const tOne = at("one");
  const tTime = at("time");
  const tWait = at("wait");

  const blocksIn = ramp(frame, tTable, 10);
  // the reader steps one block every 0.3 s once "time" is said; it parks on the last block
  const step = frame < tOne ? -1 : frame < tTime ? 0 : Math.min(N - 1, 1 + Math.floor((frame - tTime) / (0.3 * fps)));
  const waiting = frame >= tWait;
  const W = 96;
  const GAP = 18;

  return (
    <Stage from={base}>
      <Wordmark from={base} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 44 }}>
        <Head text="ONE BLOCK" size={120} from={tOne} />
        <Head text="AT A TIME" size={120} color={t.dim} from={tTime} />

        {/* heap blocks */}
        <div style={{ position: "relative", height: 230, width: N * (W + GAP) }}>
          <div style={{ display: "flex", gap: GAP, position: "absolute", top: 70, left: 0 }}>
            {Array.from({ length: N }, (_, i) => {
              const o = ramp(frame, tTable + i * 2, 8) * blocksIn;
              const hot = i === step;
              const done = i < step;
              return (
                <div
                  key={i}
                  style={{
                    width: W,
                    height: 96,
                    borderRadius: 12,
                    opacity: o,
                    backgroundColor: hot ? t.accent : done ? "#2A3858" : t.panel,
                    border: `3px solid ${hot ? t.accent : t.panelBorder}`,
                  }}
                />
              );
            })}
          </div>
          {/* reader cursor */}
          {step >= 0 ? (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: step * (W + GAP) + W / 2 - 22,
                width: 44,
                textAlign: "center",
                fontFamily: t.mono,
                fontSize: 44,
                color: t.accent,
              }}
            >
              ▼
            </div>
          ) : null}
          {/* stall marker */}
          {waiting ? (
            <div
              style={{
                position: "absolute",
                top: 182,
                left: step * (W + GAP) + W / 2 - 80,
                width: 160,
                textAlign: "center",
                fontFamily: t.mono,
                fontSize: 36,
                fontWeight: 700,
                color: t.warn,
                opacity: ramp(frame, tWait, 6),
              }}
            >
              WAIT
            </div>
          ) : null}
        </div>

        <div style={{ opacity: ramp(frame, tTable, 10) }}>
          <Mono size={34} color={waiting ? t.warn : t.dim} align="center">
            {waiting ? "one read in flight · everything else waits" : "heap blocks of one table"}
          </Mono>
        </div>
      </div>
    </Stage>
  );
};

/* ---------------------------------------------------------- s2 the problem */
/* "Sequential scans, bitmap scans, vacuum. Each read waits for the last. The O S can't see what's coming." */
export const S2_Problem: React.FC = () => {
  const t = useTheme();
  const { frame, base, at } = useScene("s2");
  const tSeq = at("sequential");
  const tBit = at("bitmap");
  const tVac = at("vacuum");
  const tWaits = at("waits");
  const tSee = at("see");

  const segs = ["READ", "WAIT", "READ", "WAIT", "READ", "WAIT"];
  const grow = ramp(frame, tWaits, 24);

  return (
    <Stage from={base}>
      <Wordmark from={base} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
        <Chip text="SEQUENTIAL SCAN" from={tSeq} />
        <Chip text="BITMAP HEAP SCAN" from={tBit} />
        <Chip text="VACUUM" from={tVac} />

        {/* serial read timeline: box -> label -> value */}
        <div style={{ marginTop: 30, opacity: ramp(frame, tWaits, 8) }}>
          <Panel w={900} pad="28px 34px" border={frame >= tWaits ? t.warn : undefined}>
            <Mono size={32} color={t.dim}>
              one backend · time →
            </Mono>
            <div style={{ display: "flex", gap: 8, marginTop: 20, width: 830, overflow: "hidden" }}>
              {segs.map((s, i) => {
                const isWait = s === "WAIT";
                const vis = Math.max(0, Math.min(1, grow * segs.length - i));
                return (
                  <div
                    key={i}
                    style={{
                      flex: isWait ? 1.6 : 1,
                      height: 72,
                      borderRadius: 10,
                      transform: `scaleX(${vis})`,
                      transformOrigin: "left",
                      backgroundColor: isWait ? "rgba(255,200,87,0.18)" : t.accent,
                      border: `3px solid ${isWait ? t.warn : t.accent}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: t.mono,
                      fontSize: 28,
                      fontWeight: 700,
                      color: isWait ? t.warn : t.bg,
                    }}
                  >
                    {s}
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 20 }}>
              <Mono size={34} color={t.warn}>
                each read waits for the last
              </Mono>
            </div>
          </Panel>
        </div>

        <div style={{ opacity: ramp(frame, tSee, 8), transform: `translateY(${(1 - ramp(frame, tSee, 8)) * 14}px)` }}>
          <Mono size={36} color={t.fail} align="center">
            OS readahead cannot see the access pattern
          </Mono>
        </div>
      </div>
    </Stage>
  );
};

/* ---------------------------------------------------------- s3 the feature */
/* "Postgres eighteen adds asynchronous I O. Backends queue many reads at once. I O method: worker, I O U ring, or sync." */
export const S3_Feature: React.FC = () => {
  const t = useTheme();
  const { frame, base, at } = useScene("s3");
  const tEighteen = at("eighteen");
  const tAsync = at("asynchronous");
  const tQueue = at("queue");
  const tMethod = at("method");
  const tWorker = at("worker");
  const tRing = at("ring");
  // "asynchronous" contains "sync": search only after "ring"
  const tSync = at("sync", "ring");

  const N = 6;
  const fan = ramp(frame, tQueue, 14);
  const W = 820;
  const H = 300;

  const values: { v: string; from: number }[] = [
    { v: "worker", from: tWorker },
    { v: "io_uring", from: tRing },
    { v: "sync", from: tSync },
  ];

  return (
    <Stage from={base}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
        <Head text="POSTGRES 18" size={84} color={t.dim} from={tEighteen} />
        <Head text="ASYNC I/O" size={150} color={t.ok} from={tAsync} />

        {/* fan-out: one backend, many reads in flight at once */}
        <div style={{ opacity: ramp(frame, tQueue, 8), marginTop: 10 }}>
          <svg width={W} height={H}>
            {Array.from({ length: N }, (_, i) => {
              const y = 30 + (i * (H - 60)) / (N - 1);
              const x2 = 230 + (W - 300) * fan;
              return (
                <g key={i}>
                  <line x1={200} y1={H / 2} x2={x2} y2={H / 2 + (y - H / 2) * fan} stroke={t.ok} strokeWidth={5} strokeLinecap="round" />
                  <rect x={W - 70} y={y - 26} width={52} height={52} rx={10} fill={fan > 0.98 ? t.ok : t.panel} stroke={t.ok} strokeWidth={3} opacity={fan} />
                </g>
              );
            })}
            <rect x={0} y={H / 2 - 48} width={200} height={96} rx={14} fill={t.panel} stroke={t.ok} strokeWidth={3} />
            <text x={100} y={H / 2 + 12} textAnchor="middle" fontFamily={t.mono} fontSize={32} fontWeight={700} fill={t.ink}>
              backend
            </text>
          </svg>
          <Mono size={34} color={t.ok} align="center">
            {fan > 0.98 ? `${N} reads in flight at once` : "queue reads"}
          </Mono>
        </div>

        {/* io_method panel */}
        <div style={{ opacity: ramp(frame, tMethod, 8), marginTop: 6 }}>
          <Panel w={900} pad="28px 36px" border={t.accent}>
            <Mono size={40} color={t.ink}>
              <span style={{ color: t.accent }}>io_method</span> ={" "}
              {values.map((x, i) => {
                const o = ramp(frame, x.from, 6);
                return (
                  <span key={x.v} style={{ opacity: o }}>
                    {i > 0 ? <span style={{ color: t.dim }}> | </span> : null}
                    {x.v}
                  </span>
                );
              })}
            </Mono>
            <div style={{ marginTop: 14 }}>
              <Mono size={30} color={t.dim}>
                set at server start · io_uring needs --with-liburing
              </Mono>
            </div>
          </Panel>
        </div>
      </div>
    </Stage>
  );
};

/* ------------------------------------------------------------- s4 the proof */
/* "The default is worker. Three I O workers. Benchmarks show up to three times faster reads from storage." */
export const S4_Proof: React.FC = () => {
  const t = useTheme();
  const { frame, fps, base, at } = useScene("s4");
  const tDefault = at("default");
  const tWorker = at("worker");
  const tThree = at("three");
  const tWorkers = at("workers");
  const tTimes = at("times");

  const CPS = 3; // typed characters per frame
  const cmd1 = '$ psql -c "SHOW io_method;"';
  const out1 = [" io_method", "-----------", " worker"];
  const cmd2 = '$ psql -c "SHOW io_workers;"';
  const out2 = [" io_workers", "------------", " 3"];

  const typed1 = Math.min(cmd1.length, Math.max(0, (frame - tDefault) * CPS));
  const show1 = frame >= tWorker;
  const typed2 = frame >= tThree ? Math.min(cmd2.length, (frame - tThree) * CPS) : 0;
  const show2 = frame >= tWorkers;

  const lines: { t: string; c?: string }[] = [{ t: cmd1 }];
  let budget = typed1;
  if (show1) {
    out1.forEach((l, i) => lines.push({ t: l, c: i === 2 ? t.ok : t.dim }));
    budget += out1.join("").length;
  }
  if (frame >= tThree) {
    lines.push({ t: "" }, { t: cmd2 });
    budget += typed2;
  }
  if (show2) {
    out2.forEach((l, i) => lines.push({ t: l, c: i === 2 ? t.ok : t.dim }));
    budget += out2.join("").length;
  }

  const pop = spring({ frame: frame - tTimes, fps, config: { damping: 14, stiffness: 150 } });
  const heroOn = frame >= tTimes;

  return (
    <Stage from={base}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 36 }}>
        <div style={{ opacity: ramp(frame, tDefault, 8) }}>
          <Terminal title="psql · postgres 18" typedUntil={budget} lines={lines} w={900} />
        </div>

        <div style={{ height: 300, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          {heroOn ? (
            <>
              <div
                style={{
                  fontFamily: t.sans,
                  fontWeight: 800,
                  fontSize: 200,
                  lineHeight: 1,
                  color: t.ok,
                  letterSpacing: -6,
                  transform: `scale(${0.6 + pop * 0.4})`,
                  opacity: pop,
                }}
              >
                3×
              </div>
              <div style={{ opacity: ramp(frame, tTimes + 4, 8), marginTop: 14 }}>
                <Mono size={34} color={t.ink} align="center">
                  faster reads from storage
                </Mono>
                <Mono size={30} color={t.dim} align="center">
                  up to · in the project's benchmarks
                </Mono>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </Stage>
  );
};

/* ---------------------------------------------------------- s5 the takeaway */
/* "Upgrade. Keep the default. Measure. Postgres eighteen, out now." */
export const S5_Takeaway: React.FC = () => {
  const t = useTheme();
  const { frame, fps, base, at } = useScene("s5");
  const tUpgrade = at("upgrade");
  const tKeep = at("keep");
  const tMeasure = at("measure");
  const tEighteen = at("eighteen");
  const tNow = at("now");

  const pop = spring({ frame: frame - tEighteen, fps, config: { damping: 16, stiffness: 140 } });
  const cardOn = ramp(frame, tNow, 10);

  return (
    <Stage from={base}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
        <Head text="UPGRADE." size={96} from={tUpgrade} />
        <Head text="KEEP THE DEFAULT." size={96} color={t.ok} from={tKeep} />
        <Head text="MEASURE." size={96} from={tMeasure} />

        <div
          style={{
            marginTop: 40,
            opacity: pop,
            transform: `scale(${0.8 + pop * 0.2})`,
            fontFamily: t.mono,
            fontSize: 64,
            letterSpacing: 2,
            color: t.ink,
          }}
        >
          PostgreSQL <span style={{ color: t.accent, fontWeight: 700 }}>18</span>
        </div>

        <div style={{ opacity: cardOn, transform: `translateY(${(1 - cardOn) * 16}px)`, marginTop: 10 }}>
          <Panel w={900} pad="26px 36px">
            <Mono size={34} color={t.dim} align="center">
              Unsolicited concept, not affiliated with PostgreSQL.
            </Mono>
            <div style={{ marginTop: 12 }}>
              <Mono size={38} color={t.accent} align="center" bold>
                studio.example
              </Mono>
            </div>
          </Panel>
        </div>
      </div>
    </Stage>
  );
};

export const SCENES = [
  { seg: "s1", Comp: S1_Hook },
  { seg: "s2", Comp: S2_Problem },
  { seg: "s3", Comp: S3_Feature },
  { seg: "s4", Comp: S4_Proof },
  { seg: "s5", Comp: S5_Takeaway },
];
