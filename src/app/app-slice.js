import { createSlice } from "@reduxjs/toolkit";
import {
  setCoordinates,
  setFilteredCities,
  setSelectedCity,
  setMode,
  setSideNav
} from "./app-actions";

const initialState = {
  mode: "averageBetween",
  selectedCity: "Vienna",
  sideNavOpen: true,
};

export const appSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setCoordinates, (state, action) => ({
      ...state,
      coordinates: action.payload,
    }));
    builder.addCase(setSelectedCity, (state, action) => ({
      ...state,
      selectedCity: action.payload,
    }));
    builder.addCase(setFilteredCities, (state, action) => ({
      ...state,
      filteredCities: action.payload,
    }));
    builder.addCase(setMode, (state, action) => ({
      ...state,
      mode: action.payload,
    }));
    builder.addCase(setSideNav, (state, action) => ({
      ...state,
      sideNavOpen: action.payload,
    }));
  },
});
