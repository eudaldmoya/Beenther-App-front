import FeedBack from "../../components/FeedBack/FeedBack";
import "./AddDestinationPage.css";
import { lazy } from "react";

export const AddDestinationPagePreview = lazy(
  () => import("./AddDestinationPage"),
);

const AddDestinationPage = () => {
  return (
    <>
      <FeedBack />
      <h1 className="title">Add a new destination</h1>
    </>
  );
};

export default AddDestinationPage;
