import React from "react";
import { Counter } from "../features/counter/Counter";
import { Keyboard } from "../features/keyboard/Keyboard";
import { Playback } from "../features/playback/Playback";
import { Canvas } from "../features/canvas/Canvas";
import { Timer } from "../features/timer/Timer";

const MainPage = () => {
  return (
    <div className="App">
      {/* <Counter /> */}
      <Timer />
      <Canvas />
      <Keyboard />
      <Playback />
    </div>
  );
};

export { MainPage };
