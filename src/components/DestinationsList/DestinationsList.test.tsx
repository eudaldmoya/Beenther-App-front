import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { destinationsMock } from "../../mocks/destinationsMock";
import { setupStore } from "../../store";
import DestinationsList from "./DestinationsList";

describe("Given a DestinationsList component", () => {
  describe("When it is rendered", () => {
    test("Then it should show a list of headers 'Lake Louise' and 'Angkor Wat'", () => {
      const store = setupStore({
        destinationsState: { destinations: destinationsMock },
      });

      render(
        <Provider store={store}>
          <DestinationsList />
        </Provider>,
      );

      destinationsMock.forEach((destination) => {
        const heading = screen.getByRole("heading", { name: destination.name });

        expect(heading).toBeInTheDocument();
      });
    });
  });
});
