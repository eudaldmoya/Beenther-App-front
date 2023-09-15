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
    addDestination: (
      currentDestinationsState: DestinationsState,
      action: PayloadAction<Destination>,
    ): DestinationsState => ({
      ...currentDestinationsState,
      destinations: [...currentDestinationsState.destinations, action.payload],
    }),
    loadSelectedDestination: (
      currentDestinationsState: DestinationsState,
      action: PayloadAction<Destination>,
    ): DestinationsState => ({
      ...currentDestinationsState,
      selectedDestination: action.payload,
    }),
    modifyDestination: (
      currentDestinationsState: DestinationsState,
      action: PayloadAction<Destination>,
    ): DestinationsState => ({
      ...currentDestinationsState,
      destinations: currentDestinationsState.destinations.map((destination) =>
        destination._id === action.payload._id ? action.payload : destination,
      ),
    }),
  },
});

export const destinationsReducer = destinationsSlice.reducer;

export const {
  loadDestinations: loadDestinationsActionCreator,
  deleteDestination: deleteDestinationActionCreator,
  addDestination: addDestinationActionCreator,
  loadSelectedDestination: loadSelectedDestinationActionCreator,
  modifyDestination: modifyDestinationActionCreator,
} = destinationsSlice.actions;
