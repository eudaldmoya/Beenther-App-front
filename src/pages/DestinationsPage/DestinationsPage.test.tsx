import { render, screen } from "@testing-library/react";
import DestinationsPage from "./DestinationsPage";
import { Provider } from "react-redux";
import { store } from "../../store";

describe("Given a DestinationsPage page", () => {
  describe("When it is rendered", () => {
    test("Then it should show 'Your destinations' inside a heading", () => {
      const title = "Your destinations";

      render(
        <Provider store={store}>
          <DestinationsPage />
        </Provider>,
      );

      const heading = screen.getByRole("heading", { name: title });

      expect(heading).toBeInTheDocument();
    });
  });
});
