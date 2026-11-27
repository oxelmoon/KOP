import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { DRAW, PLAYER_O, PLAYER_X } from "../utils/gameLogic";

const MAX_HISTORY = 10;

const createId = () =>
  globalThis.crypto?.randomUUID?.().slice(0, 8) ?? Math.random().toString(36).slice(2, 10);

export const EMPTY_STATS = {
  matches: 0,
  wins: 0,
  losses: 0,
  roundsWon: 0,
  roundsLost: 0,
  draws: 0,
  lastPlayedAt: null,
};

// Старі записи могли не мати нових полів статистики — доповнюємо нулями.
const normalizeUser = (user) => ({
  history: [],
  ...user,
  stats: { ...EMPTY_STATS, ...user.stats },
});

const updateUser = (users, id, update) =>
  users.map((user) => (user.id === id ? update(user) : user));

/**
 * Стор гравців і їхньої статистики (Zustand).
 * Кожен гравець має id, за яким працюють динамічні маршрути /users/:userId.
 * Дані — у localStorage (persist), дії видно в Redux DevTools як "users/...".
 */
export const useUsersStore = create()(
  devtools(
    persist(
      (set, get) => ({
        users: [],
        lastUserId: null, // останній обраний гравець (для стартової сторінки)
        lastOpponent: "", // останнє введене ім'я суперника в режимі двох гравців

        setLastChoice: (lastUserId, lastOpponent) =>
          set({ lastUserId, lastOpponent }, false, "users/setLastChoice"),

        addUser: (name) => {
          const user = {
            id: createId(),
            name: name.trim(),
            createdAt: new Date().toISOString(),
            stats: EMPTY_STATS,
            history: [],
          };
          set((state) => ({ users: [...state.users, user] }), false, "users/add");
          return user.id;
        },

        removeUser: (id) =>
          set(
            (state) => ({
              users: state.users.filter((user) => user.id !== id),
              lastUserId: state.lastUserId === id ? null : state.lastUserId,
            }),
            false,
            "users/remove"
          ),

        // Записує завершений матч у статистику та історію гравця (гравець завжди X).
        recordMatch: (id, { opponent, won, score }) => {
          const date = new Date().toISOString();
          set(
            (state) => ({
              users: updateUser(state.users, id, (user) => ({
                ...user,
                stats: {
                  matches: user.stats.matches + 1,
                  wins: user.stats.wins + (won ? 1 : 0),
                  losses: user.stats.losses + (won ? 0 : 1),
                  roundsWon: user.stats.roundsWon + score[PLAYER_X],
                  roundsLost: user.stats.roundsLost + score[PLAYER_O],
                  draws: user.stats.draws + score[DRAW],
                  lastPlayedAt: date,
                },
                history: [{ id: createId(), date, opponent, won, score }, ...user.history].slice(
                  0,
                  MAX_HISTORY
                ),
              })),
            }),
            false,
            "users/recordMatch"
          );
        },

        // Обнуляє статистику всіх гравців (самі гравці лишаються).
        resetAllStats: () =>
          set(
            (state) => ({
              users: state.users.map((user) => ({ ...user, stats: EMPTY_STATS, history: [] })),
            }),
            false,
            "users/resetAllStats"
          ),

        isNameTaken: (name) =>
          get().users.some((user) => user.name.toLowerCase() === name.trim().toLowerCase()),
      }),
      {
        name: "ttt-users",
        version: 1,
        migrate: (persisted) => ({
          ...persisted,
          users: (persisted?.users ?? []).map(normalizeUser),
        }),
      }
    ),
    { name: "UsersStore" }
  )
);

// ---- Селектори ----
export const selectUsers = (state) => state.users;
export const selectUserById = (id) => (state) =>
  state.users.find((user) => user.id === id) ?? null;

// Хук одного гравця за id (повертає той самий об'єкт, тож зайвих ререндерів немає).
export const useUser = (id) => useUsersStore(selectUserById(id));
