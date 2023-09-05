import beentherLogo from "../../assets/beentherLogo.svg";
import logoutIcon from "../../assets/logoutIcon.svg";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

const Header = (): React.ReactElement => {
  return (
    <header className="header">
      <div className="title-container">
        <img src={beentherLogo} alt="Beenther logo" />
        <button>
          <img src={logoutIcon} alt="logout icon" />
        </button>
      </div>
      <Navigation />
    </header>
  );
};

export default Header;
