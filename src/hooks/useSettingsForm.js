import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useShallow } from "zustand/react/shallow";
import { useSettingsStore } from "../store/settingsStore";
import { useMatchStore } from "../store/matchStore";
import describeSettings from "../utils/describeSettings";
import { settingsSchema } from "../validation/settingsSchema";
import { DEFAULT_SETTINGS, MODES } from "../config/settings";
import { ROUTES } from "../config/routes";

// HTML-інпути віддають рядки — для числових полів перетворюємо на числа ("" лишаємо для валідації).
const toNumber = (value) => (value === "" ? "" : Number(value));

/**
 * Уся логіка форми налаштувань: react-hook-form + yup-схема.
 * Сторінка отримує готові field-пропси й лише рендерить їх.
 */
export default function useSettingsForm() {
  const navigate = useNavigate();
  const { settings, savedAt, saveSettings, resetSettings } = useSettingsStore(
    useShallow((state) => ({
      settings: state.settings,
      savedAt: state.savedAt,
      saveSettings: state.saveSettings,
      resetSettings: state.resetSettings,
    }))
  );
  // Чи є незавершений матч — тоді нові налаштування застосуються лише з наступного.
  const hasActiveMatch = useMatchStore(
    (state) => state.settings !== null && state.winner === null
  );
  const [notice, setNotice] = useState("");
  const goBack = () => navigate(ROUTES.HOME);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm({
    resolver: yupResolver(settingsSchema),
    defaultValues: settings,
    mode: "onChange",
  });

  const mode = watch("mode");
  const boardSize = watch("boardSize");

  const numberField = (name, options = {}) =>
    register(name, { setValueAs: toNumber, ...options });

  const fields = {
    mode: register("mode"),
    difficulty: register("difficulty"),
    botSpeed: register("botSpeed"),
    // Зміна розміру поля перевіряє ще й довжину лінії (вона залежить від розміру).
    boardSize: numberField("boardSize", { deps: ["winLength"] }),
    winLength: numberField("winLength"),
    turnTime: numberField("turnTime"),
    roundsToWin: numberField("roundsToWin"),
  };

  // Зберігаємо в стор і робимо збережені значення новою "чистою" точкою форми.
  const onSubmit = handleSubmit((values) => {
    saveSettings(values);
    reset(values);
    setNotice("Налаштування збережено");
  });

  // Скидаємо і стор, і форму до стандартних значень.
  const resetToDefaults = () => {
    resetSettings();
    reset(DEFAULT_SETTINGS);
    setNotice("Відновлено стандартні налаштування");
  };

  // Повертаємо форму до збережених у сторі значень.
  const discardChanges = () => {
    reset(settings);
    setNotice("");
  };

  return {
    fields,
    errors,
    onSubmit,
    resetToDefaults,
    goBack,
    discardChanges,
    notice: isDirty ? "" : notice,
    savedAt: savedAt
      ? new Date(savedAt).toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" })
      : null,
    currentSummary: describeSettings(settings),
    hasActiveMatch,
    isPvc: mode === MODES.PVC,
    maxWinLength: Number(boardSize) || DEFAULT_SETTINGS.boardSize,
    canSave: isValid && isDirty,
    isDirty,
  };
}
