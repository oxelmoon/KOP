import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import { PLAYER_O, PLAYER_X } from "../../utils/gameLogic";
import "./GameOverDialog.css";

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
      <p className="game-over__round">Тур {roundNumber} завершено</p>
      <p className="game-over__message">{message}</p>

      <div className="game-over__score" aria-label="Рахунок матчу">
        <span>X</span>
        <strong>{score[PLAYER_X]} : {score[PLAYER_O]}</strong>
        <span>O</span>
      </div>

      {matchWinnerName && (
        <p className="game-over__match">🏆 {matchWinnerName} виграє матч!</p>
      )}

      <div className="game-over__actions">
        <Button onClick={onNextRound}>
          {matchWinnerName ? "Підсумки матчу" : "Наступний тур"}
        </Button>
        <Button variant="secondary" onClick={onReplay}>Зіграти цей тур заново</Button>
        <button type="button" className="game-over__exit" onClick={onExit}>
          Вийти в меню
        </button>
      </div>
      <p className="game-over__note">Якщо зіграти тур заново, його результат не зарахується.</p>
    </Modal>
  );
}
