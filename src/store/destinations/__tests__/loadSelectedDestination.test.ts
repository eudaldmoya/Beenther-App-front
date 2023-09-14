import {
  destinationMock,
  destinationsMock,
} from "../../../mocks/destinationsMock";
import {
  destinationsReducer,
  loadSelectedDestinationActionCreator,
} from "../destinationsSlice";
import { DestinationsState } from "../types";

describe("Given a destinationsReducer reducer", () => {
  describe("When it receives a loadSelectedDestination action with 'Nuuk'", () => {
    test("Then it should return a new state with the selectedDestination 'Nuuk'", () => {
      const currentDestinationsState: DestinationsState = { destinations: [] };
      const loadSelectedDestinationAction =
        loadSelectedDestinationActionCreator(destinationMock);

      const newDestinationsState = destinationsReducer(
        currentDestinationsState,
        loadSelectedDestinationAction,
      );

      expect(newDestinationsState.selectedDestination).toStrictEqual(
        destinationMock,
      );
    });
  });

  describe("When it receives a loadSelectedDestination action with 'Nuuk' and a current state with 'Lake Louise'", () => {
    test("Then it should return a new state with the selectedDestination 'Nuuk'", () => {
      const currentDestinationsState: DestinationsState = {
        destinations: [],
        selectedDestination: destinationsMock[0],
      };
      const loadSelectedDestinationAction =
        loadSelectedDestinationActionCreator(destinationMock);

      const newDestinationsState = destinationsReducer(
        currentDestinationsState,
        loadSelectedDestinationAction,
      );

      expect(newDestinationsState.selectedDestination).toStrictEqual(
        destinationMock,
      );
    });
  });
});
