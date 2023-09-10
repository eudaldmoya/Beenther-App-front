import { render, screen } from "@testing-library/react";
import Loading from "./Loading";

describe("Given a Loading component", () => {
  describe("When it is rendered", () => {
    test("Then it should show a loading animation", () => {
      const labelText = "loading";

      render(<Loading />);

      const loading = screen.getByLabelText(labelText);

      expect(loading).toBeInTheDocument();
    });
  });
});
