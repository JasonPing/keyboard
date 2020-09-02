import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import { SliderRail, Handle, Track, Tick } from "./KeyboardRangeComponent";
import { updateNoteRange } from "./keyboardSlice";

const sliderStyle = {
  position: "relative",
  width: "100%",
};

const minKey = 1;
const maxKey = 106;

const KeyboardRangeSelector = (props) => {
  const dispatch = useDispatch();

  const onUpdate = (update) => {
    setIndication(update);
  };

  const onChange = (values) => {
    let noteRange = {
      first: values[0],
      last: values[1],
    };
    dispatch(updateNoteRange(noteRange));
  };

  let domain = [minKey, maxKey];
  let noteRange = useSelector((state) => state.keyboard.noteRange);
  let values = [noteRange.first, noteRange.last];
  const [indication, setIndication] = useState(values);

  return (
    <div style={{ "margin-top": "100px", width: "80%", margin: "0 auto" }}>
      <div>from {indication[0]}</div>
      <div>to {indication[1]}</div>

      <Slider
        mode={1}
        step={1}
        domain={domain}
        rootStyle={sliderStyle}
        onUpdate={onUpdate}
        onChange={onChange}
        values={values}
      >
        <Rail>
          {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
        </Rail>
        <Handles>
          {({ handles, getHandleProps }) => (
            <div className="slider-handles">
              {handles.map((handle) => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  domain={domain}
                  getHandleProps={getHandleProps}
                />
              ))}
            </div>
          )}
        </Handles>
        <Tracks left={false} right={false}>
          {({ tracks, getTrackProps }) => (
            <div className="slider-tracks">
              {tracks.map(({ id, source, target }) => (
                <Track
                  key={id}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
                />
              ))}
            </div>
          )}
        </Tracks>
        <Ticks count={10}>
          {({ ticks }) => (
            <div className="slider-ticks">
              {ticks.map((tick) => (
                <Tick key={tick.id} tick={tick} count={ticks.length} />
              ))}
            </div>
          )}
        </Ticks>
      </Slider>
    </div>
  );
};

export { KeyboardRangeSelector };
