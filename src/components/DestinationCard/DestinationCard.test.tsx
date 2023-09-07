import { render, screen } from "@testing-library/react";
import DestinationCard from "./DestinationCard";
import { destinationsMock } from "../../mocks/destinationsMock";

describe("Given a DestinationCard component", () => {
  describe("When it receives a destination with name 'Lake Louise'", () => {
    test("Then it should show 'Lake Louise' inside a heading", () => {
      const text = "Lake Louise";

      render(<DestinationCard destination={destinationsMock[0]} />);

      const heading = screen.getByRole("heading", { name: text });

      expect(heading).toBeInTheDocument();
    });

    test("Then it should show an image with alt text 'Lake Louise'", () => {
      const altText = "Lake Louise";

      render(<DestinationCard destination={destinationsMock[0]} />);

      const image = screen.getByAltText(altText);

      expect(image).toBeInTheDocument();
    });
  });
});
