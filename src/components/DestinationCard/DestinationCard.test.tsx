import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { destinationsMock } from "../../mocks/destinationsMock";
import { store } from "../../store";
import DestinationCard from "./DestinationCard";

describe("Given a DestinationCard component", () => {
  describe("When it receives a destination with name 'Lake Louise'", () => {
    test("Then it should show 'Lake Louise' inside a heading", () => {
      const text = "Lake Louise";

      render(
        <BrowserRouter>
          <Provider store={store}>
            <DestinationCard
              destination={{ ...destinationsMock[0], isVisited: true }}
              isLazy={false}
            />
          </Provider>
          ,
        </BrowserRouter>,
      );
      screen.debug();
      const heading = screen.getByRole("heading", { name: text });

      expect(heading).toBeInTheDocument();
    });

    test("Then it should show an image with alt text 'Lake Louise'", () => {
      const altText = "Lake Louise";

      render(
        <BrowserRouter>
          <Provider store={store}>
            <DestinationCard destination={destinationsMock[0]} isLazy={false} />{" "}
          </Provider>
          ,
        </BrowserRouter>,
      );

      const image = screen.getByAltText(altText);

      expect(image).toBeInTheDocument();
    });
  });
});
