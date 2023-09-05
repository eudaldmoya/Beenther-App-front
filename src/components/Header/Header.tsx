import beentherLogo from "../../assets/beentherLogo.svg";
import logoutIcon from "../../assets/logoutIcon.svg";
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
      <div className="divider-container"></div>
    </header>
  );
};

export default Header;
