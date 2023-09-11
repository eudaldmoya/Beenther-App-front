import { render, screen } from "@testing-library/react";
import { Suspense } from "react";
import { Provider } from "react-redux";
import { store } from "../../store";
import { DestinationsPagePreview } from "./DestinationsPage";

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
});
