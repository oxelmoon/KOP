import { useCallback, useEffect, useMemo, useState } from "react";
import { createEmptyBoard, getCurrentPlayer, getGameResult } from "../utils/gameLogic";

const FINISH_DELAY_MS = 900;

/**
 * Стан ігрової сторінки: поле, чий хід, результат.
 * onFinish(winner) викликається один раз після завершення партії
 * (з невеликою затримкою, щоб гравці побачили виграшну лінію).
 */
export default function useTicTacToe({ onFinish } = {}) {
  const [board, setBoard] = useState(createEmptyBoard);

  // Чий хід — похідне значення від поля, окремий стан не потрібен.
  const currentPlayer = getCurrentPlayer(board);
  const { winner, line } = useMemo(() => getGameResult(board), [board]);
  const isFinished = winner !== null;

  const makeMove = useCallback((index) => {
    setBoard((prev) => {
      if (prev[index] || getGameResult(prev).winner) return prev;

      const next = [...prev];
      next[index] = getCurrentPlayer(prev);
      return next;
    });
  }, []);

  const resetGame = useCallback(() => setBoard(createEmptyBoard()), []);

  useEffect(() => {
    if (!isFinished || !onFinish) return;

    const timer = setTimeout(() => onFinish(winner), FINISH_DELAY_MS);
    return () => clearTimeout(timer);
  }, [isFinished, winner, onFinish]);

  return {
    board,
    currentPlayer,
    winner,
    winningLine: line,
    isFinished,
    makeMove,
    resetGame,
  };
}
