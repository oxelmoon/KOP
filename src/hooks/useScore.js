import { useCallback, useState } from "react";
import { DRAW, PLAYER_O, PLAYER_X } from "../utils/gameLogic";

const EMPTY_SCORE = { [PLAYER_X]: 0, [PLAYER_O]: 0, [DRAW]: 0 };

// Рахунок серії ігор + результат останньої партії (для сторінки результатів).
export default function useScore() {
  const [score, setScore] = useState(EMPTY_SCORE);
  const [lastWinner, setLastWinner] = useState(null);

  const registerResult = useCallback(
    (winner) => {
      setLastWinner(winner);
      setScore((prev) => ({ ...prev, [winner]: (prev[winner] ?? 0) + 1 }));
    },
    [setScore]
  );

  const resetScore = useCallback(() => {
    setScore(EMPTY_SCORE);
    setLastWinner(null);
  }, [setScore]);

  return { score, lastWinner, registerResult, resetScore };
}
