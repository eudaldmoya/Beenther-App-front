import { render, screen } from "@testing-library/react";
import { Suspense } from "react";
import { Provider } from "react-redux";
import { store } from "../../store";
import { AddDestinationPagePreview } from "./AddDestinationPage";
import { BrowserRouter } from "react-router-dom";

describe("Given an AddDestinationPage page", () => {
  describe("When it is rendered", () => {
    test("Then it should show 'Add a new destination' inside a heading", async () => {
      const title = "Add a new destination";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Suspense>
              <AddDestinationPagePreview />
            </Suspense>
          </BrowserRouter>
        </Provider>,
      );

      const heading = await screen.findByRole("heading", { name: title });

      expect(heading).toBeInTheDocument();
    });
  });
});
