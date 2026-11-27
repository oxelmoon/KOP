import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX_HISTORY = 10;

const createId = () =>
  globalThis.crypto?.randomUUID?.().slice(0, 8) ?? Math.random().toString(36).slice(2, 10);

const EMPTY_STATS = { matches: 0, wins: 0, losses: 0 };

/**
 * Глобальний стор гравців (Zustand + persist у localStorage).
 * Кожен гравець має id, за яким працюють динамічні маршрути /users/:userId.
 */
export const useUsersStore = create(
  persist(
    (set, get) => ({
      users: [],
      lastUserId: null, // останній обраний гравець (для стартової сторінки)
      lastOpponent: "", // останнє введене ім'я суперника в режимі двох гравців

      setLastChoice: (lastUserId, lastOpponent) => set({ lastUserId, lastOpponent }),

      addUser: (name) => {
        const user = {
          id: createId(),
          name: name.trim(),
          createdAt: new Date().toISOString(),
          stats: EMPTY_STATS,
          history: [],
        };
        set((state) => ({ users: [...state.users, user] }));
        return user.id;
      },

      removeUser: (id) =>
        set((state) => ({ users: state.users.filter((user) => user.id !== id) })),

      // Записує завершений матч у статистику та історію гравця.
      recordMatch: (id, { opponent, won, score }) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id !== id
              ? user
              : {
                  ...user,
                  stats: {
                    matches: user.stats.matches + 1,
                    wins: user.stats.wins + (won ? 1 : 0),
                    losses: user.stats.losses + (won ? 0 : 1),
                  },
                  history: [
                    { id: createId(), date: new Date().toISOString(), opponent, won, score },
                    ...user.history,
                  ].slice(0, MAX_HISTORY),
                }
          ),
        })),

      isNameTaken: (name) =>
        get().users.some((user) => user.name.toLowerCase() === name.trim().toLowerCase()),
    }),
    { name: "ttt-users" }
  )
);

// Селектор одного гравця за id (повертає той самий об'єкт, тож зайвих ререндерів немає).
export const useUser = (id) =>
  useUsersStore((state) => state.users.find((user) => user.id === id) ?? null);
