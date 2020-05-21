import { createSlice } from "@reduxjs/toolkit";

export const keyboardSlice = createSlice({
  name: "keyboard",
  initialState: {
    instruments: [],
    activeAudioNodes: {},
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
    loadInstrumentSuccess: (state) => {
      state.isLoading = false;
      state.hasError = false;
    },
    loadInstrumentFailure: (state) => {
      state.hasError = true;
      state.isLoading = false;
    },
    updateActiveAudioNodes: (state, action) => {
      state.activeAudioNodes = { ...state.activeAudioNodes, ...action.payload };
    },
    clearActiveAudioNodes: (state, action) => {
      delete state.activeAudioNodes[action.payload];
    },
    clearAllNodes: (state) => {
      state.activeAudioNodes = {};
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
