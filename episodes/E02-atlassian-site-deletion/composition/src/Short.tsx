import React from "react";
import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame} from "remotion";
import {createClock} from "@studio/kit";
import timing from "./data/words.json";

export const clock = createClock(timing);

const ink = "#f4f1e9";
const muted = "#a3b2c6";
const green = "#91f4c3";
const orange = "#ffae70";
const red = "#ff7c82";
const line = "#33455a";
const mono = "'Consolas', 'Courier New', monospace";
const sans = "'Segoe UI', Arial, sans-serif";
const segments = ["hook", "intent", "reveal", "impact", "recovery", "lesson"];
const starts = segments.map((id) => clock.fr(clock.segRange(id).start));
const captions = segments.flatMap((segment) => {
  const words = clock.words.filter((word) => word.seg === segment && !word.gap);
  const lines: (typeof words)[] = [];
  let current: typeof words = [];
  for (const word of words) {
    current.push(word);
    const text = current.map(({raw, w}) => raw || w).join(" ");
    const endsSentence = /[.!?]$/.test(word.raw || word.w);
    if (endsSentence || (current.length >= 5 && text.length >= 33)) {
      lines.push(current);
      current = [];
    }
  }
  if (current.length > 0) lines.push(current);
  for (let i = lines.length - 1; i > 0; i--) {
    if (lines[i].length <= 2 && lines[i - 1].length + lines[i].length <= 9) {
      lines[i - 1].push(...lines[i]);
      lines.splice(i, 1);
    }
  }
  return lines.map((words) => ({
    text: words.map(({raw, w}) => raw || w).join(" "),
    s: words[0].s,
    e: words.at(-1)!.e,
  }));
});

const cue = (segment: string, word: string) => clock.spoken(word, clock.segRange(segment).start);
const cues = {
  passed: cue("hook", "passed"),
  worked: cue("hook", "worked"),
  deleted: cue("hook", "deleted"),
  app: cue("intent", "insight"),
  siteId: cue("intent", "site"),
  appRoute: cue("reveal", "app"),
  siteRoute: cue("reveal", "site"),
  appRemoved: cue("reveal", "removes"),
  siteRemoved: cue("reveal", "whole"),
  lost: cue("impact", "lost"),
  contact: cue("impact", "contact"),
  support: cue("impact", "support"),
  original: cue("recovery", "original"),
  fourteen: cue("recovery", "fourteen"),
  preview: cue("lesson", "show"),
};

function Reveal({at, children}: {at: number; children: React.ReactNode}) {
  const frame = useCurrentFrame();
  const visibility = interpolate(frame, [at, at + 10], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  return <div style={{opacity: visibility, transform: "translateY(" + (1 - visibility) * 18 + "px)"}}>{children}</div>;
}

function Label({children, color = muted}: {children: React.ReactNode; color?: string}) {
  return <div style={{fontFamily: mono, fontSize: 29, fontWeight: 700, color, letterSpacing: 2}}>{children}</div>;
}

function Panel({children, accent = line}: {children: React.ReactNode; accent?: string}) {
  return (
    <div style={{background: "#152030", border: "2px solid " + accent, borderRadius: 28, padding: "28px 36px", boxShadow: "0 20px 54px #060b1466"}}>
      {children}
    </div>
  );
}

function Row({at, label, status, tone}: {at: number; label: string; status: string; tone: string}) {
  return (
    <Reveal at={at}>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "26px 0", gap: 18, borderBottom: "1px solid " + line}}>
        <span style={{fontSize: 42, fontWeight: 650}}>{label}</span>
        <span style={{fontFamily: mono, fontSize: 31, color: tone, textAlign: "right"}}>{status}</span>
      </div>
    </Reveal>
  );
}

