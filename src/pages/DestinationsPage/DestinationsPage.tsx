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
import "../AddDestinationPage/AddDestinationPage.css";

const DestinationsPage = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { getDestinationsApi } = useDestinationsApi();
  const [user] = useAuthState(auth);
  const isLoading = useAppSelector((state) => state.uiState.isLoading);
  const destinations = useAppSelector(
    (state) => state.destinationsState.destinations,
  );

  const preloadFirstImage = (image: string) => {
    const preloadImageLink = document.createElement("link");
    preloadImageLink.href = image;
    preloadImageLink.rel = "preload";
    preloadImageLink.as = "image";
    document.head.appendChild(preloadImageLink);
  };

  useEffect(() => {
    document.title = "Beenther | Your destinations";

    (async () => {
      if (user) {
        const destinations = await getDestinationsApi();

        dispatch(loadDestinationsActionCreator(destinations));

        if (destinations.length !== 0) {
          preloadFirstImage(destinations[0].horizontalImageUrl);
        }
      }
    })();
  }, [dispatch, getDestinationsApi, user]);

  return (
    <>
      {destinations.length === 0 && !isLoading ? (
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
          {isLoading && destinations.length === 0 ? (
            <Loading className="bar" />
          ) : (
            <DestinationsList />
          )}
        </>
      )}
    </>
  );
};

export default DestinationsPage;
