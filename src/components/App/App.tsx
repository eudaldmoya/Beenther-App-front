import { Suspense } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Route, Routes } from "react-router-dom";
import { auth } from "../../firebase";
import { DestinationsPagePreview } from "../../pages/DestinationsPage/DestinationsPage";
import { ErrorPagePreview } from "../../pages/ErrorPage/ErrorPage";
import { HomePagePreview } from "../../pages/HomePage/HomePage";
import paths from "../../paths/paths";
import Header from "../Header/Header";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import "./App.css";
import { AddDestinationPagePreview } from "../../pages/AddDestinationPage/AddDestinationPage";
import FeedBack from "../FeedBack/FeedBack";
import { DestinationDetailPagePreview } from "../../pages/DestinationDetailPage/DestinationDetailPage";

const App = (): React.ReactElement => {
  const [user] = useAuthState(auth);

  return (
    <>
      {user && <Header />}
      <FeedBack />
      <main className="main-container">
        <Routes>
          <Route
            path={paths.home}
            element={
              <Suspense>
                <HomePagePreview />
              </Suspense>
            }
          />
          <Route
            path={paths.destinations}
            element={
              <ProtectedRoute>
                <Suspense>
                  <DestinationsPagePreview />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path={paths.add}
            element={
              <ProtectedRoute>
                <Suspense>
                  <AddDestinationPagePreview />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path={paths.detail}
            element={
              <ProtectedRoute>
                <Suspense>
                  <DestinationDetailPagePreview />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path={paths.wrong}
            element={
              <Suspense>
                <ErrorPagePreview />
              </Suspense>
            }
          />
          <Route path={paths.root} element={<Navigate to={paths.home} />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
