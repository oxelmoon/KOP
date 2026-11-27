import { useCallback } from "react";
import useNavigation from "./useNavigation";
import usePlayers from "./usePlayers";
import useScore from "./useScore";
import useSettings from "./useSettings";
import describeSettings from "../utils/describeSettings";
import { addResult, getMatchWinner } from "../utils/score";

// Поєднує навігацію, гравців, налаштування і рахунок матчу — App лише рендерить потрібну сторінку.
export default function useGameFlow() {
  const navigation = useNavigation();
  const playersState = usePlayers();
  const { settings } = useSettings();
  const { score, registerResult, resetScore } = useScore();

  const { goToStart, goToSettings, goToGame, goToResults } = navigation;
  const { roundsToWin } = settings;

  const startGame = useCallback(() => {
    if (!playersState.isValid) return;
    resetScore();
    goToGame();
  }, [playersState.isValid, resetScore, goToGame]);

  // Зараховуємо тур; якщо хтось набрав потрібну кількість перемог — показуємо підсумки матчу.
  const finishRound = useCallback(
    (winner) => {
      registerResult(winner);
      if (getMatchWinner(addResult(score, winner), roundsToWin)) goToResults();
    },
    [registerResult, score, roundsToWin, goToResults]
  );

  const newMatch = useCallback(() => {
    resetScore();
    goToGame();
  }, [resetScore, goToGame]);

  return {
    page: navigation.page,
    playersState,
    settings,
    settingsSummary: describeSettings(settings),
    score,
    matchWinner: getMatchWinner(score, roundsToWin),
    startGame,
    finishRound,
    newMatch,
    openSettings: goToSettings,
    backToStart: goToStart,
  };
}
