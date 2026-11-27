import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import ScoreBoard from "../ScoreBoard/ScoreBoard";
import styles from "./GameOverDialog.module.css";

// Діалог про завершення туру: результат, рахунок і вибір — наступний тур чи цей заново.
export default function GameOverDialog({
  isOpen,
  title,
  message,
  roundNumber,
  score,
  matchWinnerName,
  onNextRound,
  onReplay,
  onExit,
}) {
  return (
    <Modal isOpen={isOpen} title={title}>
      <p className={styles.round}>Тур {roundNumber} завершено</p>
      <p className={styles.message}>{message}</p>

      <div className={styles.score}>
        <ScoreBoard score={score} showDraws={false} />
      </div>

      {matchWinnerName && <p className={styles.match}>🏆 {matchWinnerName} виграє матч!</p>}

      <div className={styles.actions}>
        <Button onClick={onNextRound}>
          {matchWinnerName ? "Підсумки матчу" : "Наступний тур"}
        </Button>
        <Button variant="secondary" onClick={onReplay}>Зіграти цей тур заново</Button>
        <Button variant="ghost" onClick={onExit}>Вийти до профілю</Button>
      </div>
      <p className={styles.note}>Якщо зіграти тур заново, його результат не зарахується.</p>
    </Modal>
  );
}
