import React, { useId } from "react";

export type CharacterProfile = "maya" | "arjun" | "sam";
export type CharacterExpression = "smile" | "skeptical" | "shock" | "thinking" | "neutral";
export type CharacterMouth = "closed" | "small" | "open" | "wide";
export type CharacterGesture = "rest" | "mug" | "point";

export interface IncidentCharacterProps {
  profile: CharacterProfile;
  expression: CharacterExpression;
  mouth: CharacterMouth;
  blink?: boolean;
  gesture?: CharacterGesture;
  mugLift?: number;
  style?: React.CSSProperties;
}

const profiles = {
  maya: {
    skin: ["#efaa83", "#c8785c", "#985345"],
    hair: ["#473049", "#201a34"],
    jacket: ["#8a76df", "#4b3c88"],
    seam: "#b4a5ff",
    outline: "#271c38",
    shirt: "#faf1dc",
  },
  arjun: {
    skin: ["#d89765", "#aa603e", "#784330"],
    hair: ["#292b44", "#171923"],
    jacket: ["#438f7d", "#225c5f"],
    seam: "#7dc1a7",
    outline: "#172b38",
    shirt: "#f1e0b9",
  },
  sam: {
    skin: ["#ddad92", "#af715e", "#824b3f"],
    hair: ["#785446", "#3f2829"],
    jacket: ["#b76843", "#753d33"],
    seam: "#e89a70",
    outline: "#302227",
    shirt: "#f1d7b9",
  },
};

const browPaths: Record<CharacterExpression, [string, string]> = {
  smile: ["M181 173q17-11 39-4", "M263 169q20-7 39 3"],
  skeptical: ["M180 175q18-8 40-3", "M263 169q19-18 40-12"],
  shock: ["M180 164q19-17 42-6", "M260 157q25-11 44 6"],
  thinking: ["M182 171q19-6 37 2", "M263 168q21-11 39-8"],
  neutral: ["M181 173q19-9 40-3", "M261 170q22-8 42 2"],
};

const eyeShape: Record<CharacterExpression, { height: number; offsetX: number; offsetY: number }> = {
  smile: { height: 12, offsetX: 1, offsetY: 1 },
  skeptical: { height: 9, offsetX: 3, offsetY: 0 },
  shock: { height: 17, offsetX: 0, offsetY: 1 },
  thinking: { height: 11, offsetX: 5, offsetY: -2 },
  neutral: { height: 11, offsetX: 0, offsetY: 0 },
};

const closedMouthPaths: Record<CharacterExpression, string> = {
  smile: "M217 260q22 24 49-2",
  skeptical: "M221 261q20-2 40-10",
  shock: "M225 263q16-10 34 0",
  thinking: "M225 263q16-2 31-1",
  neutral: "M222 262q18 5 39 0",
};

const openMouthPaths: Record<Exclude<CharacterMouth, "closed">, string> = {
  small: "M224 257Q241 249 258 256Q252 273 240 273Q228 271 224 257Z",
  open: "M220 255Q239 246 261 254Q267 276 242 281Q220 279 220 255Z",
  wide: "M210 255Q240 245 270 254Q265 277 240 279Q219 276 210 255Z",
};

function Eyes({ expression, blink, ink }: {
  expression: CharacterExpression;
  blink: boolean;
  ink: string;
}) {
  const { height, offsetX, offsetY } = eyeShape[expression];
  return (
    <g>
      {browPaths[expression].map((path) => (
        <path key={path} d={path} fill="none" stroke={ink} strokeWidth="7" strokeLinecap="round" />
      ))}
      {[203, 281].map((x) => (
        <g key={x}>
          {blink ? (
            <path
              d={expression === "smile" ? "M-19 2q19-13 38 0" : "M-19-1q19 10 38 0"}
              transform={"translate(" + x + " 194)"}
              fill="none"
              stroke={ink}
              strokeWidth="4"
              strokeLinecap="round"
            />
          ) : (
            <>
              <ellipse cx={x} cy={193} rx="21" ry={height} fill="#fff5de" stroke={ink} strokeWidth="2.5" />
              <ellipse cx={x + offsetX} cy={193 + offsetY} rx="8.5" ry="10" fill="#413044" />
              <ellipse cx={x + offsetX} cy={193 + offsetY} rx="4.5" ry="6" fill={ink} />
              <circle cx={x + offsetX + 3.2} cy={189 + offsetY} r="2.4" fill="#fff5de" />
              <path
                d="M-22 2Q-11-10 5-10Q15-9 22-1"
                transform={"translate(" + x + " " + (193 - (height - 10) * 0.65) + ")"}
                fill="none"
                stroke={ink}
                strokeWidth="2.8"
                strokeLinecap="round"
                opacity=".78"
              />
            </>
          )}
        </g>
      ))}
    </g>
  );
}

