import React from "react";
import { Counter } from "../features/counter/Counter";
import { Keyboard } from "../features/keyboard/Keyboard";

const MainPage = () => {
  return (
    <div className="App">
      <Counter />
      <Keyboard />
    </div>
  );
};

export { MainPage };
