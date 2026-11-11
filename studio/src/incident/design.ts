export const incidentPalettes = {
  night: {
    background: "#08131f", wall: "#172c3c", desk: "#24333c", line: "#435b64", ink: "#f8eee0",
    muted: "#afc0c5", accent: "#ffbb78", good: "#96e7b4", bad: "#ff897f", panel: "#10212c",
  },
  paper: {
    background: "#e0c4a0", wall: "#f1dbc0", desk: "#95735d", line: "#9e8168", ink: "#2c2728",
    muted: "#5f4a45", accent: "#a85525", good: "#176442", bad: "#a12930", panel: "#fff1df",
  },
} as const;

export type IncidentPalette = (typeof incidentPalettes)[keyof typeof incidentPalettes];

export type IncidentControls = {
  paperStyle: boolean;
  swapCharacterDesigns: boolean;
  showReactionGag: boolean;
  showCaptions: boolean;
  soundEffects: boolean;
};
