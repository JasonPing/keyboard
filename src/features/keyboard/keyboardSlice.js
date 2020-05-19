import { createSlice } from "@reduxjs/toolkit";

export const keyboardSlice = createSlice({
  name: "keyboard",
  initialState: {
    activeAudioNodes: {},
    isLoading: false,
  },
  reducers: {
    loadInstrumentStart: (state) => {
      state.isLoading = true;
    },
    loadInstrumentSuccess: (state) => {
      state.isLoading = false;
    },
    updateActiveAudioNodes: (state, action) => {
      state.activeAudioNodes = { ...state.activeAudioNodes, ...action.payload };
    },
    clearActiveAudioNodes: (state) => {
      state.activeAudioNodes = {};
    },
  },
});

export const {
  loadInstrumentStart,
  loadInstrumentSuccess,
  updateActiveAudioNodes,
  clearActiveAudioNodes,
} = keyboardSlice.actions;

export default keyboardSlice.reducer;
