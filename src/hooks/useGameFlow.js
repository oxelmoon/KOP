import { useCallback } from "react";
import useNavigation from "./useNavigation";
import usePlayers from "./usePlayers";
import useScore from "./useScore";

// Поєднує навігацію, гравців і рахунок — App лише рендерить потрібну сторінку.
export default function useGameFlow() {
  const navigation = useNavigation();
  const playersState = usePlayers();
  const scoreState = useScore();

  const { goToStart, goToGame, goToResults } = navigation;
  const { registerResult, resetScore } = scoreState;

  const startGame = useCallback(() => {
    if (!playersState.isValid) return;
    resetScore();
    goToGame();
  }, [playersState.isValid, resetScore, goToGame]);

  const finishGame = useCallback(
    (winner) => {
      registerResult(winner);
      goToResults();
    },
    [registerResult, goToResults]
  );

  const playAgain = goToGame;
  const backToStart = goToStart;

  return {
    page: navigation.page,
    playersState,
    score: scoreState.score,
    lastWinner: scoreState.lastWinner,
    startGame,
    finishGame,
    playAgain,
    backToStart,
  };
}
