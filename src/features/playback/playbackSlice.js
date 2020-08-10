import { createSlice } from "@reduxjs/toolkit";
import { Midi } from "@tonejs/midi";
import MusicMidi from "../../midi/dontStart.mid";

export const midiSlice = createSlice({
  name: "midi",
  initialState: {
    midi: {},
    midiIsLoading: false,
    loadMidiError: false,
  },
  reducers: {
    loadMidiStart: (state) => {
      state.midiIsLoading = true;
    },
    loadMidiSuccess: (state, action) => {
      state.midi = action.payload;
      state.midiIsLoading = false;
      state.loadMidiError = false;
    },
    loadMidiFailure: (state) => {
      state.loadMidiError = true;
      state.midiIsLoading = false;
    },
  },
});

export const {
  loadMidiStart,
  loadMidiSuccess,
  loadMidiFailure,
} = midiSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const loadMidi = () => async (dispatch) => {
  let midi = {};
  const json = await Midi.fromUrl(MusicMidi).catch((e) => {
    dispatch(loadMidiFailure());
    throw new Error(e);
  });
  // const name = midi.name;
  midi = json.tracks[3];
  dispatch(loadMidiSuccess(midi));
  return midi;
};

export default midiSlice.reducer;
