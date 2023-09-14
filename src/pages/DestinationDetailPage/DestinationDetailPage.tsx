import { lazy, useEffect } from "react";
import { useParams } from "react-router-dom";
import useDestinationsApi from "../../hook/useDestinationsApi";
import { useAppDispatch, useAppSelector } from "../../store";
import { loadSelectedDestinationActionCreator } from "../../store/destinations/destinationsSlice";

export const DestinationDetailPagePreview = lazy(
  () => import("./DestinationDetailPage"),
);

const DestinationDetailPage = () => {
  const { getDestinationByIdApi } = useDestinationsApi();
  const dispatch = useAppDispatch();
  const { destinationId } = useParams();
  const selectedDestination = useAppSelector(
    (state) => state.destinationsState.selectedDestination,
  );

  useEffect(() => {
    (async () => {
      const selectedDestination = await getDestinationByIdApi(destinationId!);

      dispatch(loadSelectedDestinationActionCreator(selectedDestination));
    })();
  }, [destinationId, dispatch, getDestinationByIdApi]);

  return (
    <>
      <h1 className="title">{selectedDestination?.name}</h1>
    </>
  );
};

export default DestinationDetailPage;
