import { renderHook } from "@testing-library/react";
import { User } from "firebase/auth";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { server } from "../mocks/server";
import useDestinationsApi from "./useDestinationsApi";
import { destinationsMock } from "../mocks/destinationsMock";
import { errorHandlers } from "../mocks/handlers";
import { PropsWithChildren } from "react";
import { setupStore } from "../store";
import { Provider } from "react-redux";

beforeEach(() => {
  vi.clearAllMocks();
});

const user: Partial<User> = {
  getIdToken: vi.fn().mockResolvedValue("token"),
};

const authStateHookMock: Partial<AuthStateHook> = [user as User];
auth.useIdToken = vi.fn().mockReturnValue([user]);
auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

const wrapper = ({ children }: PropsWithChildren): React.ReactElement => {
  const store = setupStore({
    uiState: { isLoading: false },
    destinationsState: { destinations: destinationsMock },
  });

  return <Provider store={store}>{children}</Provider>;
};

describe("Given a useDestinationsApi custom hook", () => {
  describe("When calling a getDestinationsApi function", async () => {
    const { result } = renderHook(async () => await useDestinationsApi(), {
      wrapper,
    });
    const { getDestinationsApi } = await result.current;

    test("Then it should return a list of destinations", async () => {
      const destinations = await getDestinationsApi();

      expect(destinations).toStrictEqual(destinationsMock);
    });

    test("Then it should throw an error 'Could not get the destinations'", () => {
      server.resetHandlers(...errorHandlers);

      const error = new Error("Could not get the destinations");

      const destinations = getDestinationsApi();

      expect(destinations).rejects.toThrowError(error);
    });
  });

  describe("When calling a deleteDestination function with louiseId", async () => {
    const { result } = renderHook(async () => await useDestinationsApi(), {
      wrapper,
    });
    const { deleteDestinationApi } = await result.current;

    test("Then it should return a message 'Destination deleted successfully'", async () => {
      const expectedMessage = "Destination deleted successfully";
      const id = "louiseId";
      const message = await deleteDestinationApi(id);

      expect(message).toStrictEqual(expectedMessage);
    });

    test("Then it should throw an error 'Could not delete the destination'", () => {
      server.resetHandlers(...errorHandlers);

      const id = "louiseId";
      const error = new Error("Could not delete the destination");

      const message = deleteDestinationApi(id);

      expect(message).rejects.toThrowError(error);
    });
  });
});
