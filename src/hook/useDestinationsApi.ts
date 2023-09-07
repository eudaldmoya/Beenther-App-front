import { useIdToken } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import axios from "axios";
import { Destination } from "../types";

const useDestinationsApi = () => {
  const apiBaseUrl = import.meta.env.VITE_ROBOTS_API_URL;
  const [user] = useIdToken(auth);

  const getDestinationsApi = async () => {
    try {
      const token = user?.getIdToken();

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
      throw new Error("Could not get the robots");
    }
  };

  return { getDestinationsApi };
};

export default useDestinationsApi;
