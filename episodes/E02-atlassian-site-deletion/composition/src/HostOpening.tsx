import React from "react";
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame} from "remotion";
import {createClock} from "@studio/kit";
import {IncidentCharacter} from "../../../../studio/src/incident/Character";
import {incidentPalettes, type IncidentPalette, type IncidentControls} from "../../../../studio/src/incident/design";
import script from "../../host/narration/segments.json";
import timing from "../../host/transcript/words.json";
import loudness from "../../host/narration/mouth-envelope.json";

type Actor = "arjun" | "maya";
type Face = "smile" | "skeptical" | "shock" | "thinking" | "neutral";
type Gesture = "rest" | "mug" | "point";
type Mouth = "closed" | "small" | "open" | "wide";
type Shot = "desk" | "reverse" | "queue" | "alert" | "workbench" | "app" | "site" | "ticket";

export const hostClock = createClock(timing);
const beats = script.segments.map((segment) => ({
  ...segment,
  ...hostClock.segRange(segment.id),
  speaker: segment.speaker as Actor,
  expression: segment.expression as Face,
  gesture: segment.gesture as Gesture,
  shot: segment.shot as Shot,
}));
type Beat = typeof beats[number];

const sans = "'Segoe UI', Arial, sans-serif";
const mono = "'Consolas', 'Courier New', monospace";
const cutStart = (id: string) => hostClock.fr(hostClock.segRange(id).start);
const cue = (id: string, word: string) => hostClock.spoken(word, hostClock.segRange(id).start);
const titleCue = cue("scale", "eighty-three");
const appCue = cue("app", "takes");
const siteCue = cue("site", "takes");
const nextCue = cue("next", "customer");

const clamp = (frame: number, range: [number, number], output: [number, number]) =>
  interpolate(frame, range, output, {extrapolateLeft: "clamp", extrapolateRight: "clamp"});

function Icon({name, color, size = 72}: {name: "app" | "site" | "ticket" | "folder" | "people"; color: string; size?: number}) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true"
      stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      {name === "app" && <><rect x="9" y="9" width="46" height="46" rx="10"/><path d="M20 32h24M32 20v24"/></>}
      {name === "site" && <><rect x="7" y="11" width="50" height="42" rx="6"/><path d="M7 22h50M16 16h1m8 0h1M18 34h28m-28 9h18"/></>}
      {name === "ticket" && <><path d="M7 18h50v10a5 5 0 0 0 0 10v9H7v-9a5 5 0 0 0 0-10zM43 20v5m0 6v5m0 6v4"/><path d="M17 28h16m-16 9h11"/></>}
      {name === "folder" && <path d="M7 49V17h19l6 7h25v25zM7 31h50"/>}
      {name === "people" && <><circle cx="27" cy="23" r="9"/><path d="M8 49c3-15 32-15 37 0m-4-34a9 9 0 0 1 0 17m7 4c6 2 8 7 9 13"/></>}
    </svg>
  );
}

function ScreenType({children, color, size = 29}: {children: React.ReactNode; color: string; size?: number}) {
  return <div style={{font: "700 " + size + "px " + mono, color, letterSpacing: 1.8}}>{children}</div>;
}

function Note({children, p}: {children: React.ReactNode; p: IncidentPalette}) {
  return <div style={{padding: "15px 22px", background: p.panel, border: "2px solid " + p.line,
    borderRadius: 15, color: p.ink, fontSize: 27, lineHeight: 1.2}}>{children}</div>;
}

