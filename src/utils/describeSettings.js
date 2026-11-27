import { DIFFICULTY_LABELS, MODES, MODE_LABELS } from "../config/settings";

// Короткий опис поточних налаштувань для стартового екрана.
export default function describeSettings(settings) {
  const items = [MODE_LABELS[settings.mode]];

  if (settings.mode === MODES.PVC) {
    items.push(`Складність: ${DIFFICULTY_LABELS[settings.difficulty].toLowerCase()}`);
  }

  items.push(
    `Поле ${settings.boardSize}×${settings.boardSize}, ${settings.winLength} в ряд`,
    settings.turnTime ? `${settings.turnTime} с на хід` : "Без таймера",
    `Матч до ${settings.roundsToWin} перемог`
  );

  return items;
}
