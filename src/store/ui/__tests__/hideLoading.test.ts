import { UiState } from "../types";
import { hideLoadingActionCreator, uiReducer } from "../uiSlice";

describe("Given a uiReducer reducer", () => {
  describe("When it receives a hideLoading action", () => {
    test("Then it should return a new state with isLoading false", () => {
      const currentUiState: UiState = {
        isLoading: true,
      };
      const hideLoadingAction = hideLoadingActionCreator();

      const newUiState = uiReducer(currentUiState, hideLoadingAction);

      expect(newUiState.isLoading).toStrictEqual(false);
    });
  });
});
