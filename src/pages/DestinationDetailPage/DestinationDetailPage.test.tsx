import { render, screen } from "@testing-library/react";
import { User } from "firebase/auth";
import { Suspense } from "react";
import auth, { AuthStateHook, IdTokenHook } from "react-firebase-hooks/auth";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { destinationsMock } from "../../mocks/destinationsMock";
import { detailHandlers } from "../../mocks/handlers";
import { server } from "../../mocks/server";
import { setupStore } from "../../store";
import { DestinationDetailPagePreview } from "./DestinationDetailPage";

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
          selectedDestination: destinationsMock[0],
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
});
