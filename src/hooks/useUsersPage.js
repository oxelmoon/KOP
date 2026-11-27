import { useMemo } from "react";
import { useUsersStore } from "../store/usersStore";
import { getWinRate } from "../utils/players";
import { ROUTES } from "../config/routes";

// Список гравців /users, відсортований за кількістю перемог.
export default function useUsersPage() {
  const users = useUsersStore((state) => state.users);

  const rows = useMemo(
    () =>
      [...users]
        .sort((a, b) => b.stats.wins - a.stats.wins || a.name.localeCompare(b.name))
        .map((user) => ({
          id: user.id,
          name: user.name,
          stats: user.stats,
          winRate: getWinRate(user.stats),
          url: ROUTES.user(user.id),
        })),
    [users]
  );

  return { users: rows };
}
