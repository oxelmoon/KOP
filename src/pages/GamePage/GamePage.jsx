import PlayerCard from "../../components/PlayerCard/PlayerCard";
import GameBoard from "../../components/GameBoard/GameBoard";
import Button from "../../components/Button/Button";
import GameOverDialog from "../../components/GameOverDialog/GameOverDialog";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import useGamePage from "../../hooks/useGamePage";
import useGameRound from "../../hooks/useGameRound";
import { PLAYER_O, PLAYER_X } from "../../utils/gameLogic";
import cx from "../../utils/cx";
import styles from "./GamePage.module.css";

// Маршрут /users/:userId/game
export default function GamePage() {
  const { user, isReady, ...match } = useGamePage();

  if (!user) return <NotFoundPage message="Такого гравця не існує." />;
  if (!isReady) return null; // матч ініціалізується для цього гравця

  // key: при переході на іншого гравця стан туру створюється з нуля.
  return <GameRound key={user.id} {...match} />;
}

function GameRound({ settings, players, score, finishRound, exit }) {
  const { board, currentPlayer, isFinished, status, timer, restartRound, dialog } = useGameRound({
    settings,
    players,
    score,
    onRoundEnd: finishRound,
    onExit: exit,
  });

  return (
    <>
      <div className={styles.players}>
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

      <div className={styles.turn} aria-live="polite">
        <span>{status}</span>
        {timer.enabled && !isFinished && (
          <span className={cx(styles.timer, timer.timeLeft <= 3 && styles.timerLow)}>
            ⏱ {timer.timeLeft} с
          </span>
        )}
      </div>

      <GameBoard {...board} />

      <div className={styles.actions}>
        <Button variant="secondary" onClick={restartRound} disabled={isFinished}>
          Почати тур заново
        </Button>
        <Button variant="secondary" onClick={exit}>До профілю</Button>
      </div>

      <GameOverDialog {...dialog} />
    </>
  );
}
