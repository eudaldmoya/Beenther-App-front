import { useNavigate } from "react-router-dom";
import AddDestinationForm from "../../components/AddDestinationForm/AddDestinationForm";
import useDestinationsApi from "../../hook/useDestinationsApi";
import paths from "../../paths/paths";
import { showFeedback } from "../../showFeedbackFunction/showFeedback";
import { useAppDispatch } from "../../store";
import { addDestinationActionCreator } from "../../store/destinations/destinationsSlice";
import { Destination } from "../../types";
import "./AddDestinationPage.css";
import { useEffect } from "react";

const AddDestinationPage = () => {
  const { addDestinationApi } = useDestinationsApi();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Beenther | Add a new destination";
  }, []);

  const actionOnSubmit = async (
    newDestination: Omit<Destination, "_id" | "user">,
  ) => {
    const destination = await addDestinationApi(newDestination);

    dispatch(addDestinationActionCreator(destination));

    showFeedback("Destination created", "success");

    navigate(paths.destinations);
  };

  return (
    <>
      <h1 className="title">Add a new destination</h1>
      <AddDestinationForm actionOnSubmit={actionOnSubmit} />
    </>
  );
};

export default AddDestinationPage;
