import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { useUser, useUsersStore } from "../store/usersStore";
import { useMatchStore } from "../store/matchStore";
import useSettings from "./useSettings";
import { PLAYER_O, PLAYER_X } from "../utils/gameLogic";
import { addResult, getMatchWinner } from "../utils/score";
import { getOpponentName } from "../utils/players";
import { ROUTES } from "../config/routes";

// Ігрова сторінка /users/:userId/game: гравець береться з URL, рахунок — зі стору матчу.
export default function useGamePage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { settings } = useSettings();
  const user = useUser(userId);
  const recordMatch = useUsersStore((state) => state.recordMatch);
  const lastOpponent = useUsersStore((state) => state.lastOpponent);

  const match = useMatchStore(
    useShallow((state) => ({
      userId: state.userId,
      opponentName: state.opponentName,
      score: state.score,
      startMatch: state.startMatch,
      registerRound: state.registerRound,
      markRecorded: state.markRecorded,
      isRecorded: state.isRecorded,
    }))
  );

  // Матч належить цьому гравцю і ще не завершений.
  const isActiveMatch = match.userId === userId && !match.isRecorded;

  const userExists = Boolean(user);

  // Перевіряємо лише при вході на сторінку (або зміні :userId): якщо відкрили /users/:id/game
  // за посиланням чи повернулися "назад" після завершеного матчу — починаємо новий матч.
  // Не реагуємо на isRecorded, інакше щойно завершений матч скинувся б до переходу на результати.
  useEffect(() => {
    const current = useMatchStore.getState();
    if (!userExists || (current.userId === userId && !current.isRecorded)) return;
    current.startMatch(userId, getOpponentName(settings, lastOpponent));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, userExists]);

  const finishRound = useCallback(
    (winner) => {
      const nextScore = addResult(match.score, winner);
      match.registerRound(winner);

      const matchWinner = getMatchWinner(nextScore, settings.roundsToWin);
      if (!matchWinner) return;

      recordMatch(userId, {
        opponent: match.opponentName,
        won: matchWinner === PLAYER_X,
        score: nextScore,
      });
      match.markRecorded();
      navigate(ROUTES.results(userId));
    },
    [match, settings.roundsToWin, recordMatch, userId, navigate]
  );

  const exit = useCallback(() => navigate(ROUTES.user(userId)), [navigate, userId]);

  return {
    user,
    isReady: Boolean(user) && isActiveMatch,
    settings,
    players: user ? { [PLAYER_X]: user.name, [PLAYER_O]: match.opponentName } : null,
    score: match.score,
    finishRound,
    exit,
  };
}