function Mouth({ expression, mouth, ink }: {
  expression: CharacterExpression;
  mouth: CharacterMouth;
  ink: string;
}) {
  return (
    <g>
      {mouth === "closed" ? (
        <>
          <path d={closedMouthPaths[expression]} fill="none" stroke={ink} strokeWidth="4.5" strokeLinecap="round" />
          <path d="M229 271q10 5 22 0" fill="none" stroke="#8a4752" strokeWidth="2.6" strokeLinecap="round" opacity=".7" />
        </>
      ) : (
        <>
          <path d={openMouthPaths[mouth]} fill="#4b2137" stroke={ink} strokeWidth="3.5" strokeLinejoin="round" />
          {mouth !== "small" && (
            <path
              d={mouth === "wide" ? "M216 255Q241 249 264 255L259 260Q240 264 221 260Z" : "M223 254Q241 248 258 254L256 260Q241 263 225 260Z"}
              fill="#fff2d9"
            />
          )}
          <path
            d={mouth === "small" ? "M232 269Q240 262 251 268Q241 272 232 269Z" : "M228 274Q241 264 256 273Q241 279 228 274Z"}
            fill="#d86d79"
          />
        </>
      )}
    </g>
  );
}

function Hair({ profile, fill, ink }: { profile: CharacterProfile; fill: string; ink: string }) {
  if (profile === "sam") {
    return (
      <g>
        <path d="M148 207q-14-28-12-53q-18-44 7-67q27-27 67-17q29-33 82-22q54 11 57 57q12 29-16 95l-14-31q3-31-14-48q-35 24-90 17q-22-3-41-15q-15 18-17 70Z" fill={fill} stroke={ink} strokeWidth="5" strokeLinejoin="round" />
        <path d="M152 105q29-21 65-12q42 9 88-18m-138 41q25-11 52-4q46 9 80-11" fill="none" stroke="#b18473" strokeWidth="3" strokeLinecap="round" opacity=".74" />
      </g>
    );
  }
  return profile === "maya" ? (
    <g>
      <path d="M144 214Q126 174 139 121Q142 91 165 70Q192 43 231 55Q268 36 305 62Q351 82 352 127Q356 175 332 222L317 199Q325 150 302 126Q278 148 247 150Q215 150 198 165Q183 154 187 134Q160 155 160 192L157 217Z" fill={fill} stroke={ink} strokeWidth="5" strokeLinejoin="round" />
      <path d="M146 154q2-49 35-75q26-21 58-12m-61 55q19-34 62-42q35-8 65 12m-92 48q33-20 68-21q29-1 39-21m-84 37q20-9 35-10m41-11q24 24 19 55" fill="none" stroke="#816482" strokeWidth="3" strokeLinecap="round" opacity=".65" />
      <path d="M148 175q1 31 11 44m162-71q10 18 6 43" fill="none" stroke="#a1819c" strokeWidth="2.5" strokeLinecap="round" opacity=".55" />
      <path d="M311 71q14-30 43-29q22 2 26 19q4 16-14 30q-13 11-34 8Z" fill={fill} stroke={ink} strokeWidth="4" />
      <path d="M332 67q14-17 29-12m-24 20q12-5 19-1" fill="none" stroke="#816482" strokeWidth="3" strokeLinecap="round" />
    </g>
  ) : (
    <g>
      <path d="M145 206Q127 181 132 145Q120 120 141 102Q140 80 163 75Q171 55 198 59Q217 43 243 54Q260 47 274 59Q301 49 318 72Q346 75 348 104Q363 124 348 152Q350 177 331 204L323 177Q324 142 310 124Q296 113 273 121Q242 130 215 117Q188 104 170 131Q160 154 160 184L158 207Z" fill={fill} stroke={ink} strokeWidth="5" strokeLinejoin="round" />
      <path d="M149 126q2-14 22-22m-5-20q15-12 37-2m-9-14q19-12 37 1m-17 28q18-20 42-10m-15 17q34 1 49-20m-21-15q15-6 29 7m5 26q20-4 29 14m-2 9q14 15 8 33" fill="none" stroke="#6b657d" strokeWidth="3" strokeLinecap="round" opacity=".72" />
    </g>
  );
}

