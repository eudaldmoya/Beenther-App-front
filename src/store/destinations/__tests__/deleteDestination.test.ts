import { destinationsMock } from "../../../mocks/destinationsMock";
import {
  deleteDestinationActionCreator,
  destinationsReducer,
} from "../destinationsSlice";
import { DestinationsState } from "../types";

describe("Given a destinationsReducer reducer", () => {
  describe("When it receives a deleteDestination action with destinations 'Lake Lousie' and 'Angkor Wat' and an id 'louiseId'", () => {
    test("Then it should return a new state with only the destination 'Angkor Wat'", () => {
      const currentDestinationsState: DestinationsState = {
        destinations: destinationsMock,
      };

      const deleteDestinationAction =
        deleteDestinationActionCreator("louiseId");

      const newDestinationsState = destinationsReducer(
        currentDestinationsState,
        deleteDestinationAction,
      );

      expect(newDestinationsState.destinations).not.toContain(
        destinationsMock[0],
      );
    });
  });

  describe("When it receives a deleteDestination action with destinations 'Lake Lousie' and 'Angkor Wat' and a non existant id", () => {
    test("Then it should return a new state with only the same destinations", () => {
      const currentDestinationsState: DestinationsState = {
        destinations: destinationsMock,
      };

      const deleteDestinationAction = deleteDestinationActionCreator("queque");

      const newDestinationsState = destinationsReducer(
        currentDestinationsState,
        deleteDestinationAction,
      );

      expect(newDestinationsState.destinations).toStrictEqual(destinationsMock);
    });
  });

  describe("When it receives a deleteDestination action with no destinations and an id 'louiseId'", () => {
    test("Then it should return a new state with no destinations", () => {
      const expectedLength = 0;
      const currentDestinationsState: DestinationsState = {
        destinations: [],
      };

      const deleteDestinationAction =
        deleteDestinationActionCreator("louiseId");

      const newDestinationsState = destinationsReducer(
        currentDestinationsState,
        deleteDestinationAction,
      );

      expect(newDestinationsState.destinations).toHaveLength(expectedLength);
    });
  });
});
