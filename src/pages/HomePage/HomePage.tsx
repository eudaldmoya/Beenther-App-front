import "./HomePage.css";
import { signInWithPopup } from "firebase/auth";
import Button from "../../components/Button/Button";
import { auth, githubProvider } from "../../firebase";
import githubLogo from "../../assets/githubLogo.svg";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const login = async () => {
    await signInWithPopup(auth, githubProvider);

    navigate("/destinations");
  };

  return (
    <main className="main-container">
      <h1 className="login__title">
        Welcome to <span className="login__title--span">Beenther!</span>
      </h1>
      <h2 className="login__description">
        Save and mark your favorite places in the planet!
      </h2>
      <div className="login__button">
        <Button
          isActive={true}
          isCardButton={false}
          text="Sign In"
          icon={githubLogo}
          actionOnClick={login}
        />
      </div>
    </main>
  );
};

export default HomePage;
