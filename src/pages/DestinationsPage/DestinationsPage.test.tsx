import { render, screen } from "@testing-library/react";
import DestinationsPage from "./DestinationsPage";

describe("Given a DestinationsPage page", () => {
  describe("When it is rendered", () => {
    test("Then it should show 'Your destinations' inside a heading", () => {
      const title = "Your destinations";

      render(<DestinationsPage />);

      const heading = screen.getByRole("heading", { name: title });

      expect(heading).toBeInTheDocument();
    });
  });
});
