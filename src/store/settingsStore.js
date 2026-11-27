import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { DEFAULT_SETTINGS } from "../config/settings";

/**
 * Стор налаштувань гри (Zustand).
 *  - persist  — зберігає налаштування в localStorage;
 *  - devtools — усі дії видно в Redux DevTools під назвами "settings/...".
 */
export const useSettingsStore = create()(
  devtools(
    persist(
      (set) => ({
        settings: DEFAULT_SETTINGS,
        savedAt: null, // коли налаштування востаннє змінювали

        saveSettings: (settings) =>
          set(
            { settings: { ...DEFAULT_SETTINGS, ...settings }, savedAt: new Date().toISOString() },
            false,
            "settings/save"
          ),

        resetSettings: () =>
          set(
            { settings: DEFAULT_SETTINGS, savedAt: new Date().toISOString() },
            false,
            "settings/reset"
          ),
      }),
      {
        name: "ttt-settings-store",
        version: 1,
        // Доповнюємо збережене значеннями за замовчуванням (на випадок нових полів).
        merge: (persisted, current) => ({
          ...current,
          ...persisted,
          settings: { ...DEFAULT_SETTINGS, ...persisted?.settings },
        }),
      }
    ),
    { name: "SettingsStore" }
  )
);

// Селектори: компоненти підписуються лише на потрібну частину стану.
export const selectSettings = (state) => state.settings;
export const selectSaveSettings = (state) => state.saveSettings;
export const selectResetSettings = (state) => state.resetSettings;

// Зручний хук для читання налаштувань.
export const useGameSettings = () => useSettingsStore(selectSettings);
