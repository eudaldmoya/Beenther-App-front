import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";

describe("Given a homepage component", () => {
  describe("When it is rendered", () => {
    test("Then it should show 'Welcome to Beenther!' inside a heading", async () => {
      const title = "Welcome to Beenther!";

      render(
        <BrowserRouter>
          <Suspense>
            <HomePage />
          </Suspense>
        </BrowserRouter>,
      );

      const heading = await screen.findByRole("heading", { name: title });

      expect(heading).toBeInTheDocument();
    });
  });
});
