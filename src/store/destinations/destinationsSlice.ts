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
      currentDestinationsState: DestinationsState,
      action: PayloadAction<Destination[]>,
    ): DestinationsState => ({
      ...currentDestinationsState,
      destinations: action.payload,
    }),
    deleteDestination: (
      currentDestinationsState: DestinationsState,
      action: PayloadAction<string>,
    ): DestinationsState => ({
      ...currentDestinationsState,
      destinations: currentDestinationsState.destinations.filter(
        (destination) => destination._id !== action.payload,
      ),
    }),
  },
});

export const destinationsReducer = destinationsSlice.reducer;

export const { loadDestinations: loadDestinationsActionCreator } =
  destinationsSlice.actions;
