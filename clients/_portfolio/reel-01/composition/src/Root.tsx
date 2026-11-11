import React from "react";
import { Composition } from "remotion";
import { ThemeProvider, themeFrom } from "@studio/kit";
import brand from "../../brand.json";
import { Main } from "./Main";
import { FPS, TAIL_FRAMES, totalFrames } from "./lib/clock";

export const theme = themeFrom(brand);

const Themed: React.FC = () => (
  <ThemeProvider theme={theme}>
    <Main />
  </ThemeProvider>
);

export const Root: React.FC = () => (
  <Composition
    id="Main"
    component={Themed}
    durationInFrames={totalFrames + TAIL_FRAMES}
    fps={FPS}
    width={1080}
    height={1920}
  />
);
