import React from "react";
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame} from "remotion";
import {createClock} from "@studio/kit";
import {IncidentCharacter} from "../../../../studio/src/incident/Character";
import {incidentPalettes} from "../../../../studio/src/incident/design";
import timing from "../../coldopen/transcript/words.json";

/**
 * E02 cold open demo (~60s), built to the reference grammar in
 * qwen/reference-design-schema.md: consequence-first phone alert (pouria),
 * dark incident chat (BugX), clock spine, semantic green->red, the misleading
 * green "OK" as ironic prop, grain + vignette + monitor glow, title card callback.
 * Narration is voice-over; characters hold reaction shots (no lip sync needed).
 */
export const coldClock = createClock(timing);
const p = incidentPalettes.night;
const fps = coldClock.fps;
const HOLD = 45;
export const coldTotalFrames = coldClock.totalFrames + HOLD;

const sans = "'Segoe UI', Arial, sans-serif";
const mono = "'Consolas', 'Courier New', monospace";

const order = ["ticket", "rewind", "turn", "scale", "chat", "title"] as const;
type SceneId = (typeof order)[number];
const ranges = Object.fromEntries(order.map((id) => [id, coldClock.segRange(id)])) as Record<SceneId, {start: number; end: number}>;
const starts = {} as Record<SceneId, number>;
const ends = {} as Record<SceneId, number>;
order.forEach((id, i) => {
  starts[id] = i === 0 ? 0 : coldClock.fr(ranges[id].start) - 6;
});
order.forEach((id, i) => {
  ends[id] = i === order.length - 1 ? coldTotalFrames : starts[order[i + 1]];
});
const cue = (id: SceneId, word: string) => coldClock.spoken(word, ranges[id].start);
const C = {
  pill: cue("ticket", "seven"),
  phoneBody: cue("ticket", "their"),
  phoneMono: cue("ticket", "gone"),
  rewind: cue("rewind", "eight"),
  batch2: cue("rewind", "second"),
  recap: cue("rewind", "first"),
  scope: cue("turn", "sites"),
  count: cue("scale", "eight"),
  collapse: cue("scale", "deleted"),
  chat2: cue("chat", "monitoring"),
  chat3: cue("chat", "nothing"),
  chat4: cue("chat", "normal"),
  titleIn: cue("title", "routine"),
  flip: cue("title", "one"),
};

