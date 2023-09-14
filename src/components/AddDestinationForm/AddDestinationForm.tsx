import CountrySelect from "./CountrySelect/CountrySelect";
import "./AddDestinationForm.css";
import Button from "../Button/Button";
import { useState, useEffect } from "react";
import { Destination } from "../../types";

interface AddDestinationFormProps {
  actionOnSubmit: (newDestination: Omit<Destination, "_id" | "user">) => void;
}

const AddDestinationForm = ({ actionOnSubmit }: AddDestinationFormProps) => {
  const [newDestination, setNewDestination] = useState<
    Omit<Destination, "_id" | "user">
  >({
    name: "",
    location: "",
    country: "",
    description: "",
    horizontalImageUrl: "",
    verticalImageUrl: "",
    isVisited: false,
  });
  const [disabled, setDisabled] = useState(true);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setNewDestination({
      ...newDestination,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    actionOnSubmit(newDestination);
  };

  useEffect(() => {
    setDisabled(
      !Object.values(newDestination).every((value) => {
        return value.toString().length >= 1;
      }),
    );
  }, [newDestination]);

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="form__label">
          Name:
        </label>
        <input
          type="text"
          id="name"
          className="form__input"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="location" className="form__label">
          Location:
        </label>
        <input
          type="text"
          id="location"
          className="form__input"
          onChange={handleChange}
        />
      </div>
      <div>
        <CountrySelect handleChange={handleChange} />
      </div>
      <div>
        <label htmlFor="description" className="form__label">
          Description:
        </label>
        <textarea
          id="description"
          className="form__textarea"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="horizontalImageUrl" className="form__label">
          Horizontal image url:
        </label>
        <input
          type="url"
          id="horizontalImageUrl"
          className="form__input"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="verticalImageUrl" className="form__label">
          Vertical image url:
        </label>
        <input
          type="url"
          id="verticalImageUrl"
          className="form__input"
          onChange={handleChange}
        />
      </div>
      <div className="form__button-container">
        <Button type="submit" disabled={disabled} className="form__button">
          Add Destination
        </Button>
      </div>
    </form>
  );
};

export default AddDestinationForm;
