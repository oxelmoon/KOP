import { useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { selectUsers, useUsersStore } from "../store/usersStore";
import { useResultsTableStore } from "../store/resultsTableStore";
import { selectResultsRows, selectResultsSummary } from "../store/resultsSelectors";
import { formatDate } from "../utils/players";
import { ROUTES } from "../config/routes";

// Уся логіка сторінки "Таблиця результатів" (/users).
export default function useResultsTable() {
  const users = useUsersStore(selectUsers);
  const resetAllStats = useUsersStore((state) => state.resetAllStats);

  const view = useResultsTableStore(
    useShallow((state) => ({
      sortBy: state.sortBy,
      sortDir: state.sortDir,
      query: state.query,
      onlyPlayed: state.onlyPlayed,
      setSort: state.setSort,
      setQuery: state.setQuery,
      toggleOnlyPlayed: state.toggleOnlyPlayed,
      resetView: state.resetView,
    }))
  );
  const { sortBy, sortDir, query, onlyPlayed } = view;

  // Перераховуємо рядки лише коли змінились гравці або параметри вигляду.
  const rows = useMemo(
    () =>
      selectResultsRows(users, { sortBy, sortDir, query, onlyPlayed }).map((row) => ({
        ...row,
        url: ROUTES.user(row.id),
        lastPlayed: row.lastPlayedAt ? formatDate(row.lastPlayedAt) : "—",
      })),
    [users, sortBy, sortDir, query, onlyPlayed]
  );
  const summary = useMemo(() => selectResultsSummary(users), [users]);

  const [isConfirmOpen, setConfirmOpen] = useState(false);

  return {
    rows,
    summary,
    hasUsers: users.length > 0,
    view,
    // aria-sort для заголовка колонки
    getSortState: (key) =>
      sortBy !== key ? "none" : sortDir === "asc" ? "ascending" : "descending",
    confirmReset: {
      isOpen: isConfirmOpen,
      open: () => setConfirmOpen(true),
      close: () => setConfirmOpen(false),
      accept: () => {
        resetAllStats();
        setConfirmOpen(false);
      },
    },
  };
}
