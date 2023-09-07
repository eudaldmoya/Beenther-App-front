import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Destination } from "../../types";
import { DestinationsState } from "./types";

const initialState: DestinationsState = {
  destinations: [],
};

const destinationsSlice = createSlice({
  name: "destinations",
  initialState: initialState,
  reducers: {
    loadDestinations: (
      _currentDestinationsState: DestinationsState,
      action: PayloadAction<Destination[]>,
    ): DestinationsState => ({
      destinations: action.payload,
    }),
  },
});

export const destinationsReducer = destinationsSlice.reducer;

export const { loadDestinations: loadDestinationsActionCreator } =
  destinationsSlice.actions;
