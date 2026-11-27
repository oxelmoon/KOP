import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { EMPTY_SCORE, addResult } from "../utils/score";

/**
 * Стан поточного матчу: чий матч, з ким і який рахунок.
 * Зберігається в sessionStorage, тож оновлення сторінки /users/:id/game не губить рахунок.
 */
export const useMatchStore = create(
  persist(
    (set) => ({
      userId: null,
      opponentName: "",
      score: EMPTY_SCORE,
      isRecorded: false, // чи вже записали завершений матч у статистику гравця

      startMatch: (userId, opponentName) =>
        set({ userId, opponentName, score: EMPTY_SCORE, isRecorded: false }),

      registerRound: (winner) => set((state) => ({ score: addResult(state.score, winner) })),

      markRecorded: () => set({ isRecorded: true }),
    }),
    { name: "ttt-match", storage: createJSONStorage(() => sessionStorage) }
  )
);
