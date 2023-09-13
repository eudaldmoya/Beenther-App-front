import { lazy } from "react";
import { NavLink } from "react-router-dom";
import paths from "../../paths/paths";
import "./ErrorPage.css";

export const ErrorPagePreview = lazy(() => import("./ErrorPage"));

const ErrorPage = () => {
  return (
    <div className="error">
      <span className="error__code">404</span>
      <span className="error__text">Oh no!</span>
      <h1 className="error__title">Destination not found</h1>
      <NavLink to={paths.home} className="button error__button">
        Back To Homepage
      </NavLink>
    </div>
  );
};

export default ErrorPage;
