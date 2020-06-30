import React from "react";
import { Counter } from "../features/counter/Counter";
import { Keyboard } from "../features/keyboard/Keyboard";
import { Playback } from "../features/playback/Playback";
import { Canvas } from "../features/canvas/Canvas";

const MainPage = () => {
  return (
    <div className="App">
      {/* <Counter /> */}
      <Canvas />
      <Keyboard />
      <Playback />
    </div>
  );
};

export { MainPage };
