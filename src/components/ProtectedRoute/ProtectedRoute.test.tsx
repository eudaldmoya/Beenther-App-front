import { render, screen } from "@testing-library/react";
import { User } from "firebase/auth";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { BrowserRouter } from "react-router-dom";
import DestinationsPage from "../../pages/DestinationsPage/DestinationsPage";
import ProtectedRoute from "./ProtectedRoute";
import { store } from "../../store";
import { Provider } from "react-redux";

describe("Given a ProtectedRoute component", () => {
  describe("When the user is not logged in", () => {
    test("Then it should not show DestinationsPage title 'Your destinations' inside a heading", () => {
      const user: Partial<User> = {
        displayName: "mike",
      };
      const authStateHookMock: Partial<AuthStateHook> = [user as User];

      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const headingText = "Your destinations";

      render(
        <BrowserRouter>
          <Provider store={store}>
            <ProtectedRoute>
              <DestinationsPage />
            </ProtectedRoute>
          </Provider>
        </BrowserRouter>,
      );

      const heading = screen.getByRole("heading", { name: headingText });

      expect(heading).toBeInTheDocument();
    });
  });
});
