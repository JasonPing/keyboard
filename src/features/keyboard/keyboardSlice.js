import { createSlice } from "@reduxjs/toolkit";

export const keyboardSlice = createSlice({
  name: "keyboard",
  initialState: {
    audioContext: new (window.AudioContext || window.webkitAudioContext)(),
    soundfontHostname: "https://d1pzp51pvbm36p.cloudfront.net",
    soundfont: "FluidR3_GM",
    instrumentName: "acoustic_grand_piano",
    format: "mp3",
    instrument: {},
    notesPlaying: {},
    isLoading: false,
    hasError: false,
    noteRange: {
      first: 43,
      last: 65,
    },
  },
  reducers: {
    loadInstrumentStart: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    loadInstrumentSuccess: (state, action) => {
      state.isLoading = false;
      state.hasError = false;
      state.instrument = { ...action.payload };
    },
    loadInstrumentFailure: (state) => {
      state.hasError = true;
      state.isLoading = !state.isLoading;
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

export default keyboardSlice.reducer;
