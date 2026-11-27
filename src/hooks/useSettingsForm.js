import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useSettings from "./useSettings";
import { settingsSchema } from "../validation/settingsSchema";
import { DEFAULT_SETTINGS, MODES } from "../config/settings";

// HTML-інпути віддають рядки — для числових полів перетворюємо на числа ("" лишаємо для валідації).
const toNumber = (value) => (value === "" ? "" : Number(value));

/**
 * Уся логіка форми налаштувань: react-hook-form + yup-схема.
 * Сторінка отримує готові field-пропси й лише рендерить їх.
 */
export default function useSettingsForm({ onSaved } = {}) {
  const { settings, saveSettings } = useSettings();

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

  const onSubmit = handleSubmit((values) => {
    saveSettings(values);
    onSaved?.();
  });

  // Скидаємо до стандартних, але зберігаються вони лише після натискання "Зберегти".
  const resetToDefaults = () => reset(DEFAULT_SETTINGS, { keepDefaultValues: true });

  return {
    fields,
    errors,
    onSubmit,
    resetToDefaults,
    isPvc: mode === MODES.PVC,
    maxWinLength: Number(boardSize) || DEFAULT_SETTINGS.boardSize,
    canSave: isValid,
    isDirty,
  };
}
