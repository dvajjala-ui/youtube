import React from "react";
import { Composition } from "remotion";
import { Short } from "./Short";
import { totalFrames, FPS } from "./lib/clock";

export const Root: React.FC = () => (
  <Composition
    id="E01Short"
    component={Short}
    durationInFrames={totalFrames}
    fps={FPS}
    width={1080}
    height={1920}
  />
);
