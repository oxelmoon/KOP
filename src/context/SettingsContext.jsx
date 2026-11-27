import { createContext, useCallback, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { DEFAULT_SETTINGS } from "../config/settings";

export const SettingsContext = createContext(null);

// Налаштування доступні з будь-якої сторінки через контекст і зберігаються в localStorage.
export function SettingsProvider({ children }) {
  const [stored, setStored] = useLocalStorage("ttt-settings", DEFAULT_SETTINGS);

  // Доповнюємо збережене значеннями за замовчуванням (на випадок нових полів).
  const settings = useMemo(() => ({ ...DEFAULT_SETTINGS, ...stored }), [stored]);

  const saveSettings = useCallback((next) => setStored(next), [setStored]);
  const resetSettings = useCallback(() => setStored(DEFAULT_SETTINGS), [setStored]);

  const value = useMemo(
    () => ({ settings, saveSettings, resetSettings }),
    [settings, saveSettings, resetSettings]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}
