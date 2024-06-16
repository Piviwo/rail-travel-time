import { createSelector } from "@reduxjs/toolkit";

export const getAppState = (state) => state["appState"];

export const getCoordinates = createSelector(
  getAppState,
  (state) => state.coordinates
);

export const getSelectedCity = createSelector(
  getAppState,
  (state) => state.selectedCity
);

export const getFilteredCities = createSelector(
  getAppState,
  (state) => state.filteredCities
);


export const getMode = createSelector(getAppState, (state) => state.mode);
