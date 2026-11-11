import React from "react";
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig} from "remotion";
import {IncidentCharacter, type CharacterMouth} from "../../../../studio/src/incident/Character";
import {move, openingMono, openingSans, RunConsole, SupportQueue, UnavailableSite} from "./OpeningScreens";
import timing from "./data/longform-opening.json";

export const openingClock = {fps: timing.fps, totalFrames: timing.frames};
const [site, run, , ticket, sam, , arjun, , impact, customers, days, completed, question] = timing.cues;
const reactionStart = ticket.start + Math.round((ticket.end - ticket.start) * .72);
const titleStart = question.end + Math.round(timing.fps * .27);
const cream = "#f1efe8";
const navy = "#111925";

function Room({reverse}: {reverse: boolean}) {
  return <AbsoluteFill style={{background: reverse ? "radial-gradient(ellipse at 69% 38%, #74594b, #342c32 49%, #141925 86%)" : "radial-gradient(ellipse at 31% 43%, #2d5660, #22343e 47%, #111823 87%)"}}>
    <svg viewBox="0 0 1920 1080" style={{position: "absolute", width: "100%", height: "100%", transform: reverse ? "scaleX(-1)" : undefined}} aria-hidden="true">
      <defs>
        <linearGradient id="opening-window" x1="0" y1="0" x2=".3" y2="1"><stop stopColor="#45677c"/><stop offset="1" stopColor="#142737"/></linearGradient>
        <linearGradient id="opening-desk" x1="0" y1="0" x2="0" y2="1"><stop stopColor={reverse ? "#604c43" : "#3e484b"}/><stop offset="1" stopColor="#23232a"/></linearGradient>
        <pattern id="opening-grain" width="19" height="21" patternUnits="userSpaceOnUse"><circle cx="3" cy="2" r="1" fill="#f4dbc1" opacity=".10"/><circle cx="14" cy="17" r=".8" fill="#dce2ff" opacity=".08"/></pattern>
      </defs>
      <path d="M0 127h1920M0 711h1920" stroke="#121e28" strokeWidth="5" opacity=".55"/>
      <path d="M90 773V252h650v521" stroke="#131e29" strokeWidth="12" opacity=".65"/>
      <rect x="101" y="150" width="606" height="428" rx="12" fill="url(#opening-window)" stroke="#182634" strokeWidth="12"/>
      <path d="M112 560v-85h91v-63h40v55h49v-122h68v112h80v-56h51v66h33v-129h56v119h53v-70h65v173Z" fill="#152737" opacity=".82"/>
      <path d="M407 157v412M110 368h591" stroke="#162635" strokeWidth="12"/>
      <path d="M131 181h148m-148 20h84m259-20h117" stroke="#acd3e1" strokeWidth="3" opacity=".15"/>
      <path d="M1149 212h590m-590 233h590" stroke="#171b26" strokeWidth="14" opacity=".65"/>
      <path d="M1211 205v-74h22v74m7 0v-97h29v97m8 0v-60h41v60m215 229v-125h107v125" fill={reverse ? "#55404a" : "#28394a"} stroke="#222832" strokeWidth="5"/>
      <path d="M1382 848v-193l55-105h109l49 105m-310 185h191" fill="none" stroke="#191e29" strokeWidth="12"/>
      <path d="M1406 548h116l75 113h-256z" fill="#c7a876" stroke="#30323b" strokeWidth="7"/>
      <path d="M1341 661h256l155 213h-549z" fill="#ecc68b" opacity={reverse ? ".12" : ".06"}/>
      <path d="M0 847l1920 9v224H0Z" fill="url(#opening-desk)" stroke="#161a24" strokeWidth="8"/>
      <path d="M0 933l1920 9M0 996l1920-2" stroke="#d2af89" strokeWidth="2" opacity=".13"/>
      <rect width="1920" height="1080" fill="url(#opening-grain)"/>
    </svg>
  </AbsoluteFill>;
}

