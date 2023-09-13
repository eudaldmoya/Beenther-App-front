import { render, screen } from "@testing-library/react";
import AddDestinationForm from "./AddDestinationForm";
import userEvent from "@testing-library/user-event";

describe("Given an AddDestinationForm component", () => {
  const nameLabel = "Name:";
  const locationLabel = "Location:";
  const countryLabel = "Country:";
  const descriptionLabel = "Description:";
  const hImageLabel = "Horizontal image url:";
  const vImageLabel = "Vertical image url:";

  describe("When it is rendered", () => {
    test("Then it should show the inputs for name, description, location, country, verticalImageUrl and horizontalImageUrl", () => {
      render(<AddDestinationForm />);

      const nameInput = screen.getByLabelText(nameLabel);
      const locationInput = screen.getByLabelText(locationLabel);
      const countryInput = screen.getByLabelText(countryLabel);
      const descriptionInput = screen.getByLabelText(descriptionLabel);
      const hImageInput = screen.getByLabelText(hImageLabel);
      const vImageInput = screen.getByLabelText(vImageLabel);

      expect(nameInput).toBeInTheDocument();
      expect(locationInput).toBeInTheDocument();
      expect(countryInput).toBeInTheDocument();
      expect(descriptionInput).toBeInTheDocument();
      expect(hImageInput).toBeInTheDocument();
      expect(vImageInput).toBeInTheDocument();
    });
  });

  describe("When the user type 'Angkor Wat', 'Siem Reap', 'Cambodia', 'Nice place', 'himg.png', 'vimg.png'", () => {
    test("Then the input should show 'Angkor Wat', 'Siem Reap', 'Cambodia', 'Nice place', 'https://www.himg.png', 'https://www.vimg.png'", async () => {
      const name = "Angkor Wat";
      const location = "Siem Reap";
      const country = "Cambodia";
      const description = "Nice place";
      const hImageUrl = "https://www.himg.png";
      const vImageUrl = "https://www.vimg.png";

      render(<AddDestinationForm />);

      const nameInput = screen.getByLabelText(nameLabel);
      const locationInput = screen.getByLabelText(locationLabel);
      const countryInput = screen.getByLabelText(countryLabel);
      const descriptionInput = screen.getByLabelText(descriptionLabel);
      const hImageInput = screen.getByLabelText(hImageLabel);
      const vImageInput = screen.getByLabelText(vImageLabel);

      await userEvent.type(nameInput, name);
      await userEvent.type(locationInput, location);
      await userEvent.selectOptions(countryInput, country);
      await userEvent.type(descriptionInput, description);
      await userEvent.type(hImageInput, hImageUrl);
      await userEvent.type(vImageInput, vImageUrl);

      expect(nameInput).toHaveValue(name);
      expect(locationInput).toHaveValue(location);
      expect(countryInput).toHaveValue(country);
      expect(descriptionInput).toHaveValue(description);
      expect(hImageInput).toHaveValue(hImageUrl);
      expect(vImageInput).toHaveValue(vImageUrl);
    });
  });
});
