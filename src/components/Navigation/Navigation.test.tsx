import { render, screen } from "@testing-library/react";
import Navigation from "./Navigation";

describe("Given a Navigation component", () => {
  describe("When it is rendered", () => {
    test("Then it should show 'Home' and 'Add' links", () => {
      const expectedHomeText = "Home";
      const expectedAddText = "Add";

      render(<Navigation />);

      const homeLink = screen.getByRole("link", { name: expectedHomeText });
      const addlink = screen.getByRole("link", { name: expectedAddText });

      expect(homeLink).toBeInTheDocument();
      expect(addlink).toBeInTheDocument();
    });
  });
});