function DeskShot({actor, mode, offset}: {actor: "arjun" | "sam"; mode: "reaction" | "speaking" | "question"; offset: number}) {
  const frame = useCurrentFrame();
  const absolute = frame + offset;
  const reverse = actor === "sam";
  const speaking = mode === "speaking" && timing.cues.some(cue => cue.speaker === actor && cue.start <= absolute && absolute < cue.end);
  const energy = timing.mouth[absolute] ?? 0;
  let mouth: CharacterMouth = "closed";
  if (speaking && energy > .021) mouth = energy > .15 ? "wide" : energy > .073 ? "open" : "small";
  const expression = mode === "reaction" && frame > 10 ? "shock" : reverse && frame < 32 ? "skeptical" : "thinking";
  const scale = mode === "question" ? move(frame, 0, 140, 1.075, 1.127) : move(frame, 0, 140, 1, 1.044);
  const blink = mode !== "reaction" && (frame + (reverse ? 42 : 0)) % 106 >= 101;
  const lift = mode === "reaction" ? move(frame, 0, 9, .22, .55) : mode === "question" ? .26 : move(frame, 0, 40, .55, .24);

  return <AbsoluteFill style={{background: navy, overflow: "hidden", fontFamily: openingSans, color: cream}}>
    <AbsoluteFill style={{scale: String(scale), transformOrigin: reverse ? "58% 44%" : "39% 48%"}}>
      <Room reverse={reverse}/>
      <div style={{position: "absolute", top: 42, left: reverse ? 653 : 301, width: 973, height: 1021, transform: reverse ? "scaleX(-1)" : undefined}}>
        <IncidentCharacter profile={actor} expression={expression} mouth={mouth} blink={blink} gesture={reverse ? "rest" : "mug"} mugLift={lift}/>
      </div>
      <svg viewBox="0 0 1920 1080" style={{position: "absolute", width: "100%", height: "100%", transform: reverse ? "scaleX(-1)" : undefined}} aria-hidden="true">
        <path d="M0 941l1920 10v129H0Z" fill={reverse ? "#382c2d" : "#292c34"} stroke="#171b26" strokeWidth="9"/>
        <path d="M1076 911l60-350l536 38l-55 336Z" fill="#151e2a" stroke="#708496" strokeWidth="9"/>
        <path d="M1108 902l48-305l488 34l-46 283Z" fill="#253441" stroke="#111b26" strokeWidth="4"/>
        <path d="M1190 912l427 23l-149 43l-433-30Z" fill="#384b56" stroke="#101721" strokeWidth="7"/>
        <path d="M1471 978l146-43v14l-146 44l-436-31v-14Z" fill="#202e3c" stroke="#101721" strokeWidth="4"/>
        <path d="M1360 756l48 4l-7 42l-48-4Z" fill="#697d89" opacity=".65"/>
        {reverse && <g><path d="M340 970l54-135l45 4l-31 129Z" fill="#202631" stroke="#141924" strokeWidth="7"/><rect x="341" y="811" width="83" height="137" rx="10" fill="#141b27" stroke="#727b88" strokeWidth="5"/><rect x="350" y="824" width="65" height="107" rx="5" fill="#3c515d"/></g>}
      </svg>
      <AbsoluteFill style={{background: "radial-gradient(ellipse at 49% 47%, transparent 48%, #070b14aa 100%)"}}/>
    </AbsoluteFill>
    <div style={{position: "absolute", top: 75, left: 105, font: `20px ${openingMono}`, letterSpacing: 1, color: "#e0d8cd", background: "#111621d9", padding: "10px 13px", borderRadius: 6}}>DRAMATIZED SCENE</div>
    <div style={{position: "absolute", bottom: 169, left: reverse ? undefined : 109, right: reverse ? 109 : undefined, padding: "15px 21px 17px", borderLeft: `5px solid ${reverse ? "#ebaa75" : "#75d0b0"}`, borderRadius: 8, background: "#101925ee", boxShadow: "0 8px 30px #06091055"}}>
      <div style={{fontSize: 43, fontWeight: 710, lineHeight: 1.07}}>{reverse ? "Sam" : "Arjun"}</div>
      <div style={{fontSize: 24, color: "#c2c9d2", marginTop: 6}}>{reverse ? "Customer account lead" : "Software engineer"}</div>
    </div>
  </AbsoluteFill>;
}

