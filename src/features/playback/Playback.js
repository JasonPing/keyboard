import React, { useEffect } from "react";
import { importMidi } from "./playbackSlice";
import { useSelector, useDispatch } from "react-redux";

const Playback = () => {
  let dispatch = useDispatch();
  let instrument = useSelector((state) => state.keyboard.instrument);
  let midi = useSelector((state) => state.playback.midi);
  useEffect(() => {
    dispatch(importMidi());
  }, []);
  const playNote = (note) => {
    let time = instrument.context.currentTime + note.time;
    instrument.play(note.midi, time, {
      duration: note.duration,
    });
  };
  const playAll = (midi) => {
    midi.notes.forEach((note) => {
      playNote(note);
    });
  };
  return (
    <div>
      <button onClick={() => playAll(midi)}>Play</button>
      {/* <button onClick={onClickStop()}>Stop</button> */}
    </div>
  );
};

export { Playback };