function HandGesture({ gesture, mugLift, skin, jacket, seam, ink }: {
  gesture: CharacterGesture;
  mugLift: number;
  skin: string;
  jacket: string;
  seam: string;
  ink: string;
}) {
  if (gesture === "rest") {
    return <path d="M331 419q12 34 9 75M140 421q-16 28-17 70" fill="none" stroke={ink} strokeWidth="4" strokeLinecap="round" opacity=".65" />;
  }
  if (gesture === "mug") {
    return (
      <g transform={`translate(0 ${(1 - mugLift) * 54}) rotate(${(mugLift - 1) * 12} 400 498)`}>
        <path d="M389 498q-20-45-12-68l13-37q11-20 33-10q17 8 14 31l-4 84Z" fill={jacket} stroke={ink} strokeWidth="5" strokeLinejoin="round" />
        <path d="M388 425q21 3 42 13m-40-5q18 3 38 13" fill="none" stroke={seam} strokeWidth="2.5" opacity=".85" />
        <path d="M409 410q-15-5-20-15l-1-18q2-12 15-14q17-2 28 11q8 10 2 24l-7 17Z" fill={skin} stroke={ink} strokeWidth="4" />
        <path d="M399 355q23-13 35 4q8 10-3 26q-9 12-27 7" fill="none" stroke={ink} strokeWidth="13" />
        <path d="M399 355q23-13 35 4q8 10-3 26q-9 12-27 7" fill="none" stroke="#b0ded1" strokeWidth="7" />
        <path d="M334 343l8 53q2 17 29 17q28 0 30-17l6-53Z" fill="#b0ded1" stroke={ink} strokeWidth="4" strokeLinejoin="round" />
        <ellipse cx="370.5" cy="343" rx="36.5" ry="10" fill="#e8f8e9" stroke={ink} strokeWidth="4" />
        <ellipse cx="370.5" cy="345" rx="27" ry="5" fill="#825341" />
        <path d="M346 379q22 8 45 0" fill="none" stroke="#5a9d95" strokeWidth="3" />
        <path d="M407 375q17-1 21 8q2 7-5 11l-10 3m-7-11l13-1" fill={skin} stroke={ink} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    );
  }
  return (
    <g>
      <path d="M374 498q12-49 18-81l9-36q7-17 25-13q20 4 18 24l-5 106Z" fill={jacket} stroke={ink} strokeWidth="5" strokeLinejoin="round" />
      <path d="M394 406q22 3 42 9m-43-1q21 3 42 9" fill="none" stroke={seam} strokeWidth="2.5" opacity=".85" />
      <path d="M403 381q-14-10-19-21l-10-19q-3-7 4-11q6-3 12 5l8 9l-3-71q0-9 9-10q9 0 10 9l3 42q7-9 15-4q4 2 5 7q10-2 14 5q4 9-1 23l-9 28q-4 11-13 15Z" fill={skin} stroke={ink} strokeWidth="4" strokeLinejoin="round" />
      <path d="M416 316l2 24m18-21l-2 22m-38 4q11 0 14 11" fill="none" stroke={ink} strokeWidth="2.8" strokeLinecap="round" opacity=".7" />
      <path d="M396 270q9-5 16-2" fill="none" stroke="#fff2d9" strokeWidth="2.5" strokeLinecap="round" opacity=".75" />
    </g>
  );
}

