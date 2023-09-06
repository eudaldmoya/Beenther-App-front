import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";
import { BrowserRouter } from "react-router-dom";

describe("Given a homepage component", () => {
  describe("When it is rendered", () => {
    test("Then it should show 'Welcome to Beenther!' inside a heading", () => {
      const title = "Welcome to Beenther!";

      render(
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>,
      );

      const heading = screen.getByRole("heading", { name: title });

      expect(heading).toBeInTheDocument();
    });
  });
});
