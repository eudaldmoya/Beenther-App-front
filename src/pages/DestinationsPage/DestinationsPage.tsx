import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import DestinationsList from "../../components/DestinationsList/DestinationsList";
import Loading from "../../components/Loading/Loading";
import { auth } from "../../firebase";
import useDestinationsApi from "../../hook/useDestinationsApi";
import { useAppDispatch, useAppSelector } from "../../store";
import { loadDestinationsActionCreator } from "../../store/destinations/destinationsSlice";
import "./DestinationsPage.css";
import { NavLink } from "react-router-dom";
import paths from "../../paths/paths";

const DestinationsPage = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { getDestinationsApi } = useDestinationsApi();
  const [user] = useAuthState(auth);
  const isLoading = useAppSelector((state) => state.uiState.isLoading);
  const destination = useAppSelector(
    (state) => state.destinationsState.destinations,
  );

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
      {destination.length === 0 && !isLoading ? (
        <>
          <h1 className="title">You have no destinations yet</h1>
          <div className="add-link-container">
            <NavLink to={paths.add} className="button add-link">
              Add Destination
            </NavLink>
          </div>
        </>
      ) : (
        <>
          <h1 className="title">Your destinations</h1>
          {isLoading ? <Loading /> : <DestinationsList />}
        </>
      )}
    </>
  );
};

export default DestinationsPage;
