import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { useUser, useUsersStore } from "../store/usersStore";
import { selectHasActiveMatch, useMatchStore } from "../store/matchStore";
import { PLAYER_O, PLAYER_X } from "../utils/gameLogic";
import { ROUTES } from "../config/routes";

// Ігрова сторінка /users/:userId/game: гравець береться з URL, рахунок і правила — зі стору матчу.
export default function useGamePage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const user = useUser(userId);
  const userExists = Boolean(user);

  const isActiveMatch = useMatchStore(selectHasActiveMatch(userId));
  const { settings, opponentName, score, finishRound } = useMatchStore(
    useShallow((state) => ({
      settings: state.settings,
      opponentName: state.opponentName,
      score: state.score,
      finishRound: state.finishRound,
    }))
  );

  // Перевіряємо лише при вході на сторінку (або зміні :userId): якщо відкрили /users/:id/game
  // за посиланням чи повернулися "назад" після завершеного матчу — починаємо новий матч.
  // Не реагуємо на завершення матчу, інакше він скинувся б до переходу на результати.
  useEffect(() => {
    if (!userExists || selectHasActiveMatch(userId)(useMatchStore.getState())) return;
    useMatchStore.getState().startMatch(userId, useUsersStore.getState().lastOpponent);
  }, [userId, userExists]);

  const handleRoundEnd = useCallback(
    (roundWinner) => {
      const matchWinner = finishRound(roundWinner);
      if (matchWinner) navigate(ROUTES.results(userId));
    },
    [finishRound, navigate, userId]
  );

  const exit = useCallback(() => navigate(ROUTES.user(userId)), [navigate, userId]);

  return {
    user,
    isReady: userExists && isActiveMatch,
    settings,
    players: user ? { [PLAYER_X]: user.name, [PLAYER_O]: opponentName } : null,
    score,
    finishRound: handleRoundEnd,
    exit,
  };
}
