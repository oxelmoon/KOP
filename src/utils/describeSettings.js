import { DIFFICULTY_LABELS, MODES, MODE_LABELS } from "../config/settings";

// "до 1 перемоги", але "до 2/5/11 перемог"
const winsWord = (n) => (n % 10 === 1 && n % 100 !== 11 ? "перемоги" : "перемог");

// Короткий опис поточних налаштувань для стартового екрана.
export default function describeSettings(settings) {
  const items = [MODE_LABELS[settings.mode]];

  if (settings.mode === MODES.PVC) {
    items.push(`Складність: ${DIFFICULTY_LABELS[settings.difficulty].toLowerCase()}`);
  }

  items.push(
    `Поле ${settings.boardSize}×${settings.boardSize}, ${settings.winLength} в ряд`,
    settings.turnTime ? `${settings.turnTime} с на хід` : "Без таймера",
    `Матч до ${settings.roundsToWin} ${winsWord(settings.roundsToWin)}`
  );

  return items;
}
