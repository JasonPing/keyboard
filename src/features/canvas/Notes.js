import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";

import colorArray from "./constants/color";

function useResizeNotesPos(props) {
  const midi = props.note.midi;
  const noteHeight = props.note.duration * 100;
  const noteIndex = midi - props.noteRange.first;
  const noteTime = props.note.time;
  const [noteLeftPos, setNoteLeftPos] = useState(0);
  const [noteTopPos, setNoteTopPos] = useState(0);
  const [noteWidth, setNoteWidth] = useState(0);
  const [bgColor, setBgColor] = useState("");

  const style = {
    backgroundColor: bgColor,
    height: noteHeight,
    width: noteWidth,
    left: noteLeftPos,
    top: "0px",
    transform: "translateY(" + noteTopPos + "px)",
    position: "absolute",
  };

  useEffect(() => {
    handleResize();
    function handleResize() {
      const childGrid = props.gridRef.current.children[noteIndex];
      if (childGrid !== undefined) {
        const gridHeight = props.gridRef.current.clientHeight;
        setNoteLeftPos(childGrid.offsetLeft);
        setNoteTopPos((props.currentTime / 1000 - noteTime) * 100 + gridHeight);
        setNoteWidth(childGrid.offsetWidth - 1);
        setBgColor(colorArray[midi % 6]);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [props.noteRange, props.currentTime]);

  return style;
}

const Note = (props) => {
  const style = useResizeNotesPos(props);

  return (
    <div className="" style={style}>
      {props.note.name}
    </div>
  );
};

const Notes = React.forwardRef((props, ref) => {
  const noteRange = useSelector((state) => state.keyboard.noteRange);
  const currentTime = useSelector((state) => state.timer.time);
  const notes = props.midi.notes;
  const gridRef = ref;

  // only render notes in viewport
  let notesFilter = notes.filter((n) => {
    let up = (currentTime + 5000) / 1000;
    let down = (currentTime - 500) / 1000;
    if (n.time < up && n.time > down) {
      return n;
    }
  });

  return (
    <div className="">
      {notesFilter.map((note, index) => {
        return (
          <Note
            note={note}
            key={index}
            gridRef={gridRef}
            noteRange={noteRange}
            currentTime={currentTime}
          />
        );
      })}
    </div>
  );
});
export { Notes };