function Engineer({warning}: {warning: boolean}) {
  const monitorColor = warning ? red : green;
  return (
    <svg viewBox="0 0 840 440" width="100%" aria-hidden="true">
      <rect x="0" y="0" width="840" height="440" rx="28" fill="#111c2c" stroke="#33455a" strokeWidth="2"/>
      <circle cx="170" cy="110" r="162" fill="#294958" opacity=".24"/>
      <path d="M15 342H825" stroke="#40566e" strokeWidth="3"/>
      <path d="M47 341Q64 268 174 250H252Q313 265 327 341" fill="#2d5765"/>
      <path d="M169 248V220H245V253Q214 281 169 248" fill="#bb7f60"/>
      <path d="M153 148Q158 87 213 85Q269 87 268 143L258 187Q244 226 209 225Q173 216 162 182Z" fill="#dba385"/>
      <path d="M154 169Q131 125 151 97Q184 56 238 72Q271 78 273 125Q219 138 179 113L167 170Z" fill="#101725"/>
      <path d="M194 159h12m28 0h12m-33 31q12 8 23 0" stroke="#553c3b" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <path d="M141 147v34m128-34v34M142 151Q144 86 213 86Q267 86 270 151" fill="none" stroke="#6b7b99" strokeWidth="10" strokeLinecap="round"/>
      <rect x="366" y="83" width="380" height="218" rx="19" fill="#0c1421" stroke="#5b708a" strokeWidth="4"/>
      <path d="M558 303v37m-74 0h147" stroke="#6b7b99" strokeWidth="7" strokeLinecap="round"/>
      <path d="M408 145h112m-112 37h209m-209 37h141" stroke="#4a6483" strokeWidth="9" strokeLinecap="round"/>
      <circle cx="677" cy="210" r="32" fill={monitorColor} opacity=".16"/>
      <path d={warning ? "M677 190v23m0 13v1" : "m659 210 13 13 22-25"} stroke={monitorColor} strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M70 383h695" stroke="#26394e" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  );
}

function Intro() {
  const warning = useCurrentFrame() >= cues.deleted;
  return (
    <>
      <Label>ATLASSIAN CLOUD · APRIL 2022</Label>
      <div style={{fontSize: 102, fontWeight: 820, lineHeight: 1.02, letterSpacing: -5}}>
        {warning ? <>883 sites<br/><span style={{color: red}}>deleted.</span></> : <>The first batch<br/><span style={{color: green}}>worked.</span></>}
      </div>
      <Engineer warning={warning}/>
      <Panel accent={warning ? "#90505e" : line}>
        <Row at={cues.passed} label="Staging" status="✓ Passed" tone={green}/>
        <Row at={cues.worked} label="Production batch 1" status="✓ 30 sites OK" tone={green}/>
        <Row at={cues.deleted} label="Production batch 2" status="! Sites deleted" tone={red}/>
      </Panel>
    </>
  );
}

function Intent() {
  return (
    <>
      <Label>THE MAINTENANCE JOB</Label>
      <div style={{fontSize: 89, fontWeight: 820, lineHeight: 1.04, letterSpacing: -4}}>Remove an app.</div>
      <Panel>
        <Label>CUSTOMER SITE</Label>
        <div style={{fontSize: 56, fontWeight: 750, margin: "19px 0 22px"}}>Projects, users, files</div>
        <Reveal at={cues.app}>
          <div style={{background: "#20453e", border: "2px solid #60b99d", padding: 25, borderRadius: 18, fontSize: 51, color: green, fontWeight: 740}}>Insight app</div>
        </Reveal>
      </Panel>
      <Reveal at={cues.siteId}>
        <Panel accent={orange}>
          <Label color={orange}>SECOND INPUT LIST</Label>
          <div style={{fontSize: 62, fontWeight: 800, marginTop: 10}}>Site IDs</div>
        </Panel>
      </Reveal>
    </>
  );
}

function Route({scope, at, resolvedAt}: {scope: "app" | "site"; at: number; resolvedAt: number}) {
  const frame = useCurrentFrame();
  const wholeSite = scope === "site";
  const finished = frame >= resolvedAt;
  const color = wholeSite ? red : green;
  const progress = interpolate(frame, [resolvedAt, resolvedAt + 12], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const status = wholeSite ? "Site removed" : "App removed";
  return (
    <Reveal at={at}>
      <Panel accent={finished ? color : line}>
        <Label color={color}>{scope.toUpperCase()} ID</Label>
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "center", marginTop: 16}}>
          <div style={{position: "relative", padding: "12px 15px", borderRadius: 13, border: "2px solid " + (finished && wholeSite ? red : muted)}}>
            <div style={{opacity: wholeSite ? 1 - progress * .75 : 1}}>
              <div style={{fontSize: 34, fontWeight: 700}}>Site</div>
              <div style={{fontSize: 27, padding: "5px 11px", marginTop: 7, borderRadius: 6, background: "#295447", color: green, opacity: 1 - progress}}>Insight app</div>
            </div>
            {wholeSite && <div style={{position: "absolute", inset: 0, display: "grid", placeItems: "center", fontSize: 66, color: red, opacity: progress}}>×</div>}
            {!wholeSite && <div style={{position: "absolute", bottom: 15, left: 15, fontFamily: mono, fontSize: 23, color: green, opacity: progress}}>Site stays up</div>}
          </div>
          <div style={{fontSize: 39, fontWeight: 750, color: finished ? color : muted}}>{finished ? status : "→ Resolve target"}</div>
        </div>
      </Panel>
    </Reveal>
  );
}

