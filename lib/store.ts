import { configureStore } from "@reduxjs/toolkit";
import visualReducer from "./feature/visual/visualSlices";

export const makeStore = () => {
  return configureStore({
    reducer: {
      visual: visualReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