function ImpactScene() {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const step = frame >= days.start - impact.start ? 2 : frame >= customers.start - impact.start ? 1 : 0;
  const content = [
    {number: "883", label: "cloud sites deleted", sub: "By 08:01 UTC", color: "#ff9d8e", start: 0},
    {number: "775", label: "customers affected", sub: "Across the affected sites", color: "#eed2b5", start: customers.start - impact.start},
    {number: "14", label: "days to get back in", sub: "Up to 14 days for some customers", color: "#aad8ce", start: days.start - impact.start},
  ][step];
  return <AbsoluteFill style={{background: "radial-gradient(ellipse at 77% 44%, #2d3c4a, #111923 72%)", color: cream, fontFamily: openingSans}}>
    <div style={{position: "absolute", inset: "104px 146px 176px", borderTop: "2px solid #4b5867"}}>
      <div style={{paddingTop: 22, color: "#b6c2cf", font: `25px ${openingMono}`}}>ATLASSIAN CLOUD <span style={{color: "#e4a18e", marginLeft: 32}}>APRIL 2022</span></div>
      <div key={content.number} style={{marginTop: 72, translate: `0 ${move(frame, content.start, content.start + Math.round(fps * .43), 21, 0)}px`, opacity: move(frame, content.start, content.start + Math.round(fps * .33), .28, 1)}}>
        <div style={{fontSize: 250, fontWeight: 780, color: content.color, letterSpacing: -14, lineHeight: .98}}>{content.number}</div>
        <div style={{fontSize: 66, fontWeight: 660, letterSpacing: -2}}>{content.label}</div>
        <div style={{fontSize: 31, color: "#c4cbd4", marginTop: 16}}>{content.sub}</div>
      </div>
      <svg viewBox="0 0 444 480" width="444" height="480" style={{position: "absolute", right: 46, top: 129}} aria-hidden="true">
        {Array.from({length: 16}, (_, index) => {
          const x = (index % 4) * 110 + 6;
          const y = Math.floor(index / 4) * 112 + 12;
          const elapsed = frame - content.start;
          const fade = move(elapsed, index * 2, index * 2 + 12, .15, .88);
          return <g key={index} opacity={fade} transform={`translate(${x} ${y})`} fill="none" stroke={content.color} strokeWidth="3">
            <rect width="86" height="80" rx="12" fill={step === 0 ? "#392d38" : "#25353d"}/>
            {step === 0 && <path d="M0 20h86m-56 15 25 25m0-25L30 60"/>}
            {step === 1 && <><circle cx="43" cy="32" r="11"/><path d="M22 62c1-20 41-20 42 0"/></>}
            {step === 2 && <path d="M23 19v12m39-12v12M17 36h52M19 58h7m9 0h7m9 0h7M17 27h52v42H17z"/>}
          </g>;
        })}
      </svg>
      <div style={{position: "absolute", bottom: 32, font: `21px ${openingMono}`, color: "#b7c3d1"}}>SOURCE · ATLASSIAN POST-INCIDENT REVIEW</div>
    </div>
  </AbsoluteFill>;
}

