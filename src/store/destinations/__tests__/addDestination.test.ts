import {
  destinationMock,
  destinationsMock,
} from "../../../mocks/destinationsMock";
import {
  addDestinationActionCreator,
  destinationsReducer,
} from "../destinationsSlice";
import { DestinationsState } from "../types";

describe("Given a destinationsReducer reducer", () => {
  describe("When it receives an addDestination action with a destination 'Nuuk' and a current state with the destinations 'Lake Louise' and 'Angkor Wat'", () => {
    test("Then it should return a new state with the three destinations", () => {
      const expectedLength = 3;
      const currentDestinationsState: DestinationsState = {
        destinations: destinationsMock,
      };

      const addDestinationAction = addDestinationActionCreator(destinationMock);

      const newDestinationsState = destinationsReducer(
        currentDestinationsState,
        addDestinationAction,
      );

      expect(newDestinationsState.destinations).toContain(destinationMock);
      expect(newDestinationsState.destinations).toHaveLength(expectedLength);
    });
  });

  describe("When it receives an addDestination action with a destination 'Nuuk' and a current state with no destinations", () => {
    test("Then it should return a new state with the new destination", () => {
      const expectedLength = 1;
      const currentDestinationsState: DestinationsState = {
        destinations: [],
      };

      const addDestinationAction = addDestinationActionCreator(destinationMock);

      const newDestinationsState = destinationsReducer(
        currentDestinationsState,
        addDestinationAction,
      );

      expect(newDestinationsState.destinations).toContain(destinationMock);
      expect(newDestinationsState.destinations).toHaveLength(expectedLength);
    });
  });
});
