import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Soundfont from "soundfont-player";
import {
  loadInstrumentStart,
  loadInstrumentSuccess,
  updateActiveAudioNodes,
  clearActiveAudioNodes,
} from "./keyboardSlice";

const SoundfontProvider = (props) => {
  const [instrument, setInstrument] = useState(null);
  const isLoading = useSelector((state) => state.keyboard.isLoading);
  const activeAudioNodes = useSelector(
    (state) => state.keyboard.activeAudioNodes
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const loadInstrument = (instrumentName) => {
      // Re-trigger loading state
      dispatch(loadInstrumentStart());
      Soundfont.instrument(props.audioContext, instrumentName, {
        format: props.format,
        soundfont: props.soundfont,
        nameToUrl: (name, soundfont, format) => {
          return `${props.hostname}/${soundfont}/${name}-${format}.js`;
        },
      }).then((instrument) => {
        setInstrument(instrument);
        dispatch(loadInstrumentSuccess());
      });
    };

    loadInstrument(props.instrumentName);
  }, [props.instrumentName]);

  const playNote = (midiNumber) => {
    props.audioContext.resume().then(() => {
      const audioNode = instrument.play(midiNumber);

      let obj = {
        [midiNumber]: audioNode,
      };

      dispatch(updateActiveAudioNodes(obj));
    });
  };
  const stopNote = (midiNumber) => {
    props.audioContext.resume().then(() => {
      if (!activeAudioNodes[midiNumber]) {
        return;
      }
      const audioNode = activeAudioNodes[midiNumber];
      audioNode.stop();
      dispatch(clearActiveAudioNodes());
    });
  };
  const stopAllNotes = () => {
    props.audioContext.resume().then(() => {
      const aAudioNodes = Object.values(activeAudioNodes);
      aAudioNodes.forEach((node) => {
        if (node) {
          node.stop();
        }
      });
      dispatch(clearActiveAudioNodes());
    });
  };

  return props.render({
    isLoading: isLoading,
    playNote: playNote,
    stopNote: stopNote,
    stopAllNotes: stopAllNotes,
  });
};

export { SoundfontProvider };
