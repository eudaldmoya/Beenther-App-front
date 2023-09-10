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

const useDestinationsApi = () => {
  const apiBaseUrl = import.meta.env.VITE_DESTINATIONS_API_URL;
  const [user] = useIdToken(auth);
  const dispatch = useAppDispatch();

  const getDestinationsApi = useCallback(async () => {
    dispatch(showLoadingActionCreator());

    try {
      const token = await user?.getIdToken();

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const { data } = await axios.get<{ destinations: Destination[] }>(
        `${apiBaseUrl}${paths.destinations}`,
        config,
      );

      const { destinations } = data;

      dispatch(hideLoadingActionCreator());

      return destinations;
    } catch {
      dispatch(hideLoadingActionCreator());

      throw new Error("Could not get the destinations");
    }
  }, [apiBaseUrl, dispatch, user]);

  return { getDestinationsApi };
};

export default useDestinationsApi;
