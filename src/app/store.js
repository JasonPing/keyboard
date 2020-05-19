import { configureStore } from "@reduxjs/toolkit";

import thunk from "redux-thunk";

import counterReducer from "../features/counter/counterSlice";
import keyboardReducer from "../features/keyboard/keyboardSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    keyboard: keyboardReducer,
  },
  middleware: [thunk],
});
