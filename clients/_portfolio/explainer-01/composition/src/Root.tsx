import React from "react";
import { Composition } from "remotion";
import { ThemeProvider, themeFrom } from "@studio/kit";
import brand from "../../brand.json";
import { Main } from "./Main";
import { FPS, totalFrames } from "./lib/clock";

/** One theme per brand: brand.json fills the kit theme, everything else falls back to the default. */
export const theme = themeFrom(brand);

export const Root: React.FC = () => (
  <ThemeProvider theme={theme}>
    <Composition
      id="Main"
      component={Main}
      durationInFrames={totalFrames}
      fps={FPS}
      width={1920}
      height={1080}
    />
  </ThemeProvider>
);
