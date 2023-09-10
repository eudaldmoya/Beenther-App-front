import { useIdToken } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import axios from "axios";
import { Destination } from "../types";
import { useCallback } from "react";

const useDestinationsApi = () => {
  const apiBaseUrl = import.meta.env.VITE_DESTINATIONS_API_URL;
  const [user] = useIdToken(auth);

  const getDestinationsApi = useCallback(async () => {
    try {
      const token = await user?.getIdToken();

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const { data } = await axios.get<{ destinations: Destination[] }>(
        `${apiBaseUrl}/destinations`,
        config,
      );

      const { destinations } = data;

      return destinations;
    } catch {
      throw new Error("Could not get the destinations");
    }
  }, [apiBaseUrl, user]);

  return { getDestinationsApi };
};

export default useDestinationsApi;
