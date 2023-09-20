import { useAppSelector } from "../../store";
import DestinationCard from "../DestinationCard/DestinationCard";
import "./DestinationsList.css";

const DestinationsList = () => {
  const destinations = useAppSelector(
    (state) => state.destinationsState.destinations,
  );

  return (
    <ul className="destinations-list">
      {destinations.map((destination, destinationPosition) => {
        const isLazy = destinationPosition >= 2;
        const firstPosition = destinationPosition === 0;
        return (
          <li key={destination._id}>
            <DestinationCard
              destination={destination}
              isLazy={isLazy}
              firstPosition={firstPosition}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default DestinationsList;
