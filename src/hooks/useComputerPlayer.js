import { useEffect } from "react";
import { chooseComputerMove } from "../utils/computerPlayer";

// Коли настає хід комп'ютера — через delay мс він робить хід.
export default function useComputerPlayer({
  enabled,
  bot,
  board,
  currentPlayer,
  isFinished,
  winLength,
  difficulty,
  delay,
  makeMove,
}) {
  const isBotTurn = enabled && !isFinished && currentPlayer === bot;

  useEffect(() => {
    if (!isBotTurn) return;

    const timer = setTimeout(() => {
      const move = chooseComputerMove(board, { winLength, difficulty, bot });
      if (move !== null) makeMove(move);
    }, delay);

    return () => clearTimeout(timer);
  }, [isBotTurn, board, winLength, difficulty, bot, delay, makeMove]);

  return { isBotTurn };
}
