import React from "react";
import { useSelector } from "react-redux";
import { Instrument } from "./Instrument";
import { KeyboardRangeSelector } from "./KeyboardRangeSelector";

import getNotesBetween from "./utils/getNotesBetween";
import Tone from "tone";

const minKey = 1;
const maxKey = 76;

const Keyboard = () => {
  const instrumentName = useSelector((state) => state.keyboard.instrumentName);
  const noteRange = useSelector((state) => state.keyboard.noteRange);
  const startNote = Tone.Frequency(noteRange.first, "midi").toNote();
  const endNote = Tone.Frequency(noteRange.last, "midi").toNote();
  const notes = getNotesBetween(startNote, endNote);

  return (
    <div>
      <Instrument instrumentName={instrumentName} notes={notes} />
      <KeyboardRangeSelector min={minKey} max={maxKey} />
    </div>
  );
};

export { Keyboard };
