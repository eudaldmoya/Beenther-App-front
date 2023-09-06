import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { BrowserRouter } from "react-router-dom";

describe("Given a Header component", () => {
  describe("When it is rendered", () => {
    test("Then it should show a logo with alt text 'Beenther logo'", () => {
      const imageAltText = "Beenther logo";

      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>,
      );

      const imageElement = screen.getByAltText(imageAltText);

      expect(imageElement).toBeInTheDocument();
    });

    test("Then it should show a logout icon with alt text 'logout icon'", () => {
      const imageAltText = "logout icon";

      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>,
      );

      const imageElement = screen.getByAltText(imageAltText);

      expect(imageElement).toBeInTheDocument();
    });
  });
});
