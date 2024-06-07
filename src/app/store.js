import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./app-slice";

const rootReducer = combineReducers({
  [appSlice.name]: appSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
