import paths from "../../paths/paths";
import "./Navigation.css";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="nav">
      <NavLink to={paths.destinations} className="nav__link">
        Destinations
      </NavLink>
      <NavLink to={paths.add} className="nav__link">
        Add
      </NavLink>
    </nav>
  );
};

export default Navigation;
