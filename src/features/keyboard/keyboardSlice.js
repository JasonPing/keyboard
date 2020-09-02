import { createSlice } from "@reduxjs/toolkit";
import Soundfont from "soundfont-player";

export const keyboardSlice = createSlice({
  name: "keyboard",
  initialState: {
    instrument: {},
    notesPlaying: {},
    instrumentIsLoading: false,
    loadInstrumentHasError: false,
    noteRange: {
      first: 43,
      last: 65,
    },
  },
  reducers: {
    loadInstrumentStart: (state) => {
      state.instrumentIsLoading = true;
      state.loadInstrumentHasError = false;
    },
    loadInstrumentSuccess: (state, action) => {
      state.instrumentIsLoading = false;
      state.loadInstrumentHasError = false;
      state.instrument = { ...action.payload };
    },
    loadInstrumentFailure: (state) => {
      state.loadInstrumentHasError = true;
      state.instrumentIsLoading = !state.instrumentIsLoading;
    },
    updateActiveAudioNodes: (state, action) => {
      state.notesPlaying = { ...state.notesPlaying, ...action.payload };
    },
    clearActiveAudioNodes: (state, action) => {
      delete state.notesPlaying[action.payload];
    },
    clearAllNodes: (state) => {
      state.notesPlaying = {};
    },
    updateNoteRange: (state, action) => {
      state.noteRange = { ...action.payload };
    },
  },
});

export const {
  loadInstrumentStart,
  loadInstrumentSuccess,
  loadInstrumentFailure,
  updateActiveAudioNodes,
  clearActiveAudioNodes,
  clearAllNodes,
  updateNoteRange,
} = keyboardSlice.actions;

export const loadInstrument = (
  instrumentName,
  audioContext,
  format,
  soundfont
) => async (dispatch) => {
  dispatch(loadInstrumentStart());
  const instrument = await Soundfont.instrument(audioContext, instrumentName, {
    format: format,
    soundfont: soundfont,
  }).catch((e) => {
    dispatch(loadInstrumentFailure());
    throw new Error(e);
  });

  dispatch(loadInstrumentSuccess(instrument));
  return audioContext;
};

export default keyboardSlice.reducer;
