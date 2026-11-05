import { useVideoConfig } from "remotion";

/** Output formats a brief can ask for. One composition, rendered once per format. */
export type Format = {
  id: string;
  w: number;
  h: number;
  /** "srt" = sidecar file for long-form; "burned" = on-screen captions for vertical/square. */
  captions: "srt" | "burned" | "none";
};

export const FORMATS: Record<"yt" | "reel" | "square", Format> = {
  yt: { id: "yt", w: 1920, h: 1080, captions: "srt" },
  reel: { id: "reel", w: 1080, h: 1920, captions: "burned" },
  square: { id: "square", w: 1080, h: 1080, captions: "burned" },
};

export type Orientation = "landscape" | "portrait" | "square";

export type Layout = {
  w: number;
  h: number;
  orientation: Orientation;
  /** Safe-area padding (px) so text clears platform UI: tighter on landscape, roomier on portrait. */
  safe: { top: number; right: number; bottom: number; left: number };
  /** Scale factor relative to the 1080-wide reel the kit was designed on. */
  scale: number;
  isPortrait: boolean;
  isLandscape: boolean;
};

export const layoutFor = (w: number, h: number): Layout => {
  const orientation: Orientation = w === h ? "square" : w > h ? "landscape" : "portrait";
  const safe =
    orientation === "portrait"
      ? { top: 220, right: 60, bottom: 300, left: 60 }
      : orientation === "square"
        ? { top: 90, right: 70, bottom: 150, left: 70 }
        : { top: 80, right: 120, bottom: 110, left: 120 };
  return {
    w,
    h,
    orientation,
    safe,
    scale: Math.min(w, h) / 1080,
    isPortrait: orientation === "portrait",
    isLandscape: orientation === "landscape",
  };
};

/** Read the current composition's size and derive the layout. Use inside any component. */
export const useLayout = (): Layout => {
  const { width, height } = useVideoConfig();
  return layoutFor(width, height);
};

/** Composition ids for one project: `${base}-${format.id}`. */
export const compId = (base: string, format: Format) => `${base}-${format.id}`;
