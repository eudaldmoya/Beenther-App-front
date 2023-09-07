import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { User } from "firebase/auth";
import authHook, { AuthStateHook } from "react-firebase-hooks/auth";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import App from "./App";

vi.mock("firebase/auth");

describe("Given an App component", () => {
  describe("When the user is not logged in", () => {
    test("Then it should show 'Welcome to Beenther!' inside a heading", () => {
      const headingText = "Welcome to Beenther!";

      const authStateHookMock: Partial<AuthStateHook> = [undefined];

      authHook.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>,
      );

      const heading = screen.getByRole("heading", { name: headingText });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When the user clicks on the login button", () => {
    test("Then it should show 'Your destinations' inside a heading", async () => {
      const buttonText = /sign in github logo/i;
      const headingText = "Your destinations";
      const user: Partial<User> = {
        displayName: "mike",
      };
      const destinationsRoute = "/home";
      const authStateHookMock: Partial<AuthStateHook> = [user as User];

      authHook.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <MemoryRouter initialEntries={[destinationsRoute]}>
          <App />
        </MemoryRouter>,
      );

      const loginButton = screen.getByRole("button", { name: buttonText });
      await userEvent.click(loginButton);

      waitFor(() => {
        const heading = screen.getByRole("heading", { name: headingText });

        expect(heading).toBeInTheDocument();
      });
    });
  });

  describe("When the user is not logged in and it is not loading", () => {
    test("Then it should show 'Welcome to Beenther!' inside a heading", () => {
      const authStateHookMock: Partial<AuthStateHook> = [undefined, undefined];

      authHook.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <MemoryRouter initialEntries={["/destinations"]}>
          <App />
        </MemoryRouter>,
      );

      const heading = screen.getByRole("heading", {
        name: "Welcome to Beenther!",
      });

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
      const destinationsRoute = "/destinations";
      const authStateHookMock: Partial<AuthStateHook> = [user as User];

      authHook.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <MemoryRouter initialEntries={[destinationsRoute]}>
          <App />
        </MemoryRouter>,
      );

      const logoutButton = screen.getByRole("button", { name: buttonText });
      await userEvent.click(logoutButton);

      const heading = await screen.findByRole("heading", { name: headingText });

      expect(heading).toBeInTheDocument();
    });
  });
});
