import axios from "axios";
import { useCallback } from "react";
import { useIdToken } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import paths from "../paths/paths";
import { useAppDispatch } from "../store";
import {
  hideLoadingActionCreator,
  showLoadingActionCreator,
} from "../store/ui/uiSlice";
import { Destination } from "../types";
import { showFeedback } from "../utils/showFeedback";

const useDestinationsApi = () => {
  const apiBaseUrl = import.meta.env.VITE_DESTINATIONS_API_URL;
  const [user] = useIdToken(auth);
  const dispatch = useAppDispatch();

  const getDestinationsApi = useCallback(async () => {
    dispatch(showLoadingActionCreator());

    try {
      if (!user) {
        dispatch(hideLoadingActionCreator());

        throw new Error();
      }

      const token = await user.getIdToken();

      const setConfig = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const { data } = await axios.get<{ destinations: Destination[] }>(
        `${apiBaseUrl}${paths.destinations}`,
        setConfig,
      );

      const { destinations } = data;

      dispatch(hideLoadingActionCreator());

      return destinations;
    } catch {
      dispatch(hideLoadingActionCreator());

      showFeedback("Destinations could not load", false);

      throw new Error("Could not get the destinations");
    }
  }, [apiBaseUrl, dispatch, user]);

  const deleteDestinationApi = useCallback(
    async (id: string) => {
      try {
        if (!user) {
          throw new Error("You are not logged in");
        }

        const token = await user.getIdToken();
        const setConfig = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const { data } = await axios.delete(
          `${apiBaseUrl}${paths.destinations}/${id}`,
          setConfig,
        );

        const { message } = data;

        showFeedback("Destination deleted!", true);

        return message;
      } catch {
        showFeedback("Destination not deleted", false);

        throw new Error("Could not delete the destination");
      }
    },
    [apiBaseUrl, user],
  );

  return { getDestinationsApi, deleteDestinationApi };
};

export default useDestinationsApi;
