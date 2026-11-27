import { useCallback, useMemo } from "react";
import useLocalStorage from "./useLocalStorage";
import { PLAYER_O, PLAYER_X } from "../utils/gameLogic";

const DEFAULT_NAMES = {
  [PLAYER_X]: "Гравець X",
  [PLAYER_O]: "Гравець O",
};

const MAX_NAME_LENGTH = 20;

// Стан стартової сторінки: імена гравців.
export default function usePlayers() {
  const [names, setNames] = useLocalStorage("ttt-player-names", {
    [PLAYER_X]: "",
    [PLAYER_O]: "",
  });

  const setPlayerName = useCallback(
    (symbol, name) =>
      setNames((prev) => ({ ...prev, [symbol]: name.slice(0, MAX_NAME_LENGTH) })),
    [setNames]
  );

  // Імена для відображення: якщо поле порожнє — підставляємо значення за замовчуванням.
  const players = useMemo(
    () => ({
      [PLAYER_X]: names[PLAYER_X].trim() || DEFAULT_NAMES[PLAYER_X],
      [PLAYER_O]: names[PLAYER_O].trim() || DEFAULT_NAMES[PLAYER_O],
    }),
    [names]
  );

  const isSameName =
    players[PLAYER_X].toLowerCase() === players[PLAYER_O].toLowerCase();

  return {
    names,
    players,
    setPlayerName,
    placeholders: DEFAULT_NAMES,
    error: isSameName ? "Імена гравців мають відрізнятися" : "",
    isValid: !isSameName,
  };
}
