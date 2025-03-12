import { configureStore } from "@reduxjs/toolkit";
import surveysReducer from "./slices/surveysSlice";
import questionsReducer from "./slices/questionsSlice";
import casesReducer from "./slices/casesSlice";
import organizationsReducer from "./slices/organizationsSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    surveys: surveysReducer,
    questions: questionsReducer,
    cases: casesReducer,
    organizations: organizationsReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
