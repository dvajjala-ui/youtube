import React, {type ReactNode} from "react";
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from "remotion";

export const openingSans = "'Segoe UI', Arial, sans-serif";
export const openingMono = "'Cascadia Mono', Consolas, monospace";
const light = "#e7edf6";
const dim = "#9baac0";
const line = "#2a3547";
const coral = "#fa9385";
const teal = "#82d7b8";

export const move = (frame: number, from: number, to: number, low: number, high: number) =>
  interpolate(frame, [from, to], [low, high], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(.2, .7, .25, 1),
  });

function Icon({name, size = 32}: {name: "lock" | "alert" | "arrow" | "search" | "reload" | "queue"; size?: number}) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {name === "lock" && <><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>}
    {name === "alert" && <><path d="M10.4 3.7 2.7 18A1.7 1.7 0 0 0 4.2 20.5h15.6a1.7 1.7 0 0 0 1.5-2.5L13.6 3.7a1.8 1.8 0 0 0-3.2 0Z"/><path d="M12 9v4.7m0 3h.01"/></>}
    {name === "arrow" && <path d="M16 5l-7 7 7 7M9 12h12"/>}
    {name === "search" && <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>}
    {name === "reload" && <path d="M20 9a8 8 0 1 0 .2 5M20 4v5h-5"/>}
    {name === "queue" && <><rect x="4" y="5" width="16" height="14" rx="2"/><path d="M8 10h8m-8 4h8"/></>}
  </svg>;
}

function Browser({title, url, children}: {title: string; url: string; children: ReactNode}) {
  return <AbsoluteFill style={{background: "radial-gradient(ellipse at 52% 30%, #27384a, #0d141e 81%)", fontFamily: openingSans, color: light}}>
    <div style={{position: "absolute", inset: "77px 118px 166px", border: "1px solid #49566b", overflow: "hidden", borderRadius: 25, background: "#121923", boxShadow: "0 32px 110px #03080caa"}}>
      <div style={{display: "flex", alignItems: "center", gap: 26, height: 60, background: "#1d2634", padding: "0 25px"}}>
        <div style={{display: "flex", gap: 10}}>{["#e77e76", "#e9b971", "#79b99b"].map(color => <span key={color} style={{background: color, width: 14, height: 14, borderRadius: "50%"}}/>)}</div>
        <div style={{padding: "9px 27px", borderRadius: "11px 11px 0 0", background: "#293648", alignSelf: "flex-end", minWidth: 345, fontSize: 23}}>{title}</div>
      </div>
      <div style={{height: 69, display: "flex", gap: 22, alignItems: "center", padding: "0 22px", background: "#293648", color: "#bac7da", borderBottom: `1px solid ${line}`}}>
        <Icon name="arrow" size={26}/><span style={{rotate: "180deg", opacity: .43, display: "flex"}}><Icon name="arrow" size={26}/></span><Icon name="reload" size={26}/>
        <div style={{flex: 1, borderRadius: 25, background: "#151e2b", padding: "12px 19px", display: "flex", alignItems: "center", gap: 14, font: `23px ${openingMono}`}}><Icon name="lock" size={21}/>{url}</div>
        <span style={{fontSize: 27}}>⋮</span>
      </div>
      <div style={{position: "relative", height: "calc(100% - 130px)"}}>{children}</div>
    </div>
    <div style={{position: "absolute", bottom: 125, right: 125, color: "#a8b5c7", font: `19px ${openingMono}`}}>SCREEN RECONSTRUCTION</div>
  </AbsoluteFill>;
}

export function UnavailableSite() {
  const frame = useCurrentFrame();
  const trying = frame >= 112 && frame < 138;
  return <Browser title="Northstar · Atlassian Cloud" url="northstar-tools.atlassian.net">
    <AbsoluteFill style={{background: "#151e2b", alignItems: "center", justifyContent: "center"}}>
      <div style={{width: 1000, display: "flex", gap: 35, alignItems: "flex-start", translate: `0 ${move(frame, 0, 85, 9, 0)}px`}}>
        <div style={{color: coral, background: "#3e292f", borderRadius: 21, padding: 24, display: "flex"}}><Icon name="alert" size={65}/></div>
        <div>
          <div style={{color: dim, font: `24px ${openingMono}`, letterSpacing: 1}}>APR 05 2022 <span style={{color: coral, marginLeft: 18}}>07:46 UTC</span></div>
          <div style={{fontSize: 89, fontWeight: 740, lineHeight: 1.12, letterSpacing: -4, marginTop: 12}}>Site unavailable</div>
          <div style={{fontSize: 32, color: "#b7c5d8", marginTop: 18}}>This Atlassian cloud site could not be opened.</div>
          <div style={{position: "relative", display: "inline-flex", gap: 11, alignItems: "center", marginTop: 35, border: "1px solid #4d6686", borderRadius: 8, color: "#a5c9ff", padding: "10px 16px", fontSize: 24, background: frame >= 101 && frame < 139 ? "#28415c" : "transparent"}}>
            <span style={{display: "flex", rotate: trying ? `${(frame - 112) * 14}deg` : undefined}}><Icon name="reload" size={23}/></span>{trying ? "Retrying…" : "Try again"}
            {frame >= 77 && <svg width="32" height="41" viewBox="0 0 32 41" style={{position: "absolute", left: move(frame, 77, 104, 217, 114), top: move(frame, 77, 104, 111, 28), filter: "drop-shadow(0 2px 4px #02070d)"}} aria-hidden="true"><path d="M4 2v29l8-6l6 13l5-2l-6-13h12Z" fill="#fff" stroke="#132031" strokeWidth="2"/></svg>}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  </Browser>;
}

