import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

describe("Given an App component", () => {
  describe("When it is rendered", () => {
    test("Then it should show a link 'Destinations'", () => {
      const linkText = "Destinations";

      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>,
      );

      const link = screen.getByRole("link", { name: linkText });

      expect(link).toBeInTheDocument();
    });
  });
});
