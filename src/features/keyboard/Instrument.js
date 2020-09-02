import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Piano } from "./Piano";
import { KeyboardRangeSelector } from "./KeyboardRangeSelector";

import { loadInstrument } from "./keyboardSlice";

const Instrument = ({ instrumentName, notes }) => {
  const keyboardState = useSelector((state) => state.keyboard);

  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const soundfontHostname = "https://d1pzp51pvbm36p.cloudfront.net";
  const soundfont = "FluidR3_GM";
  const format = "mp3";

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      loadInstrument(instrumentName, audioContext, soundfont, format)
    ).then(
      (audioContext) => {
        console.log(audioContext);
      },
      (e) => {
        console.log(e);
      }
    );
  }, []);

  //rendering piano keys
  return (
    <>
      {keyboardState.instrumentIsLoading ? (
        <div>Loading instrument ...</div>
      ) : keyboardState.loadInstrumentHasError ? (
        <div>Fail to load instrument </div>
      ) : (
        <>
          <Piano notes={notes} audioContext={audioContext} />
          <KeyboardRangeSelector />
        </>
      )}
    </>
  );
};

export { Instrument };
