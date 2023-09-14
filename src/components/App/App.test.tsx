import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Auth, User, signInWithPopup, signOut } from "firebase/auth";
import auth, { AuthStateHook, IdTokenHook } from "react-firebase-hooks/auth";
import { Provider } from "react-redux";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { destinationsMock } from "../../mocks/destinationsMock";
import { formHandlers } from "../../mocks/handlers";
import { server } from "../../mocks/server";
import { setupStore, store } from "../../store";
import App from "./App";

beforeEach(() => {
  vi.clearAllMocks();
});

vi.mock("firebase/auth", async () => {
  const actual: Auth = await vi.importActual("firebase/auth");
  return {
    ...actual,
    signInWithPopup: vi.fn(),
    signOut: vi.fn(),
  };
});

const user: Partial<User> = {
  getIdToken: vi.fn().mockResolvedValue("token"),
};

describe("Given an App component", () => {
  describe("When the user is not logged in", () => {
    test("Then it should show 'Welcome to Beenther!' inside a heading", async () => {
      const headingText = "Welcome to Beenther!";

      const authStateHookMock: Partial<AuthStateHook> = [undefined];

      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>,
      );

      const heading = await screen.findByRole("heading", { name: headingText });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When the user clicks on the login button", () => {
    test("Then the login function should be called", async () => {
      const buttonText = /sign in github logo/i;
      const homeRoute = "/home";

      render(
        <MemoryRouter initialEntries={[homeRoute]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
      );

      const loginButton = await screen.findByRole("button", {
        name: buttonText,
      });
      await userEvent.click(loginButton);

      expect(signInWithPopup).toHaveBeenCalled();
    });
  });

  describe("When the user clicks on the logout button", () => {
    test("Then it should show 'Welcome to Beenther!' inside a heading", async () => {
      const buttonText = "logout icon";
      const destinationsRoute = "/destinations";

      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const useIdTokenHookMock: Partial<IdTokenHook> = [user as User];
      auth.useIdToken = vi.fn().mockReturnValue(useIdTokenHookMock);

      render(
        <MemoryRouter initialEntries={[destinationsRoute]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
      );

      const logoutButton = screen.getByRole("button", { name: buttonText });
      await userEvent.click(logoutButton);

      expect(signOut).toHaveBeenCalled();
    });
  });

  describe("When the user is not logged in and it is not loading", () => {
    test("Then it should show 'Welcome to Beenther!' inside a heading", async () => {
      const authStateHookMock: Partial<AuthStateHook> = [undefined, undefined];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <MemoryRouter initialEntries={["/destinations"]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
      );

      const heading = await screen.findByRole("heading", {
        name: "Welcome to Beenther!",
      });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When the user is logged in", () => {
    test("Then it should show 'Your destinations' inside a heading", async () => {
      const homeRoute = "/home";
      const headingText = "Your destinations";
      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const useIdTokenHookMock: Partial<IdTokenHook> = [user as User];
      auth.useIdToken = vi.fn().mockReturnValue(useIdTokenHookMock);

      render(
        <MemoryRouter initialEntries={[homeRoute]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
      );

      const heading = await screen.findByRole("heading", {
        name: headingText,
      });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When the route is incorrect and the user clicks on 'Back To Homepage' button", () => {
    test("Then it should show 'Welcome to Beenther!' inside a heading", async () => {
      const headingText = "Welcome to Beenther!";
      const buttonText = "Back To Homepage";
      const incorrectPath = "/queque";

      const authStateHookMock: Partial<AuthStateHook> = [undefined, undefined];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <MemoryRouter initialEntries={[incorrectPath]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
      );

      const button = await screen.findByRole("link", { name: buttonText });
      await userEvent.click(button);

      const heading = await screen.findByRole("heading", {
        name: headingText,
      });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When the user creates a destination 'Nuuk' in the AddDestinationPage", () => {
    test("Then it should show the DestinationsPage with 'Nuuk' inside a heading", async () => {
      server.resetHandlers(...formHandlers);

      const nameLabel = "Name:";
      const locationLabel = "Location:";
      const countryLabel = "Country:";
      const descriptionLabel = "Description:";
      const hImageLabel = "Horizontal image url:";
      const vImageLabel = "Vertical image url:";

      const name = "Nuuk";
      const location = "Somewhere";
      const country = "Greenland";
      const description = "Nice place";
      const hImageUrl = "https://www.himg.png";
      const vImageUrl = "https://www.vimg.png";

      const store = setupStore({
        destinationsState: { destinations: destinationsMock },
      });

      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const useIdTokenHookMock: Partial<IdTokenHook> = [user as User];
      auth.useIdToken = vi.fn().mockReturnValue(useIdTokenHookMock);

      const addRoute = "/add";
      const buttonText = "Add Destination";
      const headingText = "Nuuk";

      render(
        <MemoryRouter initialEntries={[addRoute]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
      );

      const nameInput = await screen.findByLabelText(nameLabel);
      const locationInput = await screen.findByLabelText(locationLabel);
      const countryInput = await screen.findByLabelText(countryLabel);
      const descriptionInput = await screen.findByLabelText(descriptionLabel);
      const hImageInput = await screen.findByLabelText(hImageLabel);
      const vImageInput = await screen.findByLabelText(vImageLabel);

      await userEvent.type(nameInput, name);
      await userEvent.type(locationInput, location);
      await userEvent.selectOptions(countryInput, country);
      await userEvent.type(descriptionInput, description);
      await userEvent.type(hImageInput, hImageUrl);
      await userEvent.type(vImageInput, vImageUrl);

      const button = await screen.findByRole("button", { name: buttonText });
      await userEvent.click(button);

      await waitFor(async () => {
        const heading = await screen.findByRole("heading", {
          name: headingText,
        });

        expect(heading).toBeInTheDocument();
      });
    });
  });
});
