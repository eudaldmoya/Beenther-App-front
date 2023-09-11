import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ErrorPage from "./ErrorPage";

describe("Given an ErrorPage page", () => {
  describe("When it is rendered", () => {
    test("Then it should show 'Destination not found' inside a heading", () => {
      const headingText = "Destination not found";

      render(
        <BrowserRouter>
          <ErrorPage />
        </BrowserRouter>,
      );

      const heading = screen.getByRole("heading", { name: headingText });

      expect(heading).toBeInTheDocument();
    });
  });
});
