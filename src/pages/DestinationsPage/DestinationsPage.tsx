import { lazy, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import DestinationsList from "../../components/DestinationsList/DestinationsList";
import { auth } from "../../firebase";
import useDestinationsApi from "../../hook/useDestinationsApi";
import { useAppDispatch, useAppSelector } from "../../store";
import { loadDestinationsActionCreator } from "../../store/destinations/destinationsSlice";
import "./DestinationsPage.css";
import Loading from "../../components/Loading/Loading";
import FeedBack from "../../components/FeedBack/FeedBack";

export const DestinationsPagePreview = lazy(() => import("./DestinationsPage"));

const DestinationsPage = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { getDestinationsApi } = useDestinationsApi();
  const [user] = useAuthState(auth);
  const isLoading = useAppSelector((state) => state.uiState.isLoading);

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
      <FeedBack />
      <h1 className="title">Your destinations</h1>
      {isLoading ? <Loading /> : <DestinationsList />}
    </>
  );
};

export default DestinationsPage;
