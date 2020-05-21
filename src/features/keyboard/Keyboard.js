import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import "./customPianoStyles.css";

import { SoundfontProvider } from "./SoundfontProvider";
import DimensionsProvider from "./DimensionsProvider";

import { KeyboardRangeSelector } from "./KeyboardRangeSelector";

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = "https://d1pzp51pvbm36p.cloudfront.net";
const soundfont = "FluidR3_GM";
const name = "synth_brass_1";
const format = "mp3";
const minKey = MidiNumbers.MIN_MIDI_NUMBER;
const maxKey = MidiNumbers.MAX_MIDI_NUMBER;

const ResponsivePiano = (props) => {
  const noteRange = useSelector((state) => state.keyboard.noteRange);
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: noteRange.first,
    lastNote: noteRange.last,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });

  return (
    <DimensionsProvider>
      {({ containerWidth, containerHeight }) => (
        <SoundfontProvider
          instrumentName={name}
          audioContext={audioContext}
          hostname={soundfontHostname}
          soundfont={soundfont}
          name={name}
          format={format}
          render={({ isLoading, playNote, stopNote }) => (
            <Piano
              noteRange={noteRange}
              width={containerWidth}
              playNote={playNote}
              stopNote={stopNote}
              disabled={isLoading}
              keyboardShortcuts={keyboardShortcuts}
              {...props}
            />
          )}
        />
      )}
    </DimensionsProvider>
  );
};

const Keyboard = () => {
  return (
    <div>
      <ResponsivePiano />
      <KeyboardRangeSelector min={minKey} max={maxKey} />
    </div>
  );
};

export { Keyboard };
