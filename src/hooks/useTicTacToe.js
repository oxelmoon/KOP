import { useCallback, useMemo, useState } from "react";
import {
  RESULT_REASONS,
  createEmptyBoard,
  getCurrentPlayer,
  getGameResult,
  getOpponent,
} from "../utils/gameLogic";

/**
 * Стан одного туру: поле, чий хід, результат.
 * roundId змінюється при кожному перезапуску — за ним інші хуки (таймер) розуміють, що почався новий тур.
 */
export default function useTicTacToe({ size = 3, winLength = 3 } = {}) {
  const [board, setBoard] = useState(() => createEmptyBoard(size));
  const [timeoutLoser, setTimeoutLoser] = useState(null);
  const [roundId, setRoundId] = useState(0);

  // Чий хід — похідне значення від поля, окремий стан не потрібен.
  const currentPlayer = getCurrentPlayer(board);

  const result = useMemo(() => {
    if (timeoutLoser) {
      return { winner: getOpponent(timeoutLoser), line: [], reason: RESULT_REASONS.TIMEOUT };
    }
    return getGameResult(board, winLength);
  }, [board, winLength, timeoutLoser]);

  const isFinished = result.winner !== null;

  const makeMove = useCallback(
    (index) => {
      if (isFinished) return;

      setBoard((prev) => {
        if (prev[index] || getGameResult(prev, winLength).winner) return prev;

        const next = [...prev];
        next[index] = getCurrentPlayer(prev);
        return next;
      });
    },
    [isFinished, winLength]
  );

  // Гравець не встиг зробити хід — тур програно.
  const forfeit = useCallback((player) => setTimeoutLoser(player), []);

  const resetGame = useCallback(() => {
    setBoard(createEmptyBoard(size));
    setTimeoutLoser(null);
    setRoundId((id) => id + 1);
  }, [size]);

  return {
    board,
    size,
    roundId,
    moveCount: board.filter(Boolean).length,
    currentPlayer,
    winner: result.winner,
    winningLine: result.line,
    reason: result.reason,
    isFinished,
    makeMove,
    forfeit,
    resetGame,
  };
}
