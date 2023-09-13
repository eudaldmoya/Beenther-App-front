import CountrySelect from "./CountrySelect/CountrySelect";
import "./AddDestinationForm.css";
import Button from "../Button/Button";

const AddDestinationForm = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="form__label">
          Name:
        </label>
        <input type="text" id="name" className="form__input" />
      </div>
      <div>
        <label htmlFor="location" className="form__label">
          Location:
        </label>
        <input type="text" id="location" className="form__input" />
      </div>
      <div>
        <CountrySelect />
      </div>
      <div>
        <label htmlFor="description" className="form__label">
          Description:
        </label>
        <textarea id="description" className="form__textarea" />
      </div>
      <div>
        <label htmlFor="horizontalImageUrl" className="form__label">
          Horizontal image url:
        </label>
        <input type="text" id="horizontalImageUrl" className="form__input" />
      </div>
      <div>
        <label htmlFor="verticalImageUrl" className="form__label">
          Vertical image url:
        </label>
        <input type="text" id="verticalImageUrl" className="form__input" />
      </div>
      <div className="form__button-container">
        <Button type="submit" className="form__button">
          Add Destination
        </Button>
      </div>
    </form>
  );
};

export default AddDestinationForm;
