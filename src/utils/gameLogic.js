// Чисті функції ігрової логіки (без React), щоб їх легко було тестувати.

export const PLAYER_X = "X";
export const PLAYER_O = "O";
export const DRAW = "draw";

export const createEmptyBoard = () => Array(9).fill("");

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/**
 * Повертає { winner, line }:
 *  winner — "X" | "O" | "draw" | null (гра триває)
 *  line   — індекси виграшної лінії або []
 */
export function getGameResult(board) {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }

  if (board.every(Boolean)) {
    return { winner: DRAW, line: [] };
  }

  return { winner: null, line: [] };
}

// X завжди ходить першим, тож чий хід — визначається кількістю зроблених ходів.
export const getCurrentPlayer = (board) =>
  board.filter(Boolean).length % 2 === 0 ? PLAYER_X : PLAYER_O;
