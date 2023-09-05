import Button from "../components/Button/Button";
import githubLogo from "../assets/githubLogo.svg";
import "./HomePage.css";
import { signInWithPopup } from "firebase/auth";
import { auth, githubProvider } from "../firebase";

const HomePage = () => {
  const login = async () => {
    await signInWithPopup(auth, githubProvider);
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
