import React from "react";
import { useSelector } from "react-redux";
import { Instrument } from "./Instrument";

import getNotesBetween from "./utils/getNotesBetween";
import Tone from "tone";

const Keyboard = () => {
  const instrumentName = "acoustic_grand_piano";
  const noteRange = useSelector((state) => state.keyboard.noteRange);
  const startNote = Tone.Frequency(noteRange.first, "midi").toNote();
  const endNote = Tone.Frequency(noteRange.last, "midi").toNote();
  const notes = getNotesBetween(startNote, endNote);

  return (
    <div>
      <Instrument instrumentName={instrumentName} notes={notes} />
    </div>
  );
};

export { Keyboard };
