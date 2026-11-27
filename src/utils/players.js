import { MODES } from "../config/settings";

export const COMPUTER_NAME = "Комп'ютер";
export const DEFAULT_OPPONENT_NAME = "Гравець O";
export const MAX_NAME_LENGTH = 20;

// Ім'я суперника (гравця O) залежно від режиму гри.
export const getOpponentName = (settings, typedName = "") =>
  settings.mode === MODES.PVC ? COMPUTER_NAME : typedName.trim() || DEFAULT_OPPONENT_NAME;

export const getWinRate = ({ matches, wins }) =>
  matches ? Math.round((wins / matches) * 100) : 0;

export const formatDate = (iso) =>
  new Date(iso).toLocaleString("uk-UA", { dateStyle: "short", timeStyle: "short" });
