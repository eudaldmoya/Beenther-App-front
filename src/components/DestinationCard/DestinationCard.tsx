import { Destination } from "../../types";
import "./DestinationCard.css";
import deleteIcon from "../../assets/deleteIcon.svg";
import { useAppDispatch } from "../../store";
import { deleteDestinationActionCreator } from "../../store/destinations/destinationsSlice";
import useDestinationsApi from "../../hook/useDestinationsApi";
import { NavLink } from "react-router-dom";
import paths from "../../paths/paths";
import Button from "../Button/Button";
import landing from "../../assets/landingIcon.svg";
import takeoff from "../../assets/takeoffIcon.svg";

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard = ({
  destination: { _id, name, horizontalImageUrl, location, country, isVisited },
}: DestinationCardProps) => {
  const dispatch = useAppDispatch();
  const { deleteDestinationApi } = useDestinationsApi();

  const handleDeleteClick = async () => {
    await deleteDestinationApi(_id);

    dispatch(deleteDestinationActionCreator(_id));
  };

  return (
    <article className="card">
      <Button
        className={
          isVisited ? "card__button selected" : "card__button unselected"
        }
      >
        {isVisited ? "Visited" : "Pending"}
        <img
          src={isVisited ? landing : takeoff}
          alt={isVisited ? "Visited" : "Pending"}
        />
      </Button>
      <img
        src={horizontalImageUrl}
        alt={name}
        height="350"
        width="350"
        className="card__image"
      />
      <div className="card__filter"></div>
      <div className="card__info">
        <NavLink to={`${paths.destinations}/${_id}`}>
          <div>
            <h2 className="card__title">{name}</h2>
            <span className="card__location">{`${location}, ${country}`}</span>
          </div>
        </NavLink>
        <button onClick={handleDeleteClick} aria-label="delete-button">
          <img src={deleteIcon} alt="delete icon" height="42" width="42" />
        </button>
      </div>
    </article>
  );
};

export default DestinationCard;
