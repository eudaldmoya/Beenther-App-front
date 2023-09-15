import { destinationsMock } from "../../../mocks/destinationsMock";
import {
  destinationsReducer,
  modifyDestinationActionCreator,
} from "../destinationsSlice";
import { DestinationsState } from "../types";

describe("Given a destinationsReducer reducer", () => {
  describe("When it receives a modifyDestination action with 'Lake Louise and a current state with 'Lake Louise' and 'Angkor Wat'", () => {
    test("Then it should return a new state with the destinations and the modified destination 'Lake Louise' with isVisited: true", () => {
      const currentDestinationsState: DestinationsState = {
        destinations: destinationsMock,
      };
      const modifyDestinationAction = modifyDestinationActionCreator({
        ...destinationsMock[0],
        isVisited: true,
      });

      const newDestinationsState = destinationsReducer(
        currentDestinationsState,
        modifyDestinationAction,
      );

      expect(newDestinationsState.destinations[0]).toHaveProperty(
        "isVisited",
        true,
      );
    });
  });

  describe("When it receives a modifyDestination action with 'Lake Louise' and a current state with no destinations", () => {
    test("Then it should return a new state with no destinations", () => {
      const currentDestinationsState: DestinationsState = {
        destinations: [],
      };
      const modifyDestinationAction = modifyDestinationActionCreator({
        ...destinationsMock[0],
        isVisited: true,
      });

      const newDestinationsState = destinationsReducer(
        currentDestinationsState,
        modifyDestinationAction,
      );

      expect(newDestinationsState.destinations).toHaveLength(0);
    });
  });
});
