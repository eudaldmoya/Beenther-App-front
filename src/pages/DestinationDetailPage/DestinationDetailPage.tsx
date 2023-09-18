import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import deleteIcon from "../../assets/deleteIcon.svg";
import landing from "../../assets/landingIcon.svg";
import takeoff from "../../assets/takeoffIcon.svg";
import Button from "../../components/Button/Button";
import { auth } from "../../firebase";
import useDestinationsApi from "../../hook/useDestinationsApi";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  deleteDestinationActionCreator,
  loadSelectedDestinationActionCreator,
  modifyDestinationActionCreator,
} from "../../store/destinations/destinationsSlice";
import "./DestinationDetailPage.css";
import paths from "../../paths/paths";

const DestinationDetailPage = () => {
  const [user] = useAuthState(auth);
  const { getDestinationByIdApi } = useDestinationsApi();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { destinationId } = useParams();
  const selectedDestination = useAppSelector(
    (state) => state.destinationsState.selectedDestination,
  );
  const { deleteDestinationApi, modifyDestinationApi } = useDestinationsApi();

  const handleDeleteClick = async () => {
    if (selectedDestination) {
      await deleteDestinationApi(selectedDestination._id);

      dispatch(deleteDestinationActionCreator(selectedDestination._id));

      navigate(paths.destinations);
    }
  };

  const handleToggleClick = async () => {
    if (selectedDestination) {
      const modifiedDestination = await modifyDestinationApi(
        selectedDestination._id,
        {
          isVisited: selectedDestination.isVisited,
        },
      );

      dispatch(modifyDestinationActionCreator(modifiedDestination));
    }
  };

  useEffect(() => {
    (async () => {
      if (user && destinationId) {
        const selectedDestinationApi = await getDestinationByIdApi(
          destinationId,
        );

        dispatch(loadSelectedDestinationActionCreator(selectedDestinationApi));
      }
    })();
  }, [destinationId, dispatch, getDestinationByIdApi, user]);

  return (
    <>
      {selectedDestination && (
        <>
          <img
            src={selectedDestination.verticalImageUrl}
            alt={selectedDestination.name}
            className="detail__image"
          />
          <div className="detail__filter"></div>
          <div className="detail">
            <h1 className="detail__title">{selectedDestination.name}</h1>
            <span className="detail__location">{`${selectedDestination.location}, ${selectedDestination.country}`}</span>
            <p className="detail__description">
              {selectedDestination.description}
            </p>
            <div className="detail__actions">
              <Button
                actionOnClick={handleToggleClick}
                className={
                  selectedDestination.isVisited ? " selected" : " unselected"
                }
              >
                {selectedDestination.isVisited ? "Visited" : "Pending"}
                <img
                  src={selectedDestination.isVisited ? landing : takeoff}
                  alt={selectedDestination.isVisited ? "Visited" : "Pending"}
                  width="24"
                  height="24"
                />
              </Button>
              <button onClick={handleDeleteClick} aria-label="delete-button">
                <img
                  src={deleteIcon}
                  alt="delete icon"
                  height="42"
                  width="42"
                />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DestinationDetailPage;
