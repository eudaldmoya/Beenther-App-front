import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { auth } from "../../firebase";
import useDestinationsApi from "../../hook/useDestinationsApi";
import { useAppDispatch, useAppSelector } from "../../store";
import { loadSelectedDestinationActionCreator } from "../../store/destinations/destinationsSlice";

const DestinationDetailPage = () => {
  const [user] = useAuthState(auth);
  const { getDestinationByIdApi } = useDestinationsApi();
  const dispatch = useAppDispatch();
  const { destinationId } = useParams();
  const selectedDestination = useAppSelector(
    (state) => state.destinationsState.selectedDestination,
  );

  useEffect(() => {
    (async () => {
      if (user && destinationId) {
        const selectedDestinationApi = await getDestinationByIdApi(
          destinationId,
        );

        dispatch(loadSelectedDestinationActionCreator(selectedDestinationApi));
      }
    })();
  }, [destinationId, dispatch, getDestinationByIdApi, user]);

  return (
    <>
      <h1 className="title">{selectedDestination?.name}</h1>
    </>
  );
};

export default DestinationDetailPage;
