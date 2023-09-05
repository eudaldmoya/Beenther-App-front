import beentherLogo from "../../assets/beentherLogo.svg";
import logoutIcon from "../../assets/logoutIcon.svg";
import "./Header.css";

const Header = (): React.ReactElement => {
  return (
    <header>
      <div className="title-container">
        <img src={beentherLogo} alt="Beenther logo" />
        <button>
          <img src={logoutIcon} alt="logout icon" />
        </button>
      </div>
      <div className="link-container">
        <span>Home</span>
        <span>Add</span>
      </div>
    </header>
  );
};

export default Header;
