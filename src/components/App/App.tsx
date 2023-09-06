import { Navigate, Route, Routes } from "react-router-dom";
import DestinationsPage from "../../pages/DestinationsPage/DestinationsPage";
import HomePage from "../../pages/HomePage/HomePage";
import Header from "../Header/Header";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import "./App.css";

const App = (): React.ReactElement => {
  return (
    <div className="container">
      <main className="main-container">
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route
            path="/destinations"
            element={
              <ProtectedRoute>
                <Header />
                <DestinationsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="home" />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