/** Original, transparent portrait rig for spoken lines and reaction holds. */
export function IncidentCharacter({
  profile,
  expression,
  mouth,
  blink = false,
  gesture = "rest",
  mugLift = 1,
  style,
}: IncidentCharacterProps) {
  const reactId = useId().replace(/[^a-z0-9_-]/gi, "");
  const prefix = "incident-actor-" + reactId;
  const colors = profiles[profile];
  const skin = "url(#" + prefix + "-skin)";
  const hair = "url(#" + prefix + "-hair)";
  const jacket = "url(#" + prefix + "-jacket)";
  const ink = colors.outline;

  return (
    <svg
      viewBox="0 0 480 500"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
      style={style}
    >
      <defs>
        <linearGradient id={prefix + "-skin"} x1="0%" y1="0%" x2="86%" y2="100%">
          <stop stopColor={colors.skin[0]} />
          <stop offset=".72" stopColor={colors.skin[1]} />
          <stop offset="1" stopColor={colors.skin[2]} />
        </linearGradient>
        <linearGradient id={prefix + "-hair"} x1="0%" y1="5%" x2="76%" y2="100%">
          <stop stopColor={colors.hair[0]} />
          <stop offset="1" stopColor={colors.hair[1]} />
        </linearGradient>
        <linearGradient id={prefix + "-jacket"} x1="12%" y1="0%" x2="77%" y2="100%">
          <stop stopColor={colors.jacket[0]} />
          <stop offset="1" stopColor={colors.jacket[1]} />
        </linearGradient>
        <radialGradient id={prefix + "-cheek"}>
          <stop stopColor="#fc8e8c" stopOpacity=".54" />
          <stop offset="1" stopColor="#fc8e8c" stopOpacity="0" />
        </radialGradient>
      </defs>
      {profile === "maya" && <path d="M157 132q-40 48-28 112q7 45-14 77q29-2 46-28q25-37 20-114Z" fill={hair} stroke={ink} strokeWidth="5" />}
      <path d="M56 499q0-68 31-111q20-29 81-47l38-14h71l39 13q64 19 84 47q28 42 30 112Z" fill={jacket} stroke={ink} strokeWidth="5" strokeLinejoin="round" />
      <path d="M200 326q-27 20-62 28q31 46 56 145h103q12-78 45-140q-34-13-67-32Z" fill={colors.shirt} stroke={ink} strokeWidth="4.5" strokeLinejoin="round" />
      <path d="M206 286l-6 54q15 27 40 27q28-1 42-28l-8-59Z" fill={skin} stroke={ink} strokeWidth="4.5" strokeLinejoin="round" />
      <path d="M206 292q33 28 68 1l4 19q-26 28-61 10l-13-11Z" fill={colors.skin[2]} opacity=".66" />
      {profile === "maya" ? (
        <g>
          <path d="M169 344l-45 23l36 39l-17 17l43 77h38l-32-120Z" fill="#6150a2" stroke={ink} strokeWidth="4" strokeLinejoin="round" />
          <path d="M312 340l43 25l-33 42l17 19l-43 74h-37l27-117Z" fill="#6756b2" stroke={ink} strokeWidth="4" strokeLinejoin="round" />
          <path d="M151 381l33 26m146-29l-30 29m-60-30v46" fill="none" stroke={colors.seam} strokeWidth="3" strokeLinecap="round" opacity=".65" />
          <path d="M218 367q25 28 47 0" fill="none" stroke="#98708a" strokeWidth="2.7" opacity=".68" />
          <circle cx="244" cy="399" r="7" fill="#df9b60" stroke={ink} strokeWidth="2" />
        </g>
      ) : (
        <g>
          <path d="M173 344q7 32 40 52l-27 28l-47-58Zm138 0q-6 32-39 52l25 28l47-58Z" fill={profile === "sam" ? colors.jacket[0] : "#4c9f89"} stroke={ink} strokeWidth="4" strokeLinejoin="round" />
          <path d="M234 398v102m17-100v100M87 412q18 7 26 32m270-31q-17 8-24 30" fill="none" stroke={colors.seam} strokeWidth="3" strokeLinecap="round" opacity=".82" />
          <path d="M127 449h52l-6 39h-40Z" fill={profile === "sam" ? colors.jacket[1] : "#276c69"} stroke={ink} strokeWidth="3" strokeLinejoin="round" />
          <path d="M134 454h38" fill="none" stroke={colors.seam} strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
      <path d="M159 193q-19-10-26 7q-8 18 9 33q9 10 21 5m159-45q19-10 27 7q8 18-9 33q-8 10-21 5" fill={skin} stroke={ink} strokeWidth="4.5" strokeLinecap="round" />
      <path d="M145 207q9-4 13 9m181-9q-9-4-14 9" fill="none" stroke={colors.skin[2]} strokeWidth="3" strokeLinecap="round" />
      <path d={profile === "maya" ? "M155 172q-4-81 86-84q88 2 86 84l-5 53q-7 47-34 72q-25 22-46 22q-21 0-47-23q-28-25-35-71Z" : "M153 172q-5-84 88-88q88 4 88 88l-4 61q-4 38-34 62q-22 20-49 20q-25 0-50-20q-29-24-34-62Z"} fill={skin} stroke={ink} strokeWidth="5" strokeLinejoin="round" />
      <path d="M186 233q-8-10-10-23m126 23q8-10 10-23" fill="none" stroke={colors.skin[0]} strokeWidth="3" strokeLinecap="round" opacity=".7" />
      <ellipse cx="186" cy="228" rx="25" ry="16" fill={"url(#" + prefix + "-cheek)"} />
      <ellipse cx="296" cy="228" rx="25" ry="16" fill={"url(#" + prefix + "-cheek)"} />
      <Hair profile={profile} fill={hair} ink={ink} />
      {profile === "sam" && <path d="M150 192q-13 10-10 38q4 23 34 30l25 2" fill="none" stroke={ink} strokeWidth="7" strokeLinecap="round" />}
      {profile === "maya" && (
        <g fill="none" stroke="#ffc879" strokeWidth="4">
          <path d="M147 228q-12 5-9 17q2 8 9 6q8-2 7-16m179-7q11 4 8 15q-2 8-9 7q-7-2-6-14" />
          <path d="M161 105q14-27 49-33" stroke="#e2a9a1" strokeWidth="2.2" opacity=".66" strokeLinecap="round" />
        </g>
      )}
      <Eyes expression={expression} blink={blink} ink={ink} />
      <path d="M241 192q-2 16-10 36q1 8 13 8q7 0 13-5" fill="none" stroke={colors.skin[2]} strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M238 223q1-4 3-7" fill="none" stroke={colors.skin[0]} strokeWidth="3" strokeLinecap="round" />
      {profile === "arjun" && (
        <g fill="none" stroke={ink} strokeLinecap="round" strokeLinejoin="round">
          <path d="M175 180l-18-4m153 4l17-4m-100 10q14-9 28 0" strokeWidth="4.8" />
          <rect x="173" y="175" width="57" height="36" rx="13" strokeWidth="4.3" />
          <rect x="254" y="175" width="57" height="36" rx="13" strokeWidth="4.3" />
          <path d="M177 190q5-7 13-10m68 10q5-7 13-10" stroke="#f9ede0" strokeWidth="2.2" opacity=".8" />
          <path d="M187 265q10 28 32 36m77-36q-10 28-32 36" strokeWidth="2.7" strokeDasharray="1 6" opacity=".59" />
        </g>
      )}
      <Mouth expression={expression} mouth={mouth} ink={ink} />
      <path d="M222 289q19 12 38 0" fill="none" stroke={colors.skin[0]} strokeWidth="3" strokeLinecap="round" opacity=".68" />
      <HandGesture gesture={gesture} mugLift={mugLift} skin={skin} jacket={jacket} seam={colors.seam} ink={ink} />
    </svg>
  );
}
