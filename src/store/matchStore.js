import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { EMPTY_SCORE, addResult, getMatchWinner } from "../utils/score";
import { getOpponentName } from "../utils/players";
import { PLAYER_X } from "../utils/gameLogic";
import { useSettingsStore } from "./settingsStore";
import { useUsersStore } from "./usersStore";

const INITIAL_MATCH = {
  userId: null,
  opponentName: "",
  settings: null, // знімок налаштувань на момент старту матчу
  score: EMPTY_SCORE,
  winner: null, // переможець матчу (X/O), коли матч завершено
};

/**
 * Стан поточного матчу (Zustand).
 * Налаштування "заморожуються" при старті: якщо змінити їх посеред матчу,
 * поточний матч догравається за старими правилами.
 * Зберігається в sessionStorage, тож оновлення сторінки /users/:id/game не губить рахунок.
 */
export const useMatchStore = create()(
  devtools(
    persist(
      (set, get) => ({
        ...INITIAL_MATCH,

        startMatch: (userId, opponentInput = "") => {
          const settings = useSettingsStore.getState().settings;
          set(
            {
              ...INITIAL_MATCH,
              userId,
              settings,
              opponentName: getOpponentName(settings, opponentInput),
            },
            false,
            "match/start"
          );
        },

        /**
         * Зараховує тур. Якщо хтось набрав потрібну кількість перемог — завершує матч
         * і записує його в статистику гравця. Повертає переможця матчу або null.
         */
        finishRound: (roundWinner) => {
          const { score, settings, userId, opponentName } = get();
          const nextScore = addResult(score, roundWinner);
          const matchWinner = getMatchWinner(nextScore, settings.roundsToWin);

          set({ score: nextScore, winner: matchWinner }, false, "match/finishRound");

          if (matchWinner) {
            useUsersStore.getState().recordMatch(userId, {
              opponent: opponentName,
              won: matchWinner === PLAYER_X,
              score: nextScore,
            });
          }
          return matchWinner;
        },
      }),
      { name: "ttt-match", storage: createJSONStorage(() => sessionStorage) }
    ),
    { name: "MatchStore" }
  )
);

// Чи є незавершений матч для цього гравця.
export const selectHasActiveMatch = (userId) => (state) =>
  state.userId === userId && state.settings !== null && state.winner === null;
