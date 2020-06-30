import { configureStore } from "@reduxjs/toolkit";

import thunk from "redux-thunk";

import counterReducer from "../features/counter/counterSlice";
import keyboardReducer from "../features/keyboard/keyboardSlice";
import playbackReducer from "../features/playback/playbackSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    keyboard: keyboardReducer,
    playback: playbackReducer,
  },
  middleware: [thunk],
});
