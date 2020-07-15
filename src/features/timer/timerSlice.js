import { createSlice } from "@reduxjs/toolkit";

export const timerSlice = createSlice({
  name: "timer",
  initialState: {
    timerOn: false,
    time: 0,
    offset: 0,
  },
  reducers: {
    startTimer: (state, action) => {
      state.timerOn = true;
      state.offset = action.payload;
    },
    stopTimer: (state) => {
      state.timerOn = false;
    },
    tickTimer: (state, action) => {
      state.time = state.time + (action.payload - state.offset);
      state.offset = action.payload;
    },
    resetTimer: (state) => {
      state.timerOn = false;
      state.time = 0;
    },
  },
});

export const {
  startTimer,
  stopTimer,
  tickTimer,
  resetTimer,
} = timerSlice.actions;

export default timerSlice.reducer;