function Set({p, paper, reverse}: {p: IncidentPalette; paper: boolean; reverse: boolean}) {
  return (
    <AbsoluteFill style={{overflow: "hidden", background: p.background}}>
      <AbsoluteFill style={{background: "radial-gradient(ellipse at " + (reverse ? "82%" : "23%") + " 43%, " + p.wall + " 0%, " + p.background + " 71%)"}}/>
      <svg viewBox="0 0 1920 1080" style={{position: "absolute", width: "100%", height: "100%", transform: reverse ? "scaleX(-1)" : undefined}} aria-hidden="true">
        <defs>
          <linearGradient id="window-fill" x1="0" y1="0" x2=".65" y2="1">
            <stop stopColor={paper ? "#f6deb4" : "#1b4660"}/><stop offset="1" stopColor={p.background}/>
          </linearGradient>
          <pattern id="set-grain" width="23" height="19" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="2" r="1.2" fill={p.ink} opacity=".08"/><circle cx="17" cy="14" r=".8" fill={p.ink} opacity=".08"/>
          </pattern>
        </defs>
        <rect x="89" y="85" width="660" height="500" rx="19" fill="url(#window-fill)" stroke={p.line} strokeWidth="7"/>
        <path d="M420 88v500M91 347h655" stroke={p.line} strokeWidth="7"/>
        <path d="M100 520v-91h58v-48h51v107h79v-167h54v124h54v-65h70v-92h56v171h68v-116h63v87h86v90Z" fill={p.background} opacity=".62"/>
        <path d="M546 152h95m-130 25h179m-117 22h133" stroke={p.ink} opacity=".11" strokeWidth="4"/>
        <path d="M1082 96h671m-671 30h558M1100 800V180h659v620" stroke={p.line} opacity=".25" strokeWidth="4"/>
        <path d="M1700 814h-58m18-24h59" stroke={p.ink} opacity=".22" strokeWidth="5"/>
        <rect width="1920" height="1080" fill="url(#set-grain)"/>
      </svg>
    </AbsoluteFill>
  );
}

function Laptop({p, mood, gag, run}: {p: IncidentPalette; mood: "normal" | "alarm"; gag: boolean; run: number}) {
  return (
    <div style={{width: 600, position: "relative"}}>
      <div style={{padding: 15, background: "#242733", border: "3px solid #5d6471", borderRadius: "28px 28px 10px 10px",
        boxShadow: "0 24px 62px #04080b65", height: 378}}>
        <div style={{height: "100%", borderRadius: 15, overflow: "hidden", background: p.panel, color: p.ink}}>
          <div style={{display: "flex", alignItems: "center", gap: 9, padding: "15px 22px", borderBottom: "2px solid " + p.line}}>
            {[p.bad, p.accent, p.good].map((color) => <div key={color} style={{width: 10, height: 10, borderRadius: 9, background: color}}/>)}
            <span style={{fontFamily: mono, fontSize: 18, marginLeft: 13, color: p.muted}}>maintenance console</span>
          </div>
          <div style={{padding: "32px 30px"}}>
            <ScreenType color={mood === "alarm" ? p.bad : p.good} size={22}>{mood === "alarm" ? "BATCH 02 · SCOPE CHANGED" : "BATCH 01 · COMPLETED"}</ScreenType>
            <div style={{fontSize: 45, fontWeight: 800, marginTop: 12}}>{mood === "alarm" ? "Sites removed" : "30 sites healthy"}</div>
            <div style={{marginTop: 18, color: p.muted, fontSize: 26}}>{gag ? "Close ticket?  ·  [Cancel]" : mood === "alarm" ? "Input list: site IDs" : "Insight removed · app IDs"}</div>
            {run > 0 && <div style={{height: 6, marginTop: 20, borderRadius: 10, background: p.line}}>
              <div style={{width: (run * 100) + "%", height: "100%", borderRadius: 10, background: p.bad}}/>
            </div>}
          </div>
        </div>
      </div>
      <div style={{height: 19, background: "#646675", margin: "0 -42px", borderRadius: "1px 1px 36px 36px"}}/>
    </div>
  );
}