function RevealScope() {
  return (
    <>
      <Label>THE ROOT CAUSE</Label>
      <div style={{fontSize: 85, fontWeight: 820, lineHeight: 1.04, letterSpacing: -4}}>One API.<br/>Two possible targets.</div>
      <Route scope="app" at={cues.appRoute} resolvedAt={cues.appRemoved}/>
      <Route scope="site" at={cues.siteRoute} resolvedAt={cues.siteRemoved}/>
    </>
  );
}


function Impact() {
  return (
    <>
      <Label>WHAT CUSTOMERS SAW</Label>
      <Reveal at={cues.lost}>
        <div style={{fontSize: 180, fontWeight: 850, color: red, lineHeight: .94, letterSpacing: -8}}>775</div>
        <div style={{fontSize: 62, fontWeight: 780}}>customers lost access</div>
      </Reveal>
      <Panel accent="#90505e">
        <Row at={cues.contact} label="Contact records" status="Some lost" tone={red}/>
        <Row at={cues.support} label="Support form" status="Site URL needed" tone={orange}/>
      </Panel>
    </>
  );
}

function Recovery() {
  const frame = useCurrentFrame();
  const repaired = frame >= cues.original;
  return (
    <>
      <Label>THE RECOVERY</Label>
      <div style={{fontSize: 91, fontWeight: 820, lineHeight: 1.04, letterSpacing: -4}}>Rebuild the site.</div>
      <Panel accent={repaired ? green : line}>
        <Label color={repaired ? green : muted}>SITE IDENTITY</Label>
        <div style={{fontSize: 68, fontWeight: 800, margin: "15px 0"}}>{repaired ? "Original site ID" : "Restoring records…"}</div>
        <Reveal at={cues.original}>
          <div style={{fontSize: 40, color: green}}>↓ &nbsp;Reconnect existing references</div>
        </Reveal>
      </Panel>
      <Reveal at={cues.fourteen}>
        <Panel><Label>LONGEST OUTAGES</Label><div style={{fontSize: 66, fontWeight: 820}}>Up to 14 days</div></Panel>
      </Reveal>
    </>
  );
}

function Lesson() {
  return (
    <>
      <Label>THE CHECK TO ADD</Label>
      <div style={{fontSize: 90, fontWeight: 820, lineHeight: 1.04, letterSpacing: -4}}>Preview the<br/>actual targets.</div>
      <Panel>
        <Label>ILLUSTRATIVE DRY RUN</Label>
        <Row at={starts[5]} label="Expected targets" status="Apps" tone={green}/>
        <Row at={cues.preview} label="Resolved targets" status="883 sites" tone={red}/>
        <Row at={cues.preview + 10} label="Apply changes" status="! Blocked" tone={orange}/>
      </Panel>
      <div style={{fontSize: 31, color: muted}}>Source · Atlassian April 2022 incident review</div>
    </>
  );
}

const scenes = [Intro, Intent, RevealScope, Impact, Recovery, Lesson];

export function Short() {
  const frame = useCurrentFrame();
  const second = frame / clock.fps;
  const index = starts.reduce((active, start, i) => frame >= start ? i : active, 0);
  const Scene = scenes[index];
  const caption = captions.find(({s,e}) => second >= s && second < e + 0.12);
  const opacity = interpolate(frame, [starts[index], starts[index] + 7], [.83, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});

  return (
    <AbsoluteFill style={{background: "radial-gradient(ellipse at 43% 37%, #1d3244, #0b121e 65%)", color: ink, fontFamily: sans}}>
      <Audio src={staticFile("narration/master.wav")}/>
      <AbsoluteFill style={{backgroundImage: "linear-gradient(#bdd4ee0b 1px, transparent 1px), linear-gradient(90deg, #bdd4ee0b 1px, transparent 1px)", backgroundSize: "64px 64px"}}/>
      <div style={{position: "absolute", top: 120, left: 88, right: 125, height: 12, display: "flex", gap: 8}}>
        {segments.map((id, i) => <div key={id} style={{flex: 1, borderRadius: 6, background: i === index ? orange : i < index ? "#8097a8" : "#314253"}}/>)}
      </div>
      <div style={{position: "absolute", top: 205, bottom: 445, left: 88, right: 125, display: "flex", flexDirection: "column", justifyContent: "center", gap: 32, opacity}}>
        <Scene/>
      </div>
      {caption && (
        <div style={{position: "absolute", left: 80, right: 140, bottom: 295, textAlign: "center"}}>
          <span style={{display: "inline-block", background: "#09111e", border: "1px solid #526982", borderRadius: 18, fontSize: 48, fontWeight: 720, padding: "14px 24px", lineHeight: 1.2}}>{caption.text}</span>
        </div>
      )}
    </AbsoluteFill>
  );
}
