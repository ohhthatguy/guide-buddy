import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type upcomingAndRecentTourConnectionType = {
  tourId: string | null;
};

const initialState: upcomingAndRecentTourConnectionType = {
  tourId: "",
};

export const upcomingAndRecentTourSlices = createSlice({
  name: "upcomingAndRecentTourConnection",
  initialState,
  reducers: {
    setTourId: (state, action: PayloadAction<string | null>) => {
      //   console.log("INSIDE THE REDUX, ", action.payload);
      state.tourId = action.payload;
    },
  },
});

export const { setTourId } = upcomingAndRecentTourSlices.actions;

export default upcomingAndRecentTourSlices.reducer;
