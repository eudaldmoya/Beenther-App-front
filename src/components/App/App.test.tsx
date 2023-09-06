import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { User } from "firebase/auth";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

vi.mock("firebase/auth");

describe("Given an App component", () => {
  describe("When it is rendered", () => {
    test("Then it should show a link 'Destinations'", () => {
      const linkText = "Destinations";

      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>,
      );

      const link = screen.getByRole("link", { name: linkText });

      expect(link).toBeInTheDocument();
    });
  });

  describe("When the user is not logged in", () => {
    test("Then it should show 'Welcome to Beenther!'", () => {
      const headingText = "Welcome to Beenther!";

      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>,
      );

      const heading = screen.getByRole("heading", { name: headingText });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When the user clicks on the logout button", () => {
    test("Then it should show 'Welcome to Beenther!' inside a heading", async () => {
      const buttonText = "logout icon";
      const headingText = "Welcome to Beenther!";
      const user: Partial<User> = {
        displayName: "mike",
      };
      const authStateHookMock: Partial<AuthStateHook> = [user as User];

      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>,
      );

      const loginButton = screen.getByRole("button", {
        name: "Sign In Sign In icon",
      });
      await userEvent.click(loginButton);

      waitFor(() => {
        const heading = screen.getByRole("heading", {
          name: "Your destinations",
        });

        expect(heading).toBeInTheDocument();
      });

      const logoutButton = screen.getByRole("button", { name: buttonText });
      await userEvent.click(logoutButton);

      waitFor(() => {
        const heading = screen.getByRole("heading", { name: headingText });

        expect(heading).toBeInTheDocument();
      });
    });
  });

  describe("When the user is not logged in and it is not loading", () => {
    test("Then it should show 'Welcome to Beenther!' inside a heading", () => {
      const authStateHookMock: Partial<AuthStateHook> = [undefined, undefined];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>,
      );

      const heading = screen.getByRole("heading", {
        name: "Welcome to Beenther!",
      });

      expect(heading).toBeInTheDocument();
    });
  });
});
