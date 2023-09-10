import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import DestinationsList from "../../components/DestinationsList/DestinationsList";
import { auth } from "../../firebase";
import useDestinationsApi from "../../hook/useDestinationsApi";
import { useAppDispatch } from "../../store";
import { loadDestinationsActionCreator } from "../../store/destinations/destinationsSlice";
import "./DestinationsPage.css";

const DestinationsPage = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { getDestinationsApi } = useDestinationsApi();
  const [user] = useAuthState(auth);

  useEffect(() => {
    (async () => {
      if (user) {
        const destinations = await getDestinationsApi();

        dispatch(loadDestinationsActionCreator(destinations));
      }
    })();
  }, [dispatch, getDestinationsApi, user]);

  return (
    <>
      <h1 className="title">Your destinations</h1>
      <DestinationsList />
    </>
  );
};

export default DestinationsPage;
