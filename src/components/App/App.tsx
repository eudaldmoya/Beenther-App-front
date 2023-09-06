import { Navigate, Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import "./App.css";
import HomePage from "../../pages/HomePage/HomePage";
import DestinationsPage from "../../pages/DestinationsPage/DestinationsPage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

const App = (): React.ReactElement => {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route
          path="/destinations"
          element={
            <ProtectedRoute>
              <DestinationsPage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="home" />} />
      </Routes>
    </div>
  );
};

export default App;
