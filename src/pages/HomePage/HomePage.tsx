import { signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import githubLogo from "../../assets/githubLogo.svg";
import Button from "../../components/Button/Button";
import { auth, githubProvider } from "../../firebase";
import "./HomePage.css";

const HomePage = () => {
  const [user] = useAuthState(auth);

  if (user) {
    return <Navigate to="/destinations" />;
  }

  const login = async () => {
    await signInWithPopup(auth, githubProvider);
  };

  return (
    <>
      <h1 className="login-title">
        Welcome to <span className="login-title-span">Beenther!</span>
      </h1>
      <span className="login-description">
        Save and mark your favorite places in the planet!
      </span>
      <div className="login-button">
        <Button className="active" actionOnClick={login}>
          Sign in{" "}
          <img src={githubLogo} alt="Github logo" width={20} height={20} />
        </Button>
      </div>
    </>
  );
};

export default HomePage;