function DialogueShot({beat, p, controls, frame}: {beat: Beat; p: IncidentPalette; controls: IncidentControls; frame: number}) {
  const reverse = beat.shot === "reverse";
  const frightened = beat.shot === "alert" || beat.id === "disbelief";
  const close = frightened || beat.id === "joke";
  const timingStart = hostClock.fr(beat.start);
  const mouthValue = loudness[frame] ?? 0;
  const mouth: Mouth = frame > hostClock.fr(beat.end) || mouthValue < 2 ? "closed" :
    mouthValue < 6 ? "small" : mouthValue < 14 ? "open" : "wide";
  const profile = controls.swapCharacterDesigns ? (beat.speaker === "arjun" ? "maya" : "arjun") : beat.speaker;
  const zoom = clamp(frame, [timingStart, timingStart + (close ? 10 : 90)], [close ? 1.045 : 1, close ? 1.16 : 1.018]);
  const nod = mouth === "closed" ? 0 : Math.sin(frame / 7) * 2.7;
  const blink = !frightened && ((frame + (reverse ? 31 : 0)) % 103 > 99);
  const gag = controls.showReactionGag && beat.id === "joke" && frame >= cue("joke", "close");
  const monitorAlarm = frightened || beat.id === "turn";
  return (
    <AbsoluteFill>
      <Set p={p} paper={controls.paperStyle} reverse={reverse}/>
      <AbsoluteFill style={{transform: "scale(" + zoom + ")", transformOrigin: reverse ? "76% 51%" : "32% 48%"}}>
        <div style={{position: "absolute", width: close ? 895 : 790, height: close ? 926 : 830, bottom: 57,
          left: reverse ? 850 : 115, transform: "translateY(" + nod + "px)"}}>
          <IncidentCharacter profile={profile} expression={beat.expression} mouth={mouth}
            gesture={beat.gesture} blink={blink} style={{width: "100%", height: "100%"}}/>
        </div>
        <div style={{position: "absolute", top: reverse ? 398 : 302, left: reverse ? 150 : 1066,
          transform: reverse ? "rotate(-2deg) scale(.86)" : "rotate(2deg)"}}>
          <Laptop p={p} mood={monitorAlarm ? "alarm" : "normal"} gag={gag} run={0}/>
        </div>
        <div style={{position: "absolute", bottom: 0, left: 0, right: 0, height: 180,
          background: "linear-gradient(170deg, " + p.desk + ", " + p.background + ")", borderTop: "3px solid " + p.line}}>
          <div style={{position: "absolute", left: reverse ? 1430 : 430, top: 24, width: 350, height: 4, background: p.ink, opacity: .10}}/>
        </div>
      </AbsoluteFill>
      {beat.id === "relief" && <div style={{position: "absolute", top: 67, left: 78}}>
        <ScreenType color={p.accent} size={23}>DRAMATIZED HOST SEGMENT</ScreenType>
      </div>}
      {beat.id === "scale" && frame >= titleCue && (
        <div style={{position: "absolute", left: 1060, right: 95, top: 117, background: p.panel,
          border: "3px solid " + p.bad, padding: "25px 36px", borderRadius: 18,
          transform: "translateY(" + clamp(frame, [titleCue, titleCue + 9], [12, 0]) + "px)"}}>
          <div style={{fontSize: 91, lineHeight: 1.02, fontWeight: 900, letterSpacing: -5, color: p.bad}}>883 sites</div>
          <div style={{fontSize: 40, fontWeight: 740, color: p.ink}}>deleted in 23 minutes</div>
        </div>
      )}
      {gag && <div style={{position: "absolute", left: 1120, top: 750, transform: "rotate(-4deg)"}}>
        <Note p={p}>Close laptop · request denied</Note>
      </div>}
    </AbsoluteFill>
  );
}

