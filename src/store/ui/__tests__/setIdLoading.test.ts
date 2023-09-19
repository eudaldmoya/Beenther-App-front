import { UiState } from "../types";
import { setIdLoadingActionCreator, uiReducer } from "../uiSlice";

describe("Given a uiReducer reducer", () => {
  describe("When it receives a setIdLoading action with id 'louiseId'", () => {
    test("Then it should return a new state with idLoading 'louiseId'", () => {
      const currentUiState: UiState = {
        isLoading: false,
      };
      const id = "louiseId";
      const setIdLoadingAction = setIdLoadingActionCreator(id);

      const newUiState = uiReducer(currentUiState, setIdLoadingAction);

      expect(newUiState.destinationIdLoading).toStrictEqual(id);
    });
  });
});
