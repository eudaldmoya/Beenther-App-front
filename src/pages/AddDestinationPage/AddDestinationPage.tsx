import { lazy } from "react";
import AddDestinationForm from "../../components/AddDestinationForm/AddDestinationForm";
import FeedBack from "../../components/FeedBack/FeedBack";
import "./AddDestinationPage.css";
import useDestinationsApi from "../../hook/useDestinationsApi";
import { Destination } from "../../types";
import { useAppDispatch } from "../../store";
import { addDestinationActionCreator } from "../../store/destinations/destinationsSlice";

export const AddDestinationPagePreview = lazy(
  () => import("./AddDestinationPage"),
);

const AddDestinationPage = () => {
  const { addDestinationApi } = useDestinationsApi();
  const dispatch = useAppDispatch();

  const actionOnSubmit = async (
    newDestination: Omit<Destination, "_id" | "user">,
  ) => {
    const destination = await addDestinationApi(newDestination);

    dispatch(addDestinationActionCreator(destination));
  };

  return (
    <>
      <FeedBack />
      <h1 className="title">Add a new destination</h1>
      <AddDestinationForm actionOnSubmit={actionOnSubmit} />
    </>
  );
};

export default AddDestinationPage;
