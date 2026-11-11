import React from "react";
import {Composition} from "remotion";
import {Short, clock} from "./Short";
import {HostOpening, hostClock} from "./HostOpening";
import {ColdOpen, coldClock, coldTotalFrames} from "./ColdOpen";

export const Root = () => (
  <>
    <Composition
      id="E02HostOpening"
      component={HostOpening}
      defaultProps={{
        paperStyle: false,
        swapCharacterDesigns: false,
        showReactionGag: false,
        showCaptions: true,
        soundEffects: true,
      }}
      width={1920}
      height={1080}
      fps={hostClock.fps}
      durationInFrames={hostClock.totalFrames}
    />
    <Composition
      id="E02HostPaper"
      component={HostOpening}
      defaultProps={{paperStyle: true, swapCharacterDesigns: false, showReactionGag: true, showCaptions: true, soundEffects: true}}
      width={1920}
      height={1080}
      fps={hostClock.fps}
      durationInFrames={hostClock.totalFrames}
    />
    <Composition
      id="E02ColdOpen"
      component={ColdOpen}
      width={1920}
      height={1080}
      fps={coldClock.fps}
      durationInFrames={coldTotalFrames}
    />
    <Composition
      id="E02Short"
      component={Short}
      width={1080}
      height={1920}
      fps={clock.fps}
      durationInFrames={clock.totalFrames}
    />
  </>
);
