import { useCallback, useState } from "react";

export const PAGES = {
  START: "start",
  GAME: "game",
  RESULTS: "results",
};

// Простий "роутер" на стані: яка сторінка зараз відкрита.
export default function useNavigation(initialPage = PAGES.START) {
  const [page, setPage] = useState(initialPage);

  const goToStart = useCallback(() => setPage(PAGES.START), []);
  const goToGame = useCallback(() => setPage(PAGES.GAME), []);
  const goToResults = useCallback(() => setPage(PAGES.RESULTS), []);

  return { page, goToStart, goToGame, goToResults };
}
