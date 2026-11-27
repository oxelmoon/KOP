import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const SORT_KEYS = {
  NAME: "name",
  MATCHES: "matches",
  WINS: "wins",
  LOSSES: "losses",
  WIN_RATE: "winRate",
  ROUNDS: "roundDiff",
  LAST_PLAYED: "lastPlayedAt",
};

// Для імен логічніше А→Я, для чисел і дат — від більшого до меншого.
const DEFAULT_DIRECTION = { [SORT_KEYS.NAME]: "asc" };
const defaultDirection = (key) => DEFAULT_DIRECTION[key] ?? "desc";

const INITIAL_VIEW = {
  sortBy: SORT_KEYS.WINS,
  sortDir: "desc",
  query: "",
  onlyPlayed: false,
};

/**
 * Стан вигляду таблиці результатів: сортування, пошук, фільтр.
 * Сортування та фільтр запам'ятовуються (persist), пошуковий запит — ні.
 */
export const useResultsTableStore = create()(
  devtools(
    persist(
      (set) => ({
        ...INITIAL_VIEW,

        // Клік по тій самій колонці змінює напрямок, по іншій — обирає її.
        setSort: (key) =>
          set(
            (state) =>
              state.sortBy === key
                ? { sortDir: state.sortDir === "asc" ? "desc" : "asc" }
                : { sortBy: key, sortDir: defaultDirection(key) },
            false,
            "resultsTable/setSort"
          ),

        setQuery: (query) => set({ query }, false, "resultsTable/setQuery"),

        toggleOnlyPlayed: () =>
          set((state) => ({ onlyPlayed: !state.onlyPlayed }), false, "resultsTable/toggleOnlyPlayed"),

        resetView: () => set(INITIAL_VIEW, false, "resultsTable/resetView"),
      }),
      {
        name: "ttt-results-table",
        partialize: ({ sortBy, sortDir, onlyPlayed }) => ({ sortBy, sortDir, onlyPlayed }),
      }
    ),
    { name: "ResultsTableStore" }
  )
);
