import { render, screen } from "@testing-library/react";
import Navigation from "./Navigation";
import { BrowserRouter } from "react-router-dom";

describe("Given a Navigation component", () => {
  describe("When it is rendered", () => {
    test("Then it should show 'Destinations' and 'Add' links", () => {
      const expectedDestinationsText = "Destinations";
      const expectedAddText = "Add";

      render(
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>,
      );

      const destinationsLink = screen.getByRole("link", {
        name: expectedDestinationsText,
      });
      const addlink = screen.getByRole("link", { name: expectedAddText });

      expect(destinationsLink).toBeInTheDocument();
      expect(addlink).toBeInTheDocument();
    });
  });
});
