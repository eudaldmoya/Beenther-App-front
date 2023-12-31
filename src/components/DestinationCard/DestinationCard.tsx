import { NavLink } from "react-router-dom";
import deleteIcon from "../../assets/deleteIcon.svg";
import landing from "../../assets/landingIcon.svg";
import takeoff from "../../assets/takeoffIcon.svg";
import useDestinationsApi from "../../hook/useDestinationsApi";
import paths from "../../paths/paths";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  deleteDestinationActionCreator,
  modifyDestinationActionCreator,
} from "../../store/destinations/destinationsSlice";
import { Destination } from "../../types";
import Button from "../Button/Button";
import "./DestinationCard.css";
import Loading from "../Loading/Loading";
import { setIdLoadingActionCreator } from "../../store/ui/uiSlice";

interface DestinationCardProps {
  destination: Destination;
  isLazy: boolean;
}

const DestinationCard = ({
  destination: { _id, name, horizontalImageUrl, location, country, isVisited },
  isLazy,
}: DestinationCardProps) => {
  const dispatch = useAppDispatch();
  const { deleteDestinationApi, modifyDestinationApi } = useDestinationsApi();
  const isLoading = useAppSelector((state) => state.uiState.isLoading);
  const idLoading = useAppSelector(
    (state) => state.uiState.destinationIdLoading,
  );

  const handleDeleteClick = async () => {
    await deleteDestinationApi(_id);

    dispatch(deleteDestinationActionCreator(_id));
  };

  const handleToggleClick = async () => {
    dispatch(setIdLoadingActionCreator(_id));

    const modifiedDestination = await modifyDestinationApi(_id, isVisited);

    dispatch(modifyDestinationActionCreator(modifiedDestination));
  };

  return (
    <>
      <article className="card">
        <Button
          actionOnClick={handleToggleClick}
          className={
            isVisited ? "card__button selected" : "card__button unselected"
          }
        >
          {isLoading && idLoading === _id ? (
            <Loading className={isVisited ? "inverted-bar" : "bar"} />
          ) : (
            <>
              {isVisited ? "Visited" : "Pending"}
              <img
                src={isVisited ? landing : takeoff}
                alt={isVisited ? "Visited" : "Pending"}
                width="24"
                height="24"
              />
            </>
          )}
        </Button>
        <img
          src={horizontalImageUrl}
          alt={name}
          height="350"
          width="350"
          className="card__image"
          {...(isLazy && { loading: "lazy" })}
        />
        <div className="card__filter"></div>
        <div className="card__info">
          <NavLink to={`${paths.destinations}/${_id}`}>
            <div>
              <h2 className="card__title">{name}</h2>
              <span className="card__location">{`${location}, ${country}`}</span>
            </div>
          </NavLink>
          <button onClick={handleDeleteClick}>
            <img
              src={deleteIcon}
              alt="delete icon"
              height="42"
              width="42"
              className="card__delete-image"
            />
          </button>
        </div>
      </article>
    </>
  );
};

export default DestinationCard;
