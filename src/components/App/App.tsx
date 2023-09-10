import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Route, Routes } from "react-router-dom";
import { auth } from "../../firebase";
import DestinationsPage from "../../pages/DestinationsPage/DestinationsPage";
import HomePage from "../../pages/HomePage/HomePage";
import paths from "../../paths/paths";
import Header from "../Header/Header";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

const App = (): React.ReactElement => {
  const [user] = useAuthState(auth);

  return (
    <>
      {user && <Header />}
      <main className="main-container">
        <Routes>
          <Route path={paths.home} element={<HomePage />} />
          <Route
            path={paths.destinations}
            element={
              <ProtectedRoute>
                <DestinationsPage />
              </ProtectedRoute>
            }
          />
          <Route path={paths.root} element={<Navigate to={paths.home} />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
