import { useEffect } from "react";
import { loadDestinationsActionCreator } from "../../store/destinations/destinationsSlice";
import { destinationsmock } from "../../mocks/destinationsMock";
import { useAppDispatch } from "../../store";

const DestinationsPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadDestinationsActionCreator(destinationsmock));
  }, [dispatch]);

  return (
    <main>
      <h1>Your destinations</h1>
    </main>
  );
};

export default DestinationsPage;
