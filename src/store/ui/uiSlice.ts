import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UiState } from "./types";

const initialUiState: UiState = {
  isLoading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUiState,
  reducers: {
    showLoading: (currentUiState: UiState): UiState => ({
      ...currentUiState,
      isLoading: true,
    }),
    hideLoading: (currentUiState: UiState): UiState => ({
      ...currentUiState,
      isLoading: false,
    }),
    setIdLoading: (
      currentUiState: UiState,
      action: PayloadAction<string>,
    ): UiState => ({
      ...currentUiState,
      destinationIdLoading: action.payload,
    }),
  },
});

export const {
  showLoading: showLoadingActionCreator,
  hideLoading: hideLoadingActionCreator,
  setIdLoading: setIdLoadingActionCreator,
} = uiSlice.actions;

export const uiReducer = uiSlice.reducer;
