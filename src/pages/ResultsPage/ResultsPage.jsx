import Header from "../../components/Header/Header";
import ResultCard from "../../components/ResultCard/ResultCard";
import Button from "../../components/Button/Button";
import { DRAW, PLAYER_O, PLAYER_X } from "../../utils/gameLogic";
import "./ResultsPage.css";

export default function ResultsPage({ winner, players, score, onPlayAgain, onBackToStart }) {
  return (
    <main className="page results-page">
      <Header />
      <section className="results-content">
        <p className="eyebrow">РЕЗУЛЬТАТ</p>
        <ResultCard
          winner={players[winner]}
          isDraw={winner === DRAW}
          scoreX={score[PLAYER_X]}
          scoreO={score[PLAYER_O]}
          draws={score[DRAW]}
        />

        <div className="results-actions">
          <Button onClick={onPlayAgain}>Грати знову</Button>
          <Button variant="secondary" onClick={onBackToStart}>На старт</Button>
        </div>
      </section>
    </main>
  );
}
