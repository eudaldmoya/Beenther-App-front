import { useEffect } from "react";
import { loadDestinationsActionCreator } from "../../store/destinations/destinationsSlice";
import { destinationsmock } from "../../mocks/destinationsMock";
import { useAppDispatch } from "../../store";
import DestinationsList from "../../components/DestinationsList/DestinationsList";

const DestinationsPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadDestinationsActionCreator(destinationsmock));
  }, [dispatch]);

  return (
    <main>
      <h1>Your destinations</h1>
      <section>
        <DestinationsList />
      </section>
    </main>
  );
};

export default DestinationsPage;
