import React, { Fragment } from "react";
import "./piano.css";

import isAccidentalNote from "./utils/isAccidentalNote";
import { getKeyboardShortcutsForNote } from "./utils/getKeyboardShortcutsForNote";
import { keyboardMap } from "./utils/getKeyboardMap";

const Piano = ({ onPlayNoteStart, onPlayNoteEnd, notes }) => {
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
    index,
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
          return (
            <Fragment key={index}>
              {renderPianoKey({
                note,
                isAccidentalNote: isAccidentalNote(note),
                isNotePlaying: false,
                startPlayingNote: () => onPlayNoteStart(note),
                stopPlayingNote: () => onPlayNoteEnd(note),
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
