import "./Navigation.css";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="nav">
      <NavLink to="/destinations">Destinations</NavLink>
      <NavLink to="/">Add</NavLink>
    </nav>
  );
};

export default Navigation;
