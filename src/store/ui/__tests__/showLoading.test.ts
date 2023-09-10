import { UiState } from "../types";
import { showLoadingActionCreator, uiReducer } from "../uiSlice";

describe("Given a uiReducer reducer", () => {
  describe("When it receives a showLoading action", () => {
    test("Then it should return a new state with loading true", () => {
      const currentUiState: UiState = {
        isLoading: false,
      };
      const showLoadingAction = showLoadingActionCreator();

      const newUiState = uiReducer(currentUiState, showLoadingAction);

      expect(newUiState.isLoading).toStrictEqual(true);
    });
  });
});
