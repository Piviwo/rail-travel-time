import { createAction } from "@reduxjs/toolkit";

export const setCoordinates = createAction(
  `appState/setCoordinates`,
  (payload) => ({
    payload,
  })
);

export const setSelectedCity = createAction(
  `appState/setSelectedCity`,
  (payload) => ({
    payload,
  })
);

export const setFilteredCities = createAction(
  `appState/setFilteredCities`,
  (payload) => ({
    payload,
  })
);
