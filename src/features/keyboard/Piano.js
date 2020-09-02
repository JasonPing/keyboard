import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateActiveAudioNodes, clearActiveAudioNodes } from "./keyboardSlice";
import "./piano.css";

import isAccidentalNote from "./utils/isAccidentalNote";
import { getKeyboardShortcutsForNote } from "./utils/getKeyboardShortcutsForNote";
import { keyboardMap } from "./utils/getKeyboardMap";

const Piano = ({ notes, audioContext }) => {
  const dispatch = useDispatch();
  const instrument = useSelector((state) => state.keyboard.instrument);
  const notesPlaying = useSelector((state) => state.keyboard.notesPlaying);

  useEffect(() => {
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);

    // clean up
    return () => {
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyDown);
    };
  });

  const isRegularKey = (event) => {
    return !event.ctrlKey && !event.metaKey && !event.shiftKey;
  };

  const getNoteFromKeyboardKey = (keyboardKey) => {
    return keyboardMap[keyboardKey.toUpperCase()];
  };

  const playNote = (midiNumber, instrument) => {
    audioContext.resume().then(() => {
      const audioNode = instrument.play(midiNumber);
      let obj = {
        [midiNumber]: audioNode,
      };

      dispatch(updateActiveAudioNodes(obj));
    });
  };

  const stopNote = (midiNumber, notesPlaying) => {
    audioContext.resume().then(() => {
      if (!notesPlaying[midiNumber]) {
        return;
      }
      const audioNode = notesPlaying[midiNumber];
      audioNode.stop();
      dispatch(clearActiveAudioNodes(midiNumber));
    });
  };

  const keyDown = (e) => {
    if (isRegularKey(e) && !e.repeat) {
      const note = getNoteFromKeyboardKey(e.key);
      playNote(note, instrument);
    }
  };

  const keyUp = (e) => {
    if (isRegularKey(e) && !e.repeat) {
      const note = getNoteFromKeyboardKey(e.key);
      stopNote(note, notesPlaying);
    }
  };

  const accidentalKey = ({ isPlaying, text, eventHandlers }) => {
    return (
      <div className="piano-accidental-key-wrapper">
        <button
          className={`piano-accidental-key ${
            isPlaying ? "piano-accidental-key-playing" : ""
          } `}
          {...eventHandlers}
        >
          <div className="piano-text">{text}</div>
        </button>
      </div>
    );
  };

  const naturalKey = ({ isPlaying, text, eventHandlers }) => {
    return (
      <button
        className={`piano-natural-key ${
          isPlaying ? "piano-natural-key-playing" : ""
        } `}
        {...eventHandlers}
      >
        <div className="piano-text">{text}</div>
      </button>
    );
  };

  const renderPianoKey = ({
    isAccidentalNote,
    isNotePlaying,
    startPlayingNote,
    stopPlayingNote,
    keyboardShortcut,
  }) => {
    const KeyComponent = isAccidentalNote ? accidentalKey : naturalKey;

    const eventHandlers = {
      onMouseDown: startPlayingNote,
      onMouseUp: stopPlayingNote,
      onTouchStart: startPlayingNote,
      onMouseOut: stopPlayingNote,
      onTouchEnd: stopPlayingNote,
    };

    return (
      <KeyComponent
        isPlaying={isNotePlaying}
        text={keyboardShortcut.join("/")}
        eventHandlers={eventHandlers}
      />
    );
  };

  return (
    <div className="piano-container">
      <>
        {notes.map((note, index) => {
          let isPlaying = notesPlaying[note];
          return (
            <Fragment key={index}>
              {renderPianoKey({
                note,
                isAccidentalNote: isAccidentalNote(note),
                isNotePlaying: isPlaying,
                startPlayingNote: () => playNote(note, instrument),
                stopPlayingNote: () => stopNote(note, notesPlaying),
                keyboardShortcut: getKeyboardShortcutsForNote(
                  keyboardMap,
                  note
                ),
                key: index,
              })}
            </Fragment>
          );
        })}
      </>
    </div>
  );
};

export { Piano };
