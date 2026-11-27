import { useCallback, useState } from "react";
import { EMPTY_SCORE, addResult } from "../utils/score";

// Рахунок поточного матчу (серії турів).
export default function useScore() {
  const [score, setScore] = useState(EMPTY_SCORE);

  const registerResult = useCallback(
    (winner) => setScore((prev) => addResult(prev, winner)),
    []
  );

  const resetScore = useCallback(() => setScore(EMPTY_SCORE), []);

  return { score, registerResult, resetScore };
}
