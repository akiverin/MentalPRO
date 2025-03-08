import { configureStore } from "@reduxjs/toolkit";
import surveysReducer from "./slices/surveysSlice";

export const store = configureStore({
  reducer: {
    surveys: surveysReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