const clamp = (frame: number, range: [number, number], output: [number, number]) =>
  interpolate(frame, range, output, {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
const pop = (frame: number, at: number, len = 9) => clamp(frame, [at, at + len], [0, 1]);

function Grain() {
  return (
    <svg viewBox="0 0 1920 1080" style={{position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none"}} aria-hidden="true">
      <defs>
        <pattern id="cold-grain" width="23" height="19" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="2" r="1.2" fill={p.ink} opacity=".07" />
          <circle cx="17" cy="14" r=".8" fill={p.ink} opacity=".07" />
        </pattern>
      </defs>
      <rect width="1920" height="1080" fill="url(#cold-grain)" />
    </svg>
  );
}

function Vignette() {
  return (
    <AbsoluteFill style={{pointerEvents: "none", background: "radial-gradient(ellipse at 50% 46%, transparent 52%, rgba(0,0,0,.52) 100%)"}} />
  );
}

function Glow({color, x = 50, y = 45, strength = 0.16}: {color: string; x?: number; y?: number; strength?: number}) {
  return (
    <AbsoluteFill style={{pointerEvents: "none", background: `radial-gradient(ellipse at ${x}% ${y}%, ${color} 0%, transparent 62%)`, opacity: strength}} />
  );
}

function ClockChip({label}: {label: string}) {
  return (
    <div style={{position: "absolute", top: 44, right: 64, font: "700 26px " + mono, color: p.muted, letterSpacing: 2,
      padding: "8px 18px", border: "2px solid " + p.line, borderRadius: 10, background: "#0b0d10cc"}}>
      {label}
    </div>
  );
}

/** BugX-style tired line-art avatar. */
function Wojak({variant = 0}: {variant?: number}) {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" aria-hidden="true">
      <circle cx="23" cy="23" r="20" fill="#f2f0ed" stroke="#17181c" strokeWidth="2" />
      <path d={variant % 2 ? "M13 19q4-3 8-1m4 0q4-2 8 1" : "M13 18h8m4 0h8"} fill="none" stroke="#17181c" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M15 23q3 2 6 0m4 0q3 2 6 0" fill="none" stroke="#17181c" strokeWidth="1.8" strokeLinecap="round" />
      <path d={variant % 3 ? "M17 32q6 2 12 0" : "M17 32h12"} fill="none" stroke="#17181c" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 14q5-4 10-3m2 0q5-1 10 3" fill="none" stroke="#17181c" strokeWidth="1.4" opacity=".55" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ scene 1 */
function PhoneScene({frame}: {frame: number}) {
  const rise = clamp(frame, [0, 14], [70, 0]);
  const buzz = frame < 26 ? Math.sin(frame * 1.9) * 3 * (1 - frame / 26) : 0;
  const pill = pop(frame, C.pill, 7);
  return (
    <AbsoluteFill style={{background: "#050607"}}>
      <Glow color={p.bad} strength={0.1} />
      <div style={{position: "absolute", left: "50%", top: "50%", transform: `translate(-50%,-50%) translate(${buzz}px, ${rise}px) rotate(-1.5deg)`, opacity: clamp(frame, [0, 10], [0, 1])}}>
        {/* hand holding the phone, pouria-style pale prop */}
        <svg width="980" height="1040" viewBox="0 0 980 1040" style={{position: "absolute", left: -260, top: -20}} aria-hidden="true">
          <path d="M120 1040q-40-260 60-420q60-96 150-120l60 540Z" fill="#e6dfe8" />
          <path d="M150 1040q-20-220 40-360" fill="none" stroke="#c9bfd2" strokeWidth="10" opacity=".7" />
          {[300, 452, 604, 756].map((y, i) => (
            <g key={y}>
              <rect x="700" y={y} width="150" height="104" rx="52" fill="#e6dfe8" />
              <path d={`M712 ${y + 78}q40 14 96 6`} fill="none" stroke="#c9bfd2" strokeWidth="7" opacity=".7" />
              <rect x="700" y={y} width="34" height="104" rx="17" fill="#d5cbdd" opacity={i === 0 ? 0.9 : 0.6} />
            </g>
          ))}
        </svg>
        <div style={{position: "relative", width: 560, height: 960, borderRadius: 54, border: "5px solid #c9c4cf", background: "#0a0a0c",
          boxShadow: "0 40px 120px #000c, 0 0 90px #ff897f22", overflow: "hidden", padding: "26px 30px"}}>
          <div style={{position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)", width: 180, height: 32, borderRadius: 20, background: "#000"}} />
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", font: "600 24px " + sans, color: "#e8e6e3", padding: "4px 6px 18px"}}>
            <span>7:46</span>
            <svg width="70" height="20" viewBox="0 0 70 20" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => <rect key={i} x={i * 8} y={14 - i * 4} width="5" height={6 + i * 4} fill="#e8e6e3" />)}
              <rect x="40" y="4" width="24" height="12" rx="3" fill="none" stroke="#e8e6e3" strokeWidth="2" />
              <rect x="42" y="6" width="14" height="8" fill="#e8e6e3" />
            </svg>
          </div>
          <div style={{display: "flex", alignItems: "center", gap: 12, background: "#17181c", borderRadius: 18, padding: "12px 20px", font: "500 22px " + mono, color: "#cfcdc9"}}>
            <svg width="16" height="20" viewBox="0 0 16 20" aria-hidden="true"><rect x="1" y="8" width="14" height="11" rx="3" fill="#ffbb78" /><path d="M4 8V6a4 4 0 0 1 8 0v2" fill="none" stroke="#ffbb78" strokeWidth="2.4" /></svg>
            support.atlassian.com
          </div>
          <div style={{font: "700 30px " + sans, color: "#4c9aff", margin: "26px 0 20px"}}>Atlassian Support</div>
          <div style={{display: "flex", alignItems: "center", gap: 14, opacity: pill, transform: `scale(${0.9 + pill * 0.1})`}}>
            <span style={{font: "500 22px " + mono, color: "#8b8986"}}>#104471</span>
            <span style={{font: "700 20px " + mono, color: p.bad, background: "#3a1418", border: "2px solid " + p.bad, borderRadius: 999, padding: "6px 16px", letterSpacing: 1}}>SITE UNREACHABLE</span>
            <span style={{marginLeft: "auto", font: "500 22px " + mono, color: "#8b8986"}}>07:46 UTC</span>
          </div>
          <div style={{font: "800 40px " + sans, color: "#f4f2ef", lineHeight: 1.15, margin: "22px 0 10px", opacity: pop(frame, C.phoneBody)}}>
            Our entire site is gone.
          </div>
          <div style={{font: "400 26px " + sans, color: "#b9b7b4", lineHeight: 1.35, opacity: pop(frame, C.phoneBody)}}>
            Jira, Confluence, everything. 404 on our own URL.
          </div>
          <div style={{height: 4, width: "72%", background: p.good, borderRadius: 4, margin: "18px 0 26px", opacity: pop(frame, C.phoneBody)}} />
          <div style={{font: "500 24px " + mono, color: "#cfcdc9", lineHeight: 2.0, opacity: pop(frame, C.phoneMono)}}>
            <div>site&nbsp;&nbsp;&nbsp;acme.atlassian.net</div>
            <div>status&nbsp;&nbsp;404 · <span style={{color: p.bad, border: "2px solid " + p.bad, borderRadius: 8, padding: "2px 10px", background: "#3a1418"}}>tenant not found</span></div>
            <div>since&nbsp;&nbsp;&nbsp;07:41 UTC</div>
          </div>
          <div style={{display: "flex", gap: 34, font: "600 24px " + sans, color: "#4c9aff", marginTop: 30, opacity: pop(frame, C.phoneMono)}}>
            <span>Status page</span><span>Contact support</span>
          </div>
        </div>
      </div>
      <ClockChip label="TUE 07:46 UTC" />
    </AbsoluteFill>
  );
}

/* ------------------------------------------------------------- scenes 2 + 3 */
function TerminalScene({frame, mode}: {frame: number; mode: "rewind" | "turn"}) {
  const alarm = mode === "turn" && frame >= C.scope;
  const typed = mode === "rewind" ? clamp(frame, [C.batch2, C.batch2 + 14], [0, 22]) : 22;
  const cmd = "$ cleanup --batch 02";
  const rewindP = clamp(frame, [C.rewind, C.rewind + 18], [0, 1]);
  const minute = mode === "rewind" ? 46 - Math.round(8 * rewindP) : 44;
  const rows = [0, 1, 2, 3].map((i) => pop(frame, starts.turn + 6 + i * 8, 6));
  return (
    <AbsoluteFill style={{background: p.background}}>
      <Glow color={alarm ? p.bad : p.good} x={38} y={42} strength={alarm ? 0.2 : 0.12} />
      <div style={{position: "absolute", left: 110, top: 140, width: 1180, background: "#0a0a0c",
        border: "3px solid " + (alarm ? p.bad : "#2a2a31"), borderRadius: 18, overflow: "hidden",
        boxShadow: "0 30px 80px #000a", transform: `translateY(${clamp(frame, [starts[mode], starts[mode] + 10], [16, 0])}px)`}}>
        <div style={{display: "flex", alignItems: "center", gap: 10, padding: "16px 24px", background: "#141418", borderBottom: "2px solid #2a2a31"}}>
          {[p.bad, p.accent, p.good].map((c) => <div key={c} style={{width: 14, height: 14, borderRadius: 14, background: c}} />)}
          <span style={{font: "500 22px " + mono, color: "#8b8986", marginLeft: 12}}>maintenance · prod-eu</span>
          <span style={{marginLeft: "auto", font: "700 22px " + mono, letterSpacing: 1, color: alarm ? p.bad : p.good,
            border: "2px solid " + (alarm ? p.bad : p.good), borderRadius: 8, padding: "4px 14px"}}>
            {mode === "rewind" ? "SCOPE: APPS" : alarm ? "SCOPE: SITES" : "SCOPE: APPS"}
          </span>
        </div>
        <div style={{padding: "30px 34px", font: "500 30px " + mono, lineHeight: 1.85, color: p.ink}}>
          {mode === "rewind" ? (
            <>
              <div>$ cleanup --batch 01</div>
              <div style={{color: p.good, opacity: pop(frame, starts.rewind + 8)}}>30 apps removed · 30/30 sites healthy</div>
              <div>{cmd.slice(0, typed)}{typed < cmd.length && <span style={{background: p.ink}}>&nbsp;</span>}</div>
              <div style={{color: p.muted, opacity: pop(frame, C.batch2 + 16)}}>resolving 883 identifiers…</div>
            </>
          ) : (
            <>
              <div>$ cleanup --batch 02</div>
              {["8f2c-11ab", "91d0-77c2", "4b8e-02fa", "c7a1-90dd"].map((id, i) => (
                <div key={id} style={{opacity: rows[i]}}>
                  <span style={{color: alarm ? p.bad : p.ink}}>delete {alarm ? "SITE " : ""}{id}</span>
                  <span style={{color: p.good}}> → OK</span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      {mode === "rewind" && (
        <div style={{position: "absolute", left: 1350, top: 250, width: 450, background: p.panel, border: "3px solid " + p.good,
          borderRadius: 18, padding: "26px 30px", opacity: pop(frame, C.recap), transform: `translateY(${(1 - pop(frame, C.recap)) * 14}px)`}}>
          <div style={{font: "700 22px " + mono, color: p.muted, letterSpacing: 2}}>EARLIER · BATCH 01</div>
          {["peer review", "staging run", "batch 01 prod"].map((label) => (
            <div key={label} style={{display: "flex", gap: 14, alignItems: "center", font: "600 28px " + sans, color: p.ink, marginTop: 16}}>
              <span style={{color: p.good, fontSize: 30}}>✓</span>{label}
            </div>
          ))}
        </div>
      )}
      {mode === "turn" && (
        <div style={{position: "absolute", left: 110, top: 760, font: "700 34px " + mono, color: p.bad, opacity: pop(frame, C.scope),
          border: "2px solid " + p.bad, borderRadius: 12, padding: "12px 24px", background: "#3a141866"}}>
          the tool returned OK.
        </div>
      )}
      <ClockChip label={`TUE 07:${String(minute).padStart(2, "0")} UTC`} />
    </AbsoluteFill>
  );
}

/* ------------------------------------------------------------------ scene 4 */
function CounterScene({frame}: {frame: number}) {
  const prog = clamp(frame, [C.count, ends.scale - 12], [0, 1]);
  const eased = 1 - Math.pow(1 - prog, 3);
  const count = Math.round(883 * eased);
  const shake = frame >= C.collapse && frame < C.collapse + 8 ? Math.sin(frame * 2.4) * 5 * (1 - (frame - C.collapse) / 8) : 0;
  const minute = 38 + Math.round(23 * prog);
  return (
    <AbsoluteFill style={{background: "#07090c", transform: `translate(${shake}px, 0)`}}>
      <Glow color={p.bad} x={30} y={40} strength={0.22} />
      <div style={{position: "absolute", left: 110, top: 150}}>
        <div style={{font: "700 26px " + mono, color: p.bad, letterSpacing: 2}}>07:38 → 08:01 UTC</div>
        <div style={{font: "900 210px " + sans, color: p.bad, letterSpacing: -10, lineHeight: 1.05}}>{count}</div>
        <div style={{font: "750 44px " + sans, color: p.ink}}>customer sites deleted</div>
      </div>
      <div style={{position: "absolute", left: 110, top: 620, display: "grid", gridTemplateColumns: "repeat(6, 148px)", gap: 14}}>
        {Array.from({length: 24}, (_, i) => {
          const gone = prog > ((i + 1) / 24) * 0.92;
          return (
            <div key={i} style={{width: 148, height: 92, borderRadius: 12, background: p.panel,
              border: "2px " + (gone ? "dashed " + p.bad : "solid " + p.line), opacity: gone ? 0.22 : 1,
              display: "grid", placeItems: "center", position: "relative"}}>
              <svg width="44" height="36" viewBox="0 0 64 52" fill="none" stroke={gone ? p.bad : p.muted} strokeWidth="4" aria-hidden="true">
                <rect x="5" y="7" width="54" height="40" rx="6" /><path d="M5 18h54M14 12h1m8 0h1" />
              </svg>
              {gone && <span style={{position: "absolute", font: "800 40px " + sans, color: p.bad}}>×</span>}
            </div>
          );
        })}
      </div>
      <div style={{position: "absolute", right: 70, bottom: -10, width: 560, height: 600,
        transform: `scale(${clamp(frame, [starts.scale, ends.scale], [1, 1.09])})`, transformOrigin: "50% 100%"}}>
        <Glow color={p.bad} x={50} y={30} strength={0.3} />
        <IncidentCharacter profile="arjun" expression="shock" mouth="closed" blink={false} gesture="rest" style={{width: "100%", height: "100%"}} />
      </div>
      <ClockChip label={`TUE 07:${String(minute).padStart(2, "0")} UTC`} />
    </AbsoluteFill>
  );
}

/* ------------------------------------------------------------------ scene 5 */
function ChatScene({frame}: {frame: number}) {
  const msgs = [
    {at: starts.chat + 6, name: "You", time: "7:46 AM", color: "#4c9aff", text: "is anyone else's cloud site down?", v: 0},
    {at: C.chat2, name: "Mark", time: "7:47 AM", color: "#e8e6e3", text: "ours is completely gone. 404.", v: 1},
    {at: C.chat3, name: "Anna", time: "7:52 AM", color: "#e8e6e3", text: "support form wants our site URL. the site IS the problem.", v: 2},
    {at: C.chat4, name: "Robert", time: "8:17 AM", color: "#e8e6e3", text: "who ran maintenance this morning?", v: 3},
  ];
  return (
    <AbsoluteFill style={{background: "#050607"}}>
      <div style={{position: "absolute", inset: "56px 64px", background: "#0b0d10", border: "2px solid #26282c", borderRadius: 22,
        display: "flex", overflow: "hidden", boxShadow: "0 30px 90px #000b", opacity: clamp(frame, [starts.chat, starts.chat + 8], [0, 1])}}>
        <div style={{width: 300, borderRight: "2px solid #26282c", padding: "30px 24px", font: "600 24px " + sans, color: "#b9b7b4"}}>
          <div style={{font: "800 28px " + sans, color: "#f4f2ef", marginBottom: 22}}>Engineering</div>
          {["# infrastructure", "# incident", "# infra-changes", "# alerts"].map((ch) => (
            <div key={ch} style={{padding: "9px 14px", borderRadius: 9, marginBottom: 6,
              background: ch === "# incident" ? "#1f4fd8" : "transparent", color: ch === "# incident" ? "#fff" : "#b9b7b4"}}>{ch}</div>
          ))}
          <div style={{margin: "26px 0 12px", font: "600 22px " + sans, color: "#8b8986"}}>Direct messages</div>
          {["Mark", "Anna", "Robert"].map((n) => (
            <div key={n} style={{padding: "6px 14px", color: "#b9b7b4"}}>• {n}</div>
          ))}
        </div>
        <div style={{flex: 1, display: "flex", flexDirection: "column", padding: "26px 40px"}}>
          <div style={{display: "flex", alignItems: "center", borderBottom: "2px solid #26282c", paddingBottom: 20}}>
            <span style={{font: "800 34px " + sans, color: "#f4f2ef"}}># incident</span>
            <span style={{marginLeft: "auto", font: "500 24px " + mono, color: "#8b8986"}}>
              TUE {frame >= C.chat4 ? "08:17" : frame >= C.chat3 ? "07:52" : "07:46"} AM
            </span>
          </div>
          <div style={{flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 30, padding: "30px 0"}}>
            {msgs.map((m) => {
              const o = pop(frame, m.at, 8);
              return (
                <div key={m.name} style={{display: "flex", gap: 18, opacity: o, transform: `translateY(${(1 - o) * 14}px)`}}>
                  <Wojak variant={m.v} />
                  <div>
                    <div style={{display: "flex", gap: 14, alignItems: "baseline"}}>
                      <span style={{font: "800 26px " + sans, color: m.color}}>{m.name}</span>
                      <span style={{font: "500 20px " + mono, color: "#8b8986"}}>{m.time}</span>
                    </div>
                    <div style={{font: "500 30px " + sans, color: "#e8e6e3", lineHeight: 1.3, marginTop: 4}}>{m.text}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{border: "2px solid #26282c", borderRadius: 12, padding: "16px 24px", font: "400 26px " + sans, color: "#8b8986"}}>
            Message #incident
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

/* ------------------------------------------------------------------ scene 6 */
function TitleScene({frame}: {frame: number}) {
  const o = pop(frame, C.titleIn, 12);
  const flipped = frame >= C.flip;
  const flicker = flipped && frame < C.flip + 6 ? (frame % 2 ? 0.35 : 1) : 1;
  return (
    <AbsoluteFill style={{background: "#060709"}}>
      <Glow color={p.bad} x={22} y={60} strength={0.18} />
      <div style={{position: "absolute", left: 40, bottom: -14, width: 640, height: 680, opacity: 0.96}}>
        <IncidentCharacter profile="arjun" expression="thinking" mouth="closed" blink={(frame % 103) > 99} gesture="rest" style={{width: "100%", height: "100%"}} />
      </div>
      <div style={{position: "absolute", left: 730, right: 90, top: 160, opacity: o, transform: `translateY(${(1 - o) * 22}px)`}}>
        <div style={{font: "700 26px " + mono, color: p.accent, letterSpacing: 2}}>BASED ON A REAL INCIDENT · APRIL 5, 2022</div>
        <div style={{font: "900 92px " + sans, color: p.ink, lineHeight: 1.06, letterSpacing: -4, marginTop: 22}}>
          The cleanup script that deleted <span style={{color: p.bad}}>883 sites</span>
        </div>
        <div style={{font: "650 40px " + sans, color: p.muted, marginTop: 26}}>23 minutes to delete · 14 days to restore</div>
      </div>
      <div style={{position: "absolute", left: 730, top: 730, display: "flex", gap: 22, alignItems: "center", opacity: o}}>
        <span style={{font: "700 30px " + mono, color: flipped ? p.bad : p.good, border: "3px solid " + (flipped ? p.bad : p.good),
          borderRadius: 12, padding: "12px 26px", background: flipped ? "#3a1418" : "#12301f", opacity: flicker}}>
          {flipped ? "batch 02 ✗" : "batch 01 ✓"}
        </span>
        <span style={{font: "500 26px " + sans, color: p.muted}}>same tool. same green check.</span>
      </div>
      <div style={{position: "absolute", left: 730, bottom: 60, font: "400 22px " + sans, color: "#8b8986", opacity: o}}>
        Source: Atlassian post-incident review · April 2022
      </div>
    </AbsoluteFill>
  );
}

export function ColdOpen() {
  const frame = useCurrentFrame();
  const scene = order.find((id) => frame >= starts[id] && frame < ends[id]) ?? "title";
  return (
    <AbsoluteFill style={{background: "#050607", fontFamily: sans}}>
      <Audio src={staticFile("narration/cold-open.wav")} volume={0.95} />
      <Sequence from={C.rewind} durationInFrames={22}><Audio src={staticFile("narration/host-tick.wav")} volume={0.18} /></Sequence>
      <Sequence from={C.batch2} durationInFrames={14}><Audio src={staticFile("narration/host-tick.wav")} volume={0.15} /></Sequence>
      <Sequence from={starts.scale} durationInFrames={26}><Audio src={staticFile("narration/host-alert.wav")} volume={0.2} /></Sequence>
      <Sequence from={C.chat2} durationInFrames={10}><Audio src={staticFile("narration/host-tick.wav")} volume={0.12} /></Sequence>
      <Sequence from={C.chat3} durationInFrames={10}><Audio src={staticFile("narration/host-tick.wav")} volume={0.12} /></Sequence>
      <Sequence from={C.chat4} durationInFrames={10}><Audio src={staticFile("narration/host-tick.wav")} volume={0.12} /></Sequence>
      <Sequence from={C.flip} durationInFrames={20}><Audio src={staticFile("narration/host-alert.wav")} volume={0.16} /></Sequence>
      {scene === "ticket" && <PhoneScene frame={frame} />}
      {scene === "rewind" && <TerminalScene frame={frame} mode="rewind" />}
      {scene === "turn" && <TerminalScene frame={frame} mode="turn" />}
      {scene === "scale" && <CounterScene frame={frame} />}
      {scene === "chat" && <ChatScene frame={frame} />}
      {scene === "title" && <TitleScene frame={frame} />}
      <Grain />
      <Vignette />
      <AbsoluteFill style={{background: "#000", opacity: clamp(frame, [0, 10], [1, 0]), pointerEvents: "none"}} />
      <AbsoluteFill style={{background: "#000", opacity: clamp(frame, [coldTotalFrames - 18, coldTotalFrames - 1], [0, 1]), pointerEvents: "none"}} />
    </AbsoluteFill>
  );
}