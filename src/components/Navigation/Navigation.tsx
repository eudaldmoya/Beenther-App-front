import paths from "../../paths/paths";
import "./Navigation.css";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="nav">
      <NavLink to={paths.destinations}>Destinations</NavLink>
      <NavLink to={paths.add}>Add</NavLink>
    </nav>
  );
};

export default Navigation;
