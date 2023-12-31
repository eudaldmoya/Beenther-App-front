import { signOut } from "firebase/auth";
import beentherLogo from "../../assets/beentherLogo.svg";
import logoutIcon from "../../assets/logoutIcon.svg";
import { auth } from "../../firebase";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

const Header = (): React.ReactElement => {
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <header className="header">
      <div className="title-container">
        <img src={beentherLogo} alt="Beenther logo" width="130" height="23" />
        <button onClick={logout}>
          <img src={logoutIcon} alt="logout icon" width="22" height="28" />
        </button>
      </div>
      <Navigation />
    </header>
  );
};

export default Header;
