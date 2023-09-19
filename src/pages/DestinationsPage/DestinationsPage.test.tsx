import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { User } from "firebase/auth";
import { Suspense } from "react";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { destinationsMock } from "../../mocks/destinationsMock";
import { DestinationsPagePreview } from "../../paths/lazyPages";
import { setupStore } from "../../store";

describe("Given a DestinationsPage page", () => {
  describe("When it is rendered", () => {
    test("Then it should show 'You have no destinations yet' inside a heading", async () => {
      const title = "You have no destinations yet";
      const store = setupStore({ destinationsState: { destinations: [] } });

      render(
        <BrowserRouter>
          <Provider store={store}>
            <Suspense>
              <DestinationsPagePreview />
            </Suspense>
          </Provider>
          ,
        </BrowserRouter>,
      );

      const heading = await screen.findByRole("heading", { name: title });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When the user clicks on the delete button with id 'louiseId'", () => {
    test("Then it should not show the 'Lake Louise' card", async () => {
      const buttonText = "delete icon";
      const headingText = "Lake Louise";
      const user: Partial<User> = {
        getIdToken: vi.fn().mockResolvedValue("token"),
      };
      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useIdToken = vi.fn().mockReturnValue([user]);
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);
      const store = setupStore({
        destinationsState: { destinations: destinationsMock },
      });

      render(
        <BrowserRouter>
          <Provider store={store}>
            <Suspense>
              <DestinationsPagePreview />
            </Suspense>
          </Provider>
          ,
        </BrowserRouter>,
      );

      const heading = await screen.findByRole("heading", { name: headingText });

      const deleteButton = await screen.findAllByRole("button", {
        name: buttonText,
      });
      await userEvent.click(deleteButton[0]);

      expect(heading).not.toBeInTheDocument();
    });
  });
});
