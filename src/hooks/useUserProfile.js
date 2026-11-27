import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser, useUsersStore } from "../store/usersStore";
import { useMatchStore } from "../store/matchStore";
import { formatDate, getWinRate } from "../utils/players";
import { PLAYER_O, PLAYER_X } from "../utils/gameLogic";
import { ROUTES } from "../config/routes";

// Профіль гравця /users/:userId: статистика, історія матчів, видалення.
export default function useUserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const user = useUser(userId);
  const removeUser = useUsersStore((state) => state.removeUser);
  const lastOpponent = useUsersStore((state) => state.lastOpponent);
  const startMatch = useMatchStore((state) => state.startMatch);
  const [isConfirmOpen, setConfirmOpen] = useState(false);

  if (!user) return { user: null };

  return {
    user,
    winRate: getWinRate(user.stats),
    history: user.history.map((entry) => ({
      id: entry.id,
      date: formatDate(entry.date),
      opponent: entry.opponent,
      won: entry.won,
      score: `${entry.score[PLAYER_X]} : ${entry.score[PLAYER_O]}`,
    })),
    play: () => {
      startMatch(userId, lastOpponent);
      navigate(ROUTES.game(userId));
    },
    confirm: {
      isOpen: isConfirmOpen,
      open: () => setConfirmOpen(true),
      close: () => setConfirmOpen(false),
      accept: () => {
        setConfirmOpen(false);
        removeUser(userId);
        navigate(ROUTES.USERS, { replace: true });
      },
    },
  };
}
