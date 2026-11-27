import Header from "../../components/Header/Header";
import ResultCard from "../../components/ResultCard/ResultCard";
import Button from "../../components/Button/Button";
import { DRAW, PLAYER_O, PLAYER_X } from "../../utils/gameLogic";
import "./ResultsPage.css";

// Підсумки матчу (показуються, коли хтось набрав потрібну кількість перемог).
export default function ResultsPage({ winner, players, score, onNewMatch, onBackToStart }) {
  return (
    <main className="page results-page">
      <Header />
      <section className="results-content">
        <p className="eyebrow">ПІДСУМКИ МАТЧУ</p>
        <ResultCard
          label="Переможець матчу"
          winner={players[winner]}
          isDraw={!winner}
          scoreX={score[PLAYER_X]}
          scoreO={score[PLAYER_O]}
          draws={score[DRAW]}
        />

        <div className="results-actions">
          <Button onClick={onNewMatch}>Новий матч</Button>
          <Button variant="secondary" onClick={onBackToStart}>На старт</Button>
        </div>
      </section>
    </main>
  );
}
