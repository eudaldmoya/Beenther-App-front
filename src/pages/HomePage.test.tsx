import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";

describe("Given a homepage component", () => {
  describe("When it is rendered", () => {
    test("Then it should show 'Your destinations' inside a heading", () => {
      const title = "Your destinations";

      render(<HomePage />);

      const heading = screen.getByRole("heading", { name: title });

      expect(heading).toBeInTheDocument();
    });
  });
});
