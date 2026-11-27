import Header from "../../components/Header/Header";
import PlayerCard from "../../components/PlayerCard/PlayerCard";
import GameBoard from "../../components/GameBoard/GameBoard";
import Button from "../../components/Button/Button";
import GameOverDialog from "../../components/GameOverDialog/GameOverDialog";
import useGameRound from "../../hooks/useGameRound";
import { PLAYER_O, PLAYER_X } from "../../utils/gameLogic";
import "./GamePage.css";

export default function GamePage({ settings, players, score, onRoundEnd, onExit }) {
  const { board, currentPlayer, isFinished, status, timer, restartRound, dialog } =
    useGameRound({ settings, players, score, onRoundEnd, onExit });

  return (
    <main className="page game-page">
      <Header />
      <section className="game-content">
        <div className="players">
          {[PLAYER_X, PLAYER_O].map((symbol) => (
            <PlayerCard
              key={symbol}
              name={players[symbol]}
              symbol={symbol}
              wins={score[symbol]}
              active={!isFinished && currentPlayer === symbol}
            />
          ))}
        </div>

        <div className="turn" aria-live="polite">
          <span>{status}</span>
          {timer.enabled && !isFinished && (
            <span className={`turn__timer ${timer.timeLeft <= 3 ? "turn__timer--low" : ""}`}>
              ⏱ {timer.timeLeft} с
            </span>
          )}
        </div>

        <GameBoard {...board} />

        <div className="game-actions">
          <Button variant="secondary" onClick={restartRound} disabled={isFinished}>
            Почати тур заново
          </Button>
          <Button variant="secondary" onClick={onExit}>В меню</Button>
        </div>
      </section>

      <GameOverDialog {...dialog} />
    </main>
  );
}
