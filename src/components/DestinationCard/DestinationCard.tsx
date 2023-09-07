import { Destination } from "../../types";
import "./DestinationCard.css";

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
        <h2 className="card__title">{name}</h2>
        <div className="card__location">
          <span>{`${location}, ${country}`}</span>
        </div>
      </div>
    </article>
  );
};

export default DestinationCard;
