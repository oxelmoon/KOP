import { useCallback } from "react";
import useTicTacToe from "./useTicTacToe";
import useComputerPlayer from "./useComputerPlayer";
import useTurnTimer from "./useTurnTimer";
import useDelayedFlag from "./useDelayedFlag";
import { BOT_SPEEDS, MODES } from "../config/settings";
import { DRAW, PLAYER_O, RESULT_REASONS, getOpponent } from "../utils/gameLogic";
import { addResult, getMatchWinner, getPlayedRounds } from "../utils/score";

const DIALOG_DELAY_MS = 700; // даємо гравцям побачити виграшну лінію перед діалогом
const BOT = PLAYER_O;

function getDialogText({ winner, reason, players, isPvc }) {
  if (winner === DRAW) {
    return { title: "Нічия", message: "Вільних клітинок не залишилось." };
  }

  if (reason === RESULT_REASONS.TIMEOUT) {
    const loser = getOpponent(winner);
    return {
      title: "Час вийшов",
      message: `${players[loser]} не встигає зробити хід. Перемога: ${players[winner]} (${winner}).`,
    };
  }

  const botWon = isPvc && winner === BOT;
  return {
    title: botWon ? "Поразка" : "Перемога!",
    message: `Тур виграє ${players[winner]} (${winner}).`,
  };
}

/**
 * Уся логіка ігрової сторінки: тур, хід комп'ютера, таймер ходу та діалог завершення.
 * onRoundEnd(winner) — зарахувати тур; onExit — вийти в меню.
 */
export default function useGameRound({ settings, players, score, onRoundEnd, onExit }) {
  const isPvc = settings.mode === MODES.PVC;

  const game = useTicTacToe({ size: settings.boardSize, winLength: settings.winLength });
  const { board, currentPlayer, winner, reason, isFinished, makeMove, forfeit, resetGame } = game;

  const { isBotTurn } = useComputerPlayer({
    enabled: isPvc,
    bot: BOT,
    board,
    currentPlayer,
    isFinished,
    winLength: settings.winLength,
    difficulty: settings.difficulty,
    delay: BOT_SPEEDS[settings.botSpeed],
    makeMove,
  });

  const handleTimeout = useCallback(() => forfeit(currentPlayer), [forfeit, currentPlayer]);

  const timer = useTurnTimer({
    seconds: settings.turnTime,
    turnKey: `${game.roundId}-${game.moveCount}`,
    active: !isFinished && !isBotTurn,
    onExpire: handleTimeout,
  });

  const isDialogOpen = useDelayedFlag(isFinished, DIALOG_DELAY_MS);

  // Рахунок з урахуванням щойно завершеного туру (ще не зарахованого).
  const scoreWithRound = isFinished ? addResult(score, winner) : score;
  const matchWinner = getMatchWinner(scoreWithRound, settings.roundsToWin);

  const nextRound = useCallback(() => {
    onRoundEnd(winner);
    resetGame();
  }, [onRoundEnd, winner, resetGame]);

  let status;
  if (isFinished) status = winner === DRAW ? "Нічия!" : `Переміг: ${players[winner]}`;
  else if (isBotTurn) status = "Комп'ютер думає…";
  else status = `Хід: ${players[currentPlayer]} (${currentPlayer})`;

  return {
    board: {
      board,
      size: game.size,
      winningLine: game.winningLine,
      disabled: isFinished || isBotTurn,
      onCellClick: makeMove,
    },
    currentPlayer,
    isFinished,
    status,
    timer,
    restartRound: resetGame,
    dialog: {
      isOpen: isDialogOpen,
      ...getDialogText({ winner, reason, players, isPvc }),
      roundNumber: getPlayedRounds(score) + 1,
      score: scoreWithRound,
      matchWinnerName: matchWinner ? players[matchWinner] : null,
      onNextRound: nextRound,
      onReplay: resetGame,
      onExit,
    },
  };
}
