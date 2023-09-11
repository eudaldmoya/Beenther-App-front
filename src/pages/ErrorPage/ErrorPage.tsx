import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import paths from "../../paths/paths";
import "./ErrorPage.css";

const ErrorPage = () => {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate(paths.home);
  };

  return (
    <div className="error">
      <span className="error__code">404</span>
      <span className="error__text">Oh no!</span>
      <h1 className="error__title">Destination not found</h1>
      <Button actionOnClick={navigateHome} className="error__button">
        Back To Homepage
      </Button>
    </div>
  );
};

export default ErrorPage;
