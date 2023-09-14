import { Destination } from "../../types";

export interface DestinationsState {
  destinations: Destination[];
  selectedDestination?: Destination;
}
