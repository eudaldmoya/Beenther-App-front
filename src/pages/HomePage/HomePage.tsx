import { browserPopupRedirectResolver, signInWithPopup } from "firebase/auth";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import githubLogo from "../../assets/githubLogo.svg";
import googleLogo from "../../assets/googleLogo.svg";
import Button from "../../components/Button/Button";
import { auth, githubProvider, googleProvider } from "../../firebase";
import paths from "../../paths/paths";
import "./HomePage.css";

const HomePage = () => {
  const [user] = useAuthState(auth);

  useEffect(() => {
    document.title = "Beenther | Sign in page";
  }, []);

  if (user) {
    return <Navigate to={paths.destinations} />;
  }

  const loginWithGithub = async () => {
    await signInWithPopup(auth, githubProvider, browserPopupRedirectResolver);
  };

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider, browserPopupRedirectResolver);
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
        <Button className="active" actionOnClick={loginWithGithub}>
          Sign in{" "}
          <img src={githubLogo} alt="Github logo" width="20" height="20" />
        </Button>
        <Button className="active" actionOnClick={loginWithGoogle}>
          Sign in{" "}
          <img src={googleLogo} alt="Google logo" width="20" height="20" />
        </Button>
      </div>
    </>
  );
};

export default HomePage;
