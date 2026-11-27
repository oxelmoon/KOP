import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import StartPage from "./pages/StartPage/StartPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import UsersPage from "./pages/UsersPage/UsersPage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import GamePage from "./pages/GamePage/GamePage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

// Динамічні маршрути працюють з id гравця: /users/:userId, /users/:userId/game, ...
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <StartPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "users", element: <UsersPage /> },
      { path: "users/:userId", element: <UserProfilePage /> },
      { path: "users/:userId/game", element: <GamePage /> },
      { path: "users/:userId/results", element: <ResultsPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