function ScopeTable({beat, p, frame}: {beat: Beat; p: IncidentPalette; frame: number}) {
  const which = beat.shot === "site" ? "site" : "app";
  const applyCue = which === "site" ? siteCue : appCue;
  const moved = beat.shot === "workbench" ? 0 : clamp(frame, [applyCue, applyCue + 17], [0, 1]);
  const settle = clamp(frame, [hostClock.fr(beat.start), hostClock.fr(beat.start) + 13], [13, 0]);
  const hideSite = which === "site" ? moved : 0;
  const hideApp = which === "app" ? moved : 0;
  const tone = which === "site" ? p.bad : p.good;
  return (
    <AbsoluteFill style={{background: p.background, color: p.ink}}>
      <AbsoluteFill style={{backgroundImage: "radial-gradient(" + p.line + " 1.4px, transparent 1.4px)", backgroundSize: "34px 34px", opacity: .52}}/>
      <div style={{position: "absolute", left: 122, top: 118}}>
        <ScreenType color={p.accent} size={26}>HOW THE CLEANUP WORKED</ScreenType>
        <div style={{fontSize: 91, letterSpacing: -5, lineHeight: 1.06, fontWeight: 850, marginTop: 14}}>Same tool. Different target.</div>
      </div>
      <div style={{position: "absolute", top: 385, left: 154, width: 415, padding: 33, background: p.panel, borderRadius: 21,
        border: "3px solid " + (beat.shot === "workbench" ? p.line : tone), transform: "translateY(" + settle + "px)"}}>
        <ScreenType color={p.muted} size={22}>INPUT LIST</ScreenType>
        <div style={{fontSize: 59, fontWeight: 850, marginTop: 10}}>{beat.shot === "workbench" ? "Two ID types" : which === "site" ? "Site ID" : "App ID"}</div>
        <div style={{color: p.muted, fontSize: 25, marginTop: 11}}>Illustrated example</div>
      </div>
      <div style={{position: "absolute", left: 601, top: 463, width: 385}}>
        <ScreenType color={p.accent} size={23}>CLEANUP TOOL</ScreenType>
        <svg viewBox="0 0 385 80" width="385" height="80" fill="none" aria-hidden="true">
          <path d="M5 39H365m-21-21 22 21-22 21" stroke={p.line} strokeWidth="5"/>
          {moved > 0 && <circle cx={14 + 347 * moved} cy="39" r="12" fill={tone}/>}
        </svg>
      </div>
      <div style={{position: "absolute", left: 1013, top: 343, width: 749, height: 427, borderRadius: 30,
        border: "4px " + (hideSite > .9 ? "dashed " : "solid ") + (hideSite > .9 ? p.bad : p.line), background: p.panel,
        boxShadow: "0 20px 50px #0002"}}>
        <div style={{opacity: 1 - hideSite * .78, transform: "translateX(" + (hideSite * 23) + "px)", padding: 30}}>
          <div style={{display: "flex", gap: 18, alignItems: "center"}}>
            <Icon name="site" color={p.ink} size={62}/>
            <div style={{fontSize: 50, fontWeight: 790}}>Customer site</div>
          </div>
          <div style={{display: "flex", gap: 15, marginTop: 23}}>
            <Note p={p}><Icon name="folder" color={p.muted} size={38}/> Projects</Note>
            <Note p={p}><Icon name="people" color={p.muted} size={38}/> Users</Note>
          </div>
          <div style={{padding: 20, display: "flex", alignItems: "center", gap: 16, width: "fit-content", marginTop: 20,
            borderRadius: 15, border: "2px solid " + p.good, color: p.good, fontSize: 36, fontWeight: 700,
            opacity: 1 - hideApp, transform: "translateX(" + (110 * hideApp) + "px)"}}>
            <Icon name="app" color={p.good} size={45}/> Insight app
          </div>
        </div>
        {hideSite > 0 && <div style={{position: "absolute", inset: 0, display: "grid", placeItems: "center",
          fontSize: 93, color: p.bad, fontWeight: 800, opacity: hideSite}}>×</div>}
        {hideApp > .7 && <div style={{position: "absolute", left: 31, bottom: 50}}>
          <ScreenType color={p.good} size={29}>SITE STAYS UP</ScreenType>
        </div>}
      </div>
      {hideSite > .7 && <div style={{position: "absolute", top: 796, left: 1020}}>
        <ScreenType color={p.bad} size={34}>WHOLE SITE REMOVED</ScreenType>
      </div>}
    </AbsoluteFill>
  );
}

