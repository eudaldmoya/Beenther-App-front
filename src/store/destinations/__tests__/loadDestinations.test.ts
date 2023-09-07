import { destinationsMock } from "../../../mocks/destinationsMock";
import {
  destinationsReducer,
  loadDestinationsActionCreator,
} from "../destinationsSlice";
import { DestinationsState } from "../types";

describe("Given a destinationsReducer reducer", () => {
  describe("When it receives a loadDestinations action with 2 destinations 'Lake Louise' and 'Angkor Wat'", () => {
    test("Then it should return a new state with the 2 destinations 'Lake Louise' and 'Angkor Wat'", () => {
      const currentDestinationsState: DestinationsState = { destinations: [] };
      const loadDestinationsAction =
        loadDestinationsActionCreator(destinationsMock);

      const newDestinationsState = destinationsReducer(
        currentDestinationsState,
        loadDestinationsAction,
      );

      expect(newDestinationsState.destinations).toStrictEqual(destinationsMock);
    });
  });

  describe("When it receives a loadDestinations action with 0 destinations", () => {
    test("Then it should return a new state with 0 destinations", () => {
      const currentDestinationsState: DestinationsState = { destinations: [] };
      const loadDestinationsAction = loadDestinationsActionCreator([]);

      const newDestinationsState = destinationsReducer(
        currentDestinationsState,
        loadDestinationsAction,
      );

      expect(newDestinationsState.destinations).toStrictEqual([]);
    });
  });

  describe("When it receives a loadDestinations action with 2 destinations 'Lake Louise' and 'Angkor Wat' and a current state with 1 destination", () => {
    test("Then it should return a new state with the 2 destinations 'Lake Louise' and 'Angkor Wat'", () => {
      const currentDestinationsState: DestinationsState = {
        destinations: [destinationsMock[0]],
      };
      const loadDestinationsAction =
        loadDestinationsActionCreator(destinationsMock);

      const newDestinationsState = destinationsReducer(
        currentDestinationsState,
        loadDestinationsAction,
      );

      expect(newDestinationsState.destinations).toStrictEqual(destinationsMock);
    });
  });
});