export function RunConsole({completed = false}: {completed?: boolean}) {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{background: "radial-gradient(ellipse at 50% 33%, #233d41, #0b121b 75%)", fontFamily: openingMono, color: light}}>
    <div style={{position: "absolute", inset: "133px 197px 183px", border: "1px solid #435267", borderRadius: 24, background: "#101721", overflow: "hidden", boxShadow: "0 26px 120px #0009", scale: `${move(frame, 0, 100, .985, 1.012)}`}}>
      <div style={{height: 74, padding: "0 27px", display: "flex", alignItems: "center", gap: 12, background: "#1f2937", color: dim, fontSize: 24}}>
        {["#e77e76", "#e9b971", "#79b99b"].map(color => <span key={color} style={{background: color, width: 14, height: 14, borderRadius: "50%"}}/>)}
        <span style={{marginLeft: 22}}>maintenance-run.log</span><span style={{marginLeft: "auto", fontSize: 19}}>RECONSTRUCTED LOG</span>
      </div>
      <div style={{padding: "73px 72px", fontSize: 36, lineHeight: 1.75}}>
        <div style={{color: dim, fontSize: 24, marginBottom: 23}}>{completed ? "FIRST PRODUCTION BATCH" : "APR 05 2022  ·  07:38 UTC"}</div>
        <div><span style={{color: teal}}>› </span>Legacy Insight cleanup</div>
        <div><span style={{color: dim}}>environment</span>  production</div>
        <div><span style={{color: dim}}>operation  </span>  remove standalone app</div>
        <div style={{marginTop: 13}}><span style={{color: completed ? teal : "#f1c780"}}>{completed ? "✓  COMPLETE" : "●  IN PROGRESS"}</span><span style={{color: dim}}>   {completed ? "30 sites checked" : "batch 02"}</span></div>
        <span style={{background: teal, display: "inline-block", width: 17, height: 33, opacity: frame % 30 < 18 ? .85 : 0}}/>
      </div>
    </div>
  </AbsoluteFill>;
}

export function SupportQueue() {
  const frame = useCurrentFrame();
  return <Browser title="Queues · Jira Service Management" url="support.atlassian.example / queues / open">
    <div style={{height: 68, borderBottom: `1px solid ${line}`, padding: "0 27px", display: "flex", alignItems: "center", gap: 14, fontSize: 25, fontWeight: 630}}>
      <span style={{background: "#2d6cb3", color: "#ecf6ff", display: "inline-flex", padding: 6, borderRadius: 7}}><Icon name="queue" size={27}/></span>Jira Service Management
      <div style={{marginLeft: "auto", display: "flex", gap: 10, alignItems: "center", border: `1px solid ${line}`, borderRadius: 8, color: dim, width: 365, padding: "7px 14px", fontWeight: 400}}><Icon name="search" size={21}/>Search</div>
    </div>
    <div style={{height: "calc(100% - 68px)", display: "grid", gridTemplateColumns: "250px 560px 1fr"}}>
      <aside style={{background: "#192231", padding: "33px 19px", borderRight: `1px solid ${line}`, fontSize: 24, color: "#bccbe0"}}>
        <strong style={{color: light, display: "block", padding: "0 14px 23px"}}>Cloud support</strong>
        <div style={{padding: "12px 14px", color: "#bedbff", background: "#233e61", borderRadius: 7, display: "flex", alignItems: "center", gap: 12}}><Icon name="queue" size={23}/>Queues</div>
        <div style={{padding: "18px 15px"}}>Customers</div><div style={{padding: "0 15px"}}>Reports</div>
      </aside>
      <div style={{borderRight: `1px solid ${line}`, paddingTop: 35}}>
        <div style={{fontSize: 36, fontWeight: 680, padding: "0 24px 23px"}}>Open requests</div>
        <div style={{padding: "20px 22px", borderLeft: "5px solid #6caaff", background: "#213750", translate: `0 ${move(frame, 0, 12, -13, 0)}px`, opacity: move(frame, 0, 9, .4, 1)}}>
          <div style={{fontSize: 20, color: "#a5c9ff"}}>HELP-1064 <span style={{color: coral, marginLeft: 20}}>NEW</span></div>
          <div style={{fontSize: 30, fontWeight: 670, marginTop: 6}}>Can't access our cloud site</div>
        </div>
        {[["HELP-1063", "Billing contact update"], ["HELP-1062", "Project permissions question"]].map(([id, name]) => <div key={id} style={{padding: "16px 26px", borderBottom: `1px solid ${line}`, color: dim, fontSize: 23}}><span style={{font: `17px ${openingMono}`}}>{id}</span><br/>{name}</div>)}
      </div>
      <div style={{padding: "42px 38px", opacity: move(frame, 4, 16, .35, 1)}}>
        <div style={{font: `22px ${openingMono}`, color: "#a5c9ff"}}>HELP-1064</div>
        <div style={{fontSize: 49, fontWeight: 720, lineHeight: 1.13, margin: "12px 0 22px"}}>Can't access our<br/>cloud site</div>
        <span style={{padding: "6px 12px", fontSize: 19, fontWeight: 700, borderRadius: 7, color: "#c8dfff", background: "#254264"}}>OPEN</span>
        <div style={{borderTop: `1px solid ${line}`, marginTop: 28, paddingTop: 22, fontSize: 24, color: dim}}>Received <b style={{color: light, marginLeft: 14}}>07:46 UTC</b></div>
        <div style={{fontSize: 22, color: dim, marginTop: 12}}>Customer portal</div>
      </div>
    </div>
  </Browser>;
}
