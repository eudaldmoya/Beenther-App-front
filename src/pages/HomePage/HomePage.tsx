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
    <>
      <h1 className="login__title">
        Welcome to <span className="login__title--span">Beenther!</span>
      </h1>
      <span className="login__description">
        Save and mark your favorite places in the planet!
      </span>
      <div className="login__button">
        <Button className="button active" actionOnClick={login}>
          Sign in <img src={githubLogo} alt="Github logo" />
        </Button>
      </div>
    </>
  );
};

export default HomePage;
