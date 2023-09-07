import { useEffect } from "react";
import { loadDestinationsActionCreator } from "../../store/destinations/destinationsSlice";
import { destinationsMock } from "../../mocks/destinationsMock";
import { useAppDispatch } from "../../store";
import DestinationsList from "../../components/DestinationsList/DestinationsList";
import "./DestinationsPage.css";

const DestinationsPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadDestinationsActionCreator(destinationsMock));
  }, [dispatch]);

  return (
    <main>
      <h1 className="title">Your destinations</h1>
      <section>
        <DestinationsList />
      </section>
    </main>
  );
};

export default DestinationsPage;
