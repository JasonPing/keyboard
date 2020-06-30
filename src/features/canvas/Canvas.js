import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "./Grid";
import { Notes } from "./Notes";
import "./canvas.css";

const Canvas = () => {
  const notes = useSelector((state) => {
    return state.keyboard.noteRange;
  });

  const range = notes.last - notes.first + 1;

  const midiIsLoad = useSelector((state) => {
    return state.playback.midiIsLoad;
  });
  const midi = useSelector((state) => {
    return state.playback.midi;
  });

  return (
    <>
      <Grid range={range} />
      {/* {midiIsLoad ? <div>loading</div> : <Notes midi={midi} />} */}
    </>
  );
};

export { Canvas };
