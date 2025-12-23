import { createSlice } from "@reduxjs/toolkit";

type modeType = {
  mode: "dark" | "light" | "deafult";
};

const initialState: modeType = {
  mode: "deafult",
};

export const visualSlices = createSlice({
  name: "visual",
  initialState,
  reducers: {
    toggleMode: (state, action) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
  },
});

export const { toggleMode } = visualSlices.actions;

export default visualSlices.reducer;
