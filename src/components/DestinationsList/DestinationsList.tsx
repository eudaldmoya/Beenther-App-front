import { useAppSelector } from "../../store";

const DestinationsList = () => {
  const destinations = useAppSelector(
    (state) => state.destinationsState.destinations,
  );

  return (
    <ul>
      {destinations.map((destination) => {
        return (
          <li key={destination._id}>
            <h2>{destination.name}</h2>
          </li>
        );
      })}
    </ul>
  );
};

export default DestinationsList;
