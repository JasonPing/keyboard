import { configureStore } from "@reduxjs/toolkit";

import thunk from "redux-thunk";

import counterReducer from "../features/counter/counterSlice";
import keyboardReducer from "../features/keyboard/keyboardSlice";
import playbackReducer from "../features/playback/playbackSlice";
import timerReducer from "../features/timer/timerSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    keyboard: keyboardReducer,
    playback: playbackReducer,
    timer: timerReducer,
  },
  middleware: [thunk],
});
