// Опис усіх налаштувань гри: значення за замовчуванням і варіанти для форми.

export const MODES = {
  PVP: "pvp",
  PVC: "pvc",
};

export const DIFFICULTIES = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
};

export const BOARD_SIZES = [3, 4, 5];

export const BOT_SPEEDS = {
  slow: 1200,
  normal: 700,
  fast: 250,
};

export const MIN_WIN_LENGTH = 3;
export const MAX_TURN_TIME = 60;
export const MIN_TURN_TIME = 3;
export const MAX_ROUNDS_TO_WIN = 10;

export const DEFAULT_SETTINGS = {
  mode: MODES.PVP,
  difficulty: DIFFICULTIES.MEDIUM,
  boardSize: 3,
  winLength: 3,
  turnTime: 0, // секунд на хід, 0 — без таймера
  botSpeed: "normal",
  roundsToWin: 3,
};

export const MODE_LABELS = {
  [MODES.PVP]: "Двоє гравців",
  [MODES.PVC]: "Проти комп'ютера",
};

export const DIFFICULTY_LABELS = {
  [DIFFICULTIES.EASY]: "Легкий",
  [DIFFICULTIES.MEDIUM]: "Середній",
  [DIFFICULTIES.HARD]: "Складний",
};

export const BOT_SPEED_LABELS = {
  slow: "Повільно",
  normal: "Звичайно",
  fast: "Швидко",
};
