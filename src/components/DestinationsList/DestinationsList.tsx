import { useAppSelector } from "../../store";
import DestinationCard from "../DestinationCard/DestinationCard";

const DestinationsList = () => {
  const destinations = useAppSelector(
    (state) => state.destinationsState.destinations,
  );

  return (
    <ul>
      {destinations.map((destination) => {
        return (
          <li key={destination._id}>
            <DestinationCard destination={destination} />
          </li>
        );
      })}
    </ul>
  );
};

export default DestinationsList;
