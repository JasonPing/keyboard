import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateNoteRange } from "../keyboard/keyboardSlice";
import { loadMidi } from "./playbackSlice";

const Playback = () => {
  let dispatch = useDispatch();
  let instrument = useSelector((state) => state.keyboard.instrument);
  let midi = useSelector((state) => state.playback.midi);
  let midiIsLoading = useSelector((state) => state.playback.midiIsLoading);
  let loadMidiError = useSelector((state) => state.playback.loadMidiError);
  let currentTime = useSelector((state) => state.timer.time);
  let timerOn = useSelector((state) => state.timer.timerOn);

  useEffect(() => {
    dispatch(loadMidi()).then(
      (midi) => {
        let last = Math.max(...midi.notes.map((o) => o.midi), 0);
        let first = Math.min(...midi.notes.map((o) => o.midi));
        let noteRange = {
          first: first,
          last: last,
        };
        dispatch(updateNoteRange(noteRange));
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  useEffect(() => {
    if (timerOn) {
      playAll(midi);
    } else {
      if (instrument.context !== undefined) {
        instrument.stop();
      }
    }
  }, [timerOn]);

  const playNote = (note) => {
    let time = note.time;
    instrument.play(note.midi, time, {
      duration: note.duration,
    });
  };

  const playAll = (midi) => {
    let viewStart = currentTime / 1000;
    let filterNotes = midi.notes;

    filterNotes
      .filter((note) => note.time >= viewStart)
      .forEach((note) => {
        playNote(note);
      });
  };
  return (
    <div>
      {midiIsLoading && <p>Loading Midi</p>}
      {loadMidiError && <p>Fail to load Midi</p>}
    </div>
  );
};

export { Playback };