function TitleCard() {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{background: "radial-gradient(ellipse at 82% 37%, #293f4d, #121a25 65%)", color: cream, fontFamily: openingSans}}>
    <div style={{position: "absolute", left: 139, top: 252, width: 1380, translate: `0 ${move(frame, 0, 16, 15, 0)}px`}}>
      <div style={{font: `26px ${openingMono}`, letterSpacing: 3, color: "#9bb9c7", marginBottom: 33}}>ATLASSIAN CLOUD · APRIL 2022</div>
      <div style={{fontWeight: 760, fontSize: 116, letterSpacing: -7, lineHeight: 1.03}}>The cleanup script<br/>that deleted <span style={{color: "#ff9c8a"}}>883 sites</span></div>
      <div style={{height: 5, width: move(frame, 0, 25, 0, 184), background: "#8ed6bd", marginTop: 43}}/>
    </div>
    <svg width="480" height="485" viewBox="0 0 480 485" style={{position: "absolute", right: 79, top: 263, opacity: .63}} aria-hidden="true" fill="none" stroke="#91b7c2" strokeWidth="5">
      <rect x="49" y="97" width="381" height="282" rx="30" fill="#253642"/><path d="M49 154h381M79 126h12m18 0h12m18 0h12"/>
      <path d="M103 201h164m-164 35h113m-113 35h149m-149 35h72" stroke="#6f8c9e"/>
      <rect x="304" y="229" width="76" height="76" rx="17" fill="#4d343c" stroke="#f1a193"/><path d="m325 250 33 33m0-33-33 33" stroke="#f1a193" strokeLinecap="round"/>
    </svg>
  </AbsoluteFill>;
}

export function LongformOpening({captions}: {captions: boolean}) {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const current = timing.cues.find(cue => cue.start <= frame && frame < cue.end);
  return <AbsoluteFill style={{background: navy}}>
    <Audio src={staticFile("narration/e02-longform-opening.wav")}/>
    <Sequence name="Customer site" from={site.start} durationInFrames={run.start - site.start}><UnavailableSite/></Sequence>
    <Sequence name="Cleanup running" from={run.start} durationInFrames={ticket.start - run.start} premountFor={fps}><RunConsole/></Sequence>
    <Sequence name="First support ticket" from={ticket.start} durationInFrames={reactionStart - ticket.start} premountFor={fps}><SupportQueue/></Sequence>
    <Sequence name="New-ticket sound" from={ticket.start} durationInFrames={Math.round(fps * .43)}><Audio src={staticFile("narration/e02-opening-ticket.wav")} volume={.7}/></Sequence>
    <Sequence name="Arjun freezes" from={reactionStart} durationInFrames={sam.start - reactionStart} premountFor={fps}><DeskShot actor="arjun" mode="reaction" offset={reactionStart}/></Sequence>
    <Sequence name="Sam asks" from={sam.start} durationInFrames={arjun.start - sam.start} premountFor={fps}><DeskShot actor="sam" mode="speaking" offset={sam.start}/></Sequence>
    <Sequence name="Arjun replies" from={arjun.start} durationInFrames={impact.start - arjun.start} premountFor={fps}><DeskShot actor="arjun" mode="speaking" offset={arjun.start}/></Sequence>
    <Sequence name="Impact" from={impact.start} durationInFrames={completed.start - impact.start} premountFor={fps}><ImpactScene/></Sequence>
    <Sequence name="First batch" from={completed.start} durationInFrames={question.start - completed.start} premountFor={fps}><RunConsole completed/></Sequence>
    <Sequence name="What changed?" from={question.start} durationInFrames={titleStart - question.start} premountFor={fps}><DeskShot actor="arjun" mode="question" offset={question.start}/></Sequence>
    <Sequence name="Episode title" from={titleStart} durationInFrames={timing.frames - titleStart} premountFor={fps}><TitleCard/></Sequence>
    {captions && current && <div style={{position: "absolute", bottom: 29, left: 205, right: 205, textAlign: "center", pointerEvents: "none", color: "#fbfbf9", font: `600 35px/1.26 ${openingSans}`}}>
      <span style={{background: "#080d16e8", borderRadius: 9, padding: "8px 15px", boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone"}}>{current.text}</span>
    </div>}
  </AbsoluteFill>;
}
