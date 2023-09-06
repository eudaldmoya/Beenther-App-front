import { render, screen } from "@testing-library/react";
import { User } from "firebase/auth";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { BrowserRouter } from "react-router-dom";
import DestinationsPage from "../../pages/DestinationsPage/DestinationsPage";
import ProtectedRoute from "./ProtectedRoute";

const user: Partial<User> = {
  displayName: "mike",
};

const authStateHookMock: Partial<AuthStateHook> = [user as User];

describe("Given a ProtectedRoute component", () => {
  describe("When the user is not logged in", () => {
    test("Then it should not show DestinationsPage title 'Your destinations' inside a heading", () => {
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const headingText = "Your destinations";

      render(
        <BrowserRouter>
          <ProtectedRoute>
            <DestinationsPage />
          </ProtectedRoute>
        </BrowserRouter>,
      );

      const heading = screen.getByRole("heading", { name: headingText });

      expect(heading).toBeInTheDocument();
    });
  });
});