function Evidence({beat, p, frame}: {beat: Beat; p: IncidentPalette; frame: number}) {
  const ticket = beat.shot === "ticket";
  const started = cutStart(beat.id);
  const t = clamp(frame, [started, started + 24], [0, 1]);
  return (
    <AbsoluteFill style={{background: "radial-gradient(ellipse at 52% 30%, " + p.wall + ", " + p.background + " 80%)", color: p.ink}}>
      <div style={{position: "absolute", left: 141, top: 166, right: 140}}>
        <ScreenType color={p.accent} size={27}>{ticket ? "THE FIRST CLUE" : "APRIL 5, 2022 · PRODUCTION"}</ScreenType>
        <div style={{fontSize: 89, fontWeight: 850, letterSpacing: -3, margin: "18px 0 55px"}}>
          {ticket ? "A customer files a ticket." : "The next batch runs."}
        </div>
        <div style={{display: "flex", gap: 34, alignItems: "stretch"}}>
          <div style={{width: 900, padding: 40, borderRadius: 22, border: "2px solid " + p.line, background: p.panel}}>
            <div style={{display: "flex", gap: 23, alignItems: "center"}}>
              <Icon name={ticket ? "ticket" : "site"} color={ticket ? p.accent : p.bad}/>
              <div>
                <ScreenType color={p.muted} size={25}>{ticket ? "07:46 UTC" : "07:38 UTC"}</ScreenType>
                <div style={{fontSize: 42, fontWeight: 770}}>{ticket ? "First affected customer report" : "Maintenance job starts"}</div>
              </div>
            </div>
            <div style={{height: 8, marginTop: 38, background: p.line, borderRadius: 10}}>
              <div style={{height: 8, width: (t * (ticket ? 46 : 100)) + "%", borderRadius: 10, background: p.bad}}/>
            </div>
          </div>
          <div style={{alignSelf: "center", opacity: ticket ? clamp(frame, [nextCue, nextCue + 11], [0, 1]) : t,
            transform: "translateX(" + (1 - t) * 18 + "px)"}}>
            <Note p={p}>{ticket ? "The job is still running." : "Batch 02 queued"}</Note>
          </div>
        </div>
        {ticket && <div style={{marginTop: 43, fontSize: 23, color: p.muted}}>Source · Atlassian April 2022 incident review</div>}
      </div>
    </AbsoluteFill>
  );
}

export function HostOpening(controls: IncidentControls) {
  const p = controls.paperStyle ? incidentPalettes.paper : incidentPalettes.night;
  const frame = useCurrentFrame();
  const time = frame / hostClock.fps;
  const beat = beats.reduce((active, candidate) => time >= candidate.start ? candidate : active, beats[0]);
  const showDiagram = beat.shot === "workbench" || beat.shot === "app" || beat.shot === "site";
  const showEvidence = beat.shot === "queue" || beat.shot === "ticket";
  return (
    <AbsoluteFill style={{background: p.background, color: p.ink, fontFamily: sans}}>
      <Audio src={staticFile("narration/host-opening.wav")} volume={0.92}/>
      {controls.soundEffects && (
        <>
          <Sequence from={cutStart("run")} durationInFrames={22}><Audio src={staticFile("narration/host-tick.wav")} volume={0.20}/></Sequence>
          <Sequence from={titleCue} durationInFrames={26}><Audio src={staticFile("narration/host-alert.wav")} volume={0.19}/></Sequence>
          <Sequence from={appCue} durationInFrames={14}><Audio src={staticFile("narration/host-tick.wav")} volume={0.17}/></Sequence>
          <Sequence from={siteCue} durationInFrames={20}><Audio src={staticFile("narration/host-alert.wav")} volume={0.15}/></Sequence>
        </>
      )}
      {showDiagram ? <ScopeTable beat={beat} p={p} frame={frame}/> : showEvidence ?
        <Evidence beat={beat} p={p} frame={frame}/> :
        <DialogueShot beat={beat} p={p} frame={frame} controls={controls}/>}
      {controls.showCaptions && time >= beat.start && time <= beat.end + .14 && (
        <div style={{position: "absolute", bottom: 38, left: 157, right: 157, textAlign: "center"}}>
          <span style={{display: "inline-block", maxWidth: 1310, fontSize: 32, lineHeight: 1.23, fontWeight: 670,
            padding: "10px 24px", color: "#fff5e8", background: "#10131de8", borderRadius: 9}}>
            {beat.text}
          </span>
        </div>
      )}
    </AbsoluteFill>
  );
}
