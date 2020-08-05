import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Grid } from "./Grid";
import { Notes } from "./Notes";
import "./canvas.css";

const Canvas = () => {
  const gridRef = useRef();
  const noteRange = useSelector((state) => {
    return state.keyboard.noteRange;
  });

  const midiIsLoad = useSelector((state) => {
    return state.playback.midiIsLoad;
  });
  const midi = useSelector((state) => {
    return state.playback.midi;
  });

  return (
    <>
      {midiIsLoad ? (
        <div>loading</div>
      ) : (
        <>
          <Grid first={noteRange.first} last={noteRange.last} ref={gridRef} />
          <Notes midi={midi} ref={gridRef} />
        </>
      )}
    </>
  );
};

export { Canvas };
