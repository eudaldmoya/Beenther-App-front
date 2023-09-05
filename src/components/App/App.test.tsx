import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Given an App component", () => {
  describe("When it is rendered", () => {
    test("Then it should show a link 'Home'", () => {
      const linkText = "Home";

      render(<App />);

      const link = screen.getByRole("link", { name: linkText });

      expect(link).toBeInTheDocument();
    });
  });
});
