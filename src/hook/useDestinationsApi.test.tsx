import { renderHook } from "@testing-library/react";
import { User } from "firebase/auth";
import auth, { AuthStateHook, IdTokenHook } from "react-firebase-hooks/auth";
import { server } from "../mocks/server";
import useDestinationsApi from "./useDestinationsApi";
import {
  destinationMock,
  destinationsMock,
  sentDestinationMock,
} from "../mocks/destinationsMock";
import { errorHandlers } from "../mocks/handlers";
import { PropsWithChildren } from "react";
import { setupStore } from "../store";
import { Provider } from "react-redux";

beforeEach(() => {
  vi.clearAllMocks();
});

const wrapper = ({ children }: PropsWithChildren): React.ReactElement => {
  const store = setupStore({
    uiState: { isLoading: false },
    destinationsState: { destinations: destinationsMock },
  });

  return <Provider store={store}>{children}</Provider>;
};

describe("Given a useDestinationsApi custom hook", () => {
  describe("When calling a getDestinationsApi function", async () => {
    const user: Partial<User> = {
      getIdToken: vi.fn().mockResolvedValue("token"),
    };

    const authStateHookMock: Partial<AuthStateHook> = [user as User];
    auth.useIdToken = vi.fn().mockReturnValue([user]);
    auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

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

  describe("When calling a getDestinationsApi function without a user", async () => {
    test("Then it should throw an error 'You are not logged in'", async () => {
      const authStateHookMock: Partial<AuthStateHook> = [undefined];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const idTokenHookMock: Partial<IdTokenHook> = [undefined];
      auth.useIdToken = vi.fn().mockReturnValue(idTokenHookMock);

      const error = new Error("Could not get the destinations");

      const { result } = renderHook(async () => await useDestinationsApi(), {
        wrapper,
      });
      const { getDestinationsApi } = await result.current;

      const destinations = getDestinationsApi();

      expect(destinations).rejects.toThrowError(error);
    });
  });

  describe("When calling a deleteDestinationApi function with louiseId", async () => {
    const user: Partial<User> = {
      getIdToken: vi.fn().mockResolvedValue("token"),
    };

    const authStateHookMock: Partial<AuthStateHook> = [user as User];
    auth.useIdToken = vi.fn().mockReturnValue([user]);
    auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

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

  describe("When calling a deleteDestinationApi function without a user", async () => {
    test("Then it should throw an error 'Could not delete the destination'", async () => {
      const authStateHookMock: Partial<AuthStateHook> = [undefined];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const idTokenHookMock: Partial<IdTokenHook> = [undefined];
      auth.useIdToken = vi.fn().mockReturnValue(idTokenHookMock);

      const error = new Error("Could not delete the destination");

      const { result } = renderHook(async () => await useDestinationsApi(), {
        wrapper,
      });
      const { deleteDestinationApi } = await result.current;

      const destinations = deleteDestinationApi("");

      expect(destinations).rejects.toThrowError(error);
    });
  });

  describe("When calling an addDestinationApi function with a destination 'Nuuk'", async () => {
    const user: Partial<User> = {
      getIdToken: vi.fn().mockResolvedValue("token"),
    };

    const authStateHookMock: Partial<AuthStateHook> = [user as User];
    auth.useIdToken = vi.fn().mockReturnValue([user]);
    auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

    const { result } = renderHook(async () => await useDestinationsApi(), {
      wrapper,
    });
    const { addDestinationApi } = await result.current;
    test("Then it should return a new destination 'Nuuk'", async () => {
      const newDestination = await addDestinationApi(sentDestinationMock);

      expect(newDestination).toStrictEqual(destinationMock);
    });

    test("Then it should throw an error 'Could not create the destination'", () => {
      server.resetHandlers(...errorHandlers);

      const error = new Error("Could not create the destination");

      const newDestination = addDestinationApi(sentDestinationMock);

      expect(newDestination).rejects.toThrowError(error);
    });
  });

  describe("When calling an addDestinationApi function without a user", () => {
    test("Then it should throw an error 'Could not create the destination'", async () => {
      const authStateHookMock: Partial<AuthStateHook> = [undefined];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const idTokenHookMock: Partial<IdTokenHook> = [undefined];
      auth.useIdToken = vi.fn().mockReturnValue(idTokenHookMock);

      const error = new Error("Could not create the destination");

      const { result } = renderHook(async () => await useDestinationsApi(), {
        wrapper,
      });
      const { addDestinationApi } = await result.current;

      const newDestination = addDestinationApi(sentDestinationMock);

      expect(newDestination).rejects.toThrowError(error);
    });
  });

  describe("When calling a loadDestinationByIdApi function with id 'louiseId'", async () => {
    const user: Partial<User> = {
      getIdToken: vi.fn().mockResolvedValue("token"),
    };

    const authStateHookMock: Partial<AuthStateHook> = [user as User];
    auth.useIdToken = vi.fn().mockReturnValue([user]);
    auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

    const { result } = renderHook(async () => await useDestinationsApi(), {
      wrapper,
    });
    const { getDestinationByIdApi } = await result.current;

    const id = "louiseId";

    test("Then it should return a destination 'Lake Louise'", async () => {
      const selectedDestination = await getDestinationByIdApi(id);

      expect(selectedDestination).toStrictEqual(destinationsMock[0]);
    });

    test("Then it throw an error 'Could not create the destination'", () => {
      server.resetHandlers(...errorHandlers);

      const error = new Error("Could not get the destination");

      const selectedDestination = getDestinationByIdApi(id);

      expect(selectedDestination).rejects.toThrowError(error);
    });
  });

  describe("When calling an loadDestinationById function without a user", () => {
    test("Then it should throw an error 'Could not get the destination'", async () => {
      const id = "louiseId";
      const authStateHookMock: Partial<AuthStateHook> = [undefined];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const idTokenHookMock: Partial<IdTokenHook> = [undefined];
      auth.useIdToken = vi.fn().mockReturnValue(idTokenHookMock);

      const error = new Error("Could not get the destination");

      const { result } = renderHook(async () => await useDestinationsApi(), {
        wrapper,
      });
      const { getDestinationByIdApi } = await result.current;

      const selectedDestination = getDestinationByIdApi(id);

      expect(selectedDestination).rejects.toThrowError(error);
    });
  });
});
