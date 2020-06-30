import { createSlice } from "@reduxjs/toolkit";
import { Midi } from "@tonejs/midi";
import { json } from "../playback/music";

export const midiSlice = createSlice({
  name: "midi",
  initialState: {
    midi: {},
    midiIsLoad: true,
  },
  reducers: {
    updateMidi: (state, action) => {
      state.midi = action.payload;
      state.midiIsLoad = false;
    },
  },
});

export const { updateMidi } = midiSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const importMidi = () => async (dispatch) => {
  // const midi = await Midi.fromUrl("../../midi/bach_846.mid");
  // const name = midi.name;

  const midi = json.tracks[2];
  setTimeout(() => {
    dispatch(updateMidi(midi));
  }, 3000);
};

export default midiSlice.reducer;
