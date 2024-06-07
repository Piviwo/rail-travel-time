import { createSlice } from "@reduxjs/toolkit";
import {
  setCoordinates,
  setFilteredCities,
  setSelectedCity,
} from "./app-actions";

const initialState = {};

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
  },
});
