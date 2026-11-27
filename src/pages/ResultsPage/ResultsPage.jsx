import { Navigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import ResultCard from "../../components/ResultCard/ResultCard";
import Button from "../../components/Button/Button";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import useResultsPage from "../../hooks/useResultsPage";
import styles from "./ResultsPage.module.css";

// Маршрут /users/:userId/results — підсумки щойно завершеного матчу.
export default function ResultsPage() {
  const { user, hasResult, winner, players, score, profileUrl, newMatch } = useResultsPage();

  if (!user) return <NotFoundPage message="Такого гравця не існує." />;
  if (!hasResult) return <Navigate to={profileUrl} replace />;

  return (
    <>
      <PageTitle eyebrow="Підсумки матчу" title={`${players.X} vs ${players.O}`} />
      <ResultCard label="Переможець матчу" winner={players[winner]} score={score} />

      <div className={styles.actions}>
        <Button onClick={newMatch}>Новий матч</Button>
        <Button variant="secondary" to={profileUrl}>Профіль гравця</Button>
      </div>
    </>
  );
}
