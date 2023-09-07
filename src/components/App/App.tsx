import { Navigate, Route, Routes } from "react-router-dom";
import DestinationsPage from "../../pages/DestinationsPage/DestinationsPage";
import HomePage from "../../pages/HomePage/HomePage";
import Header from "../Header/Header";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { destinations, home, root } from "../../utils/paths";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const App = (): React.ReactElement => {
  const [user] = useAuthState(auth);

  return (
    <>
      {user && <Header />}
      <main className="main-container">
        <Routes>
          <Route path={home} element={<HomePage />} />
          <Route
            path={destinations}
            element={
              <ProtectedRoute>
                <DestinationsPage />
              </ProtectedRoute>
            }
          />
          <Route path={root} element={<Navigate to="home" />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
