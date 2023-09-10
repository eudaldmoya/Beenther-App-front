import { createSlice } from "@reduxjs/toolkit";
import { UiState } from "./types";

const initialUiState: UiState = {
  isLoading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUiState,
  reducers: {
    startLoading: (currentUiState: UiState): UiState => ({
      ...currentUiState,
      isLoading: true,
    }),
  },
});

export const { startLoading: startLoadingActionCreator } = uiSlice.actions;
