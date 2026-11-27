import { useNavigate, useParams } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { useUser } from "../store/usersStore";
import { useMatchStore } from "../store/matchStore";
import { PLAYER_O, PLAYER_X } from "../utils/gameLogic";
import { ROUTES } from "../config/routes";

// Підсумки матчу /users/:userId/results. Переможець береться зі стору матчу,
// тож він не зміниться, навіть якщо після матчу змінити налаштування.
export default function useResultsPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const user = useUser(userId);

  const { matchUserId, opponentName, score, winner, startMatch } = useMatchStore(
    useShallow((state) => ({
      matchUserId: state.userId,
      opponentName: state.opponentName,
      score: state.score,
      winner: state.winner,
      startMatch: state.startMatch,
    }))
  );

  return {
    user,
    // Сторінка має сенс лише після завершеного матчу цього гравця.
    hasResult: Boolean(user) && matchUserId === userId && Boolean(winner),
    winner,
    players: user ? { [PLAYER_X]: user.name, [PLAYER_O]: opponentName } : null,
    score,
    profileUrl: ROUTES.user(userId),
    newMatch: () => {
      startMatch(userId, opponentName);
      navigate(ROUTES.game(userId));
    },
  };
}
