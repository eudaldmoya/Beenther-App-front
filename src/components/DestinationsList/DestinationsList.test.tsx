import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { destinationsMock } from "../../mocks/destinationsMock";
import { setupStore } from "../../store";
import DestinationsList from "./DestinationsList";
import { BrowserRouter } from "react-router-dom";
import auth, { AuthStateHook, IdTokenHook } from "react-firebase-hooks/auth";
import { User } from "firebase/auth";
import userEvent from "@testing-library/user-event";
import { server } from "../../mocks/server";
import { toggleHandler } from "../../mocks/handlers";

const user: Partial<User> = {
  getIdToken: vi.fn().mockResolvedValue("token"),
};

describe("Given a DestinationsList component", () => {
  describe("When it is rendered", () => {
    test("Then it should show a list of headers 'Lake Louise' and 'Angkor Wat'", () => {
      const store = setupStore({
        destinationsState: {
          destinations: [
            { ...destinationsMock[0], isVisited: true },
            destinationsMock[1],
          ],
        },
      });

      render(
        <BrowserRouter>
          <Provider store={store}>
            <DestinationsList />
          </Provider>
          ,
        </BrowserRouter>,
      );

      destinationsMock.forEach((destination) => {
        const heading = screen.getByRole("heading", { name: destination.name });

        expect(heading).toBeInTheDocument();
      });
    });
  });

  describe("When the user clicks on 'Pending' button", () => {
    test("Then it should change its text and show 'Visited'", async () => {
      const store = setupStore({
        destinationsState: {
          destinations: [destinationsMock[0]],
        },
      });
      const buttonText = "Pending Pending";
      const buttonTextToggled = "Visited Visited";

      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const useIdTokenHookMock: Partial<IdTokenHook> = [user as User];
      auth.useIdToken = vi.fn().mockReturnValue(useIdTokenHookMock);

      render(
        <BrowserRouter>
          <Provider store={store}>
            <DestinationsList />
          </Provider>
          ,
        </BrowserRouter>,
      );

      const button = await screen.findByRole("button", { name: buttonText });
      await userEvent.click(button);

      const buttonToggled = await screen.findByRole("button", {
        name: buttonTextToggled,
      });

      expect(buttonToggled).toBeInTheDocument();
    });
  });

  describe("When the user clicks on 'Visited' button", () => {
    test("Then it should change its text and show 'Pending'", async () => {
      server.resetHandlers(...toggleHandler);

      const store = setupStore({
        destinationsState: {
          destinations: [destinationsMock[1]],
        },
      });
      const buttonText = "Visited Visited";
      const buttonTextToggled = "Pending Pending";

      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const useIdTokenHookMock: Partial<IdTokenHook> = [user as User];
      auth.useIdToken = vi.fn().mockReturnValue(useIdTokenHookMock);

      render(
        <BrowserRouter>
          <Provider store={store}>
            <DestinationsList />
          </Provider>
          ,
        </BrowserRouter>,
      );

      const button = await screen.findByRole("button", { name: buttonText });
      await userEvent.click(button);

      const buttonToggled = await screen.findByRole("button", {
        name: buttonTextToggled,
      });

      expect(buttonToggled).toBeInTheDocument();
    });
  });
});
