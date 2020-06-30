import React, { useRef } from "react";

const Note = React.forwardRef((props, ref) => {
  return (
    <div className="" ref={ref}>
      {props.note.name}
    </div>
  );
});

const Notes = (props) => {
  const notes = props.midi.notes;
  const noteRef = useRef();

  return (
    <div className="">
      {notes.map((note, index) => {
        return <Note noteRef={noteRef} note={note} />;
      })}
    </div>
  );
};

export { Notes };
