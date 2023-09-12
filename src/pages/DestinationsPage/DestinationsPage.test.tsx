import { render, screen } from "@testing-library/react";
import { Suspense } from "react";
import { Provider } from "react-redux";
import { setupStore, store } from "../../store";
import { DestinationsPagePreview } from "./DestinationsPage";
import userEvent from "@testing-library/user-event";
import { destinationsMock } from "../../mocks/destinationsMock";

describe("Given a DestinationsPage page", () => {
  describe("When it is rendered", () => {
    test("Then it should show 'Your destinations' inside a heading", async () => {
      const title = "Your destinations";

      render(
        <Provider store={store}>
          <Suspense>
            <DestinationsPagePreview />
          </Suspense>
        </Provider>,
      );

      const heading = await screen.findByRole("heading", { name: title });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When the user clicks on the delete button with id 'louiseId'", () => {
    test("Then it should not show the 'Lake Louise' card", async () => {
      const labelText = "delete-button";
      const headingText = "Lake Louise";
      const store = setupStore({
        destinationsState: { destinations: destinationsMock },
      });

      render(
        <Provider store={store}>
          <Suspense>
            <DestinationsPagePreview />
          </Suspense>
        </Provider>,
      );

      const heading = await screen.findByRole("heading", { name: headingText });

      const deleteButton = await screen.findAllByLabelText(labelText);
      await userEvent.click(deleteButton[0]);

      expect(heading).not.toBeInTheDocument();
    });
  });
});
