import { Destination } from "../../types";
import "./DestinationCard.css";
import deleteIcon from "../../assets/deleteIcon.svg";

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard = ({
  destination: { name, horizontalImageUrl, location, country },
}: DestinationCardProps) => {
  return (
    <article className="card">
      <img
        src={horizontalImageUrl}
        alt={name}
        height={350}
        width={350}
        className="card__image"
      />
      <div className="card__filter"></div>
      <div className="card__info">
        <div>
          <h2 className="card__title">{name}</h2>
          <span className="card__location">{`${location}, ${country}`}</span>
        </div>
        <button>
          <img src={deleteIcon} alt="delete icon" height="42" width="42" />
        </button>
      </div>
    </article>
  );
};

export default DestinationCard;
