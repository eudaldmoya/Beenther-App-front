import { signOut } from "firebase/auth";
import beentherLogo from "../../assets/beentherLogo.svg";
import logoutIcon from "../../assets/logoutIcon.svg";
import Navigation from "../Navigation/Navigation";
import "./Header.css";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Header = (): React.ReactElement => {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);

    navigate("/");
  };

  return (
    <header className="header">
      <div className="title-container">
        <img src={beentherLogo} alt="Beenther logo" />
        <button onClick={logout}>
          <img src={logoutIcon} alt="logout icon" />
        </button>
      </div>
      <Navigation />
    </header>
  );
};

export default Header;
