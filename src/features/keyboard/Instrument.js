import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { InstrumentAudio } from "./InstrumentAudio.js";
import { Piano } from "./Piano";
import Soundfont from "soundfont-player";
import { keyboardMap } from "./utils/getKeyboardMap";

import {
  loadInstrumentStart,
  loadInstrumentSuccess,
  updateActiveAudioNodes,
  clearActiveAudioNodes,
} from "./keyboardSlice";

const isRegularKey = (event) => {
  return !event.ctrlKey && !event.metaKey && !event.shiftKey;
};

const Instrument = ({ instrumentName, notes }) => {
  const keyboardState = useSelector((state) => state.keyboard);

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      loadInstrument(instrumentName);
    }, 3000);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
    // clean up
    return () => {
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyDown);
    };
  });

  const loadInstrument = (instrumentName) => {
    // Re-trigger loading state
    dispatch(loadInstrumentStart());
    Soundfont.instrument(keyboardState.audioContext, instrumentName, {
      format: keyboardState.format,
      soundfont: keyboardState.soundfont,
    }).then((instrument) => {
      dispatch(loadInstrumentSuccess(instrument));
    });
  };

  const getNoteFromKeyboardKey = (keyboardKey) => {
    return keyboardMap[keyboardKey.toUpperCase()];
  };

  const keyDown = (e) => {
    if (isRegularKey(e) && !e.repeat) {
      const note = getNoteFromKeyboardKey(e.key);
      playNote(note);
    }
  };

  const keyUp = (e) => {
    if (isRegularKey(e) && !e.repeat) {
      const note = getNoteFromKeyboardKey(e.key);
      stopNote(note);
    }
  };

  const playNote = (midiNumber) => {
    keyboardState.audioContext.resume().then(() => {
      const audioNode = keyboardState.instrument.play(midiNumber);
      let obj = {
        [midiNumber]: audioNode,
      };

      dispatch(updateActiveAudioNodes(obj));
    });
  };
  const stopNote = (midiNumber) => {
    keyboardState.audioContext.resume().then(() => {
      if (!keyboardState.notesPlaying[midiNumber]) {
        return;
      }
      const audioNode = keyboardState.notesPlaying[midiNumber];
      audioNode.stop();
      dispatch(clearActiveAudioNodes(midiNumber));
    });
  };

  //rendering piano keys
  return (
    <Fragment>
      {keyboardState.isLoading ? (
        <div>loading...</div>
      ) : (
        <Piano
          onPlayNoteStart={playNote}
          onPlayNoteEnd={stopNote}
          notes={notes}
        />
      )}
    </Fragment>
  );
};

export { Instrument };
