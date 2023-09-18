import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Given a Footer component", () => {
  describe("When it is rendered", () => {
    test("Then it should show 'Beenther' inside a heading", () => {
      const headingText = "Beenther";

      render(<Footer />);

      const heading = screen.getByRole("heading", { name: headingText });

      expect(heading).toBeInTheDocument();
    });
  });
});
