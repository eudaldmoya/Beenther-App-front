import { render, screen } from "@testing-library/react";
import { User } from "firebase/auth";
import { Suspense } from "react";
import auth, { AuthStateHook, IdTokenHook } from "react-firebase-hooks/auth";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { destinationsMock } from "../../mocks/destinationsMock";
import { detailHandlers, toggleHandler } from "../../mocks/handlers";
import { server } from "../../mocks/server";
import { setupStore } from "../../store";
import { DestinationDetailPagePreview } from "../../paths/lazyPages";
import userEvent from "@testing-library/user-event";

const user: Partial<User> = {
  getIdToken: vi.fn().mockResolvedValue("token"),
};

describe("Given a DestinationDetailPage page", () => {
  describe("When it receives an id 'louiseId' and it is rendered", () => {
    test("Then it should show 'Lake Louise' inside a heading", async () => {
      server.resetHandlers(...detailHandlers);
      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const useIdTokenHookMock: Partial<IdTokenHook> = [user as User];
      auth.useIdToken = vi.fn().mockReturnValue(useIdTokenHookMock);

      const store = setupStore({
        destinationsState: {
          destinations: [],
          selectedDestination: { ...destinationsMock[0], isVisited: true },
        },
        uiState: { isLoading: false },
      });
      const path = "/destinations/louiseId";
      const headingText = "Lake Louise";

      render(
        <MemoryRouter initialEntries={[path]}>
          <Routes>
            <Route
              path="/destinations/:destinationId"
              element={
                <Provider store={store}>
                  <Suspense>
                    <DestinationDetailPagePreview />
                  </Suspense>
                </Provider>
              }
            ></Route>
          </Routes>
        </MemoryRouter>,
      );

      const heading = await screen.findByRole("heading", {
        name: headingText,
      });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When the user clicks on the modify destination button with text 'Pending'", () => {
    test("Then it should toggle and show the text 'Visited'", async () => {
      server.resetHandlers(...detailHandlers);
      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const useIdTokenHookMock: Partial<IdTokenHook> = [user as User];
      auth.useIdToken = vi.fn().mockReturnValue(useIdTokenHookMock);

      const store = setupStore({
        destinationsState: {
          destinations: [],
          selectedDestination: destinationsMock[0],
        },
        uiState: { isLoading: false },
      });
      const path = "/destinations/louiseId";
      const expectedButtonText = "Visited Visited";
      const buttonText = "Pending Pending";

      render(
        <MemoryRouter initialEntries={[path]}>
          <Routes>
            <Route
              path="/destinations/:destinationId"
              element={
                <Provider store={store}>
                  <Suspense>
                    <DestinationDetailPagePreview />
                  </Suspense>
                </Provider>
              }
            ></Route>
          </Routes>
        </MemoryRouter>,
      );

      const toggleButton = await screen.findByRole("button", {
        name: buttonText,
      });
      await userEvent.click(toggleButton);

      const button = await screen.findByRole("button", {
        name: expectedButtonText,
      });

      expect(button).toBeInTheDocument();
    });
  });

  describe("When the user clicks on the modify destination button with text 'Visited'", () => {
    test("Then it should toggle and show the text 'Pending'", async () => {
      server.resetHandlers(...toggleHandler);
      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const useIdTokenHookMock: Partial<IdTokenHook> = [user as User];
      auth.useIdToken = vi.fn().mockReturnValue(useIdTokenHookMock);

      const store = setupStore({
        destinationsState: {
          destinations: [],
          selectedDestination: destinationsMock[1],
        },
        uiState: { isLoading: false },
      });
      const path = "/destinations/angkorId";
      const expectedButtonText = "Pending Pending";
      const buttonText = "Visited Visited";

      render(
        <MemoryRouter initialEntries={[path]}>
          <Routes>
            <Route
              path="/destinations/:destinationId"
              element={
                <Provider store={store}>
                  <Suspense>
                    <DestinationDetailPagePreview />
                  </Suspense>
                </Provider>
              }
            ></Route>
          </Routes>
        </MemoryRouter>,
      );

      const toggleButton = await screen.findByRole("button", {
        name: buttonText,
      });
      await userEvent.click(toggleButton);

      const button = await screen.findByRole("button", {
        name: expectedButtonText,
      });

      expect(button).toBeInTheDocument();
    });
  });
});
