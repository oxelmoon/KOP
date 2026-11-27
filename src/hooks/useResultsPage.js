import { useNavigate, useParams } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { useUser } from "../store/usersStore";
import { useMatchStore } from "../store/matchStore";
import useSettings from "./useSettings";
import { PLAYER_O, PLAYER_X } from "../utils/gameLogic";
import { getMatchWinner } from "../utils/score";
import { ROUTES } from "../config/routes";

// Підсумки матчу /users/:userId/results.
export default function useResultsPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { settings } = useSettings();
  const user = useUser(userId);

  const { matchUserId, opponentName, score, isRecorded, startMatch } = useMatchStore(
    useShallow((state) => ({
      matchUserId: state.userId,
      opponentName: state.opponentName,
      score: state.score,
      isRecorded: state.isRecorded,
      startMatch: state.startMatch,
    }))
  );

  const winner = getMatchWinner(score, settings.roundsToWin);

  return {
    user,
    // Сторінка має сенс лише після завершеного матчу цього гравця.
    hasResult: Boolean(user) && matchUserId === userId && isRecorded && Boolean(winner),
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
