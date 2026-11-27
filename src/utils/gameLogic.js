// Чисті функції ігрової логіки (без React), щоб їх легко було тестувати.

export const PLAYER_X = "X";
export const PLAYER_O = "O";
export const DRAW = "draw";

export const RESULT_REASONS = {
  LINE: "line",
  DRAW: "draw",
  TIMEOUT: "timeout",
};

export const createEmptyBoard = (size = 3) => Array(size * size).fill("");

export const getBoardSize = (board) => Math.round(Math.sqrt(board.length));

const DIRECTIONS = [
  [0, 1], // горизонталь
  [1, 0], // вертикаль
  [1, 1], // діагональ ↘
  [1, -1], // діагональ ↙
];

const linesCache = new Map();

// Усі можливі виграшні лінії довжини winLength на полі size×size.
export function getWinLines(size, winLength) {
  const key = `${size}:${winLength}`;
  if (linesCache.has(key)) return linesCache.get(key);

  const lines = [];
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      for (const [dr, dc] of DIRECTIONS) {
        const endRow = row + dr * (winLength - 1);
        const endCol = col + dc * (winLength - 1);
        if (endRow >= size || endCol < 0 || endCol >= size) continue;

        lines.push(
          Array.from({ length: winLength }, (_, i) => (row + dr * i) * size + (col + dc * i))
        );
      }
    }
  }

  linesCache.set(key, lines);
  return lines;
}

/**
 * Повертає { winner, line, reason }:
 *  winner — "X" | "O" | "draw" | null (гра триває)
 *  line   — індекси виграшної лінії або []
 */
export function getGameResult(board, winLength = 3) {
  for (const line of getWinLines(getBoardSize(board), winLength)) {
    const first = board[line[0]];
    if (first && line.every((index) => board[index] === first)) {
      return { winner: first, line, reason: RESULT_REASONS.LINE };
    }
  }

  if (board.every(Boolean)) {
    return { winner: DRAW, line: [], reason: RESULT_REASONS.DRAW };
  }

  return { winner: null, line: [], reason: null };
}

// X завжди ходить першим, тож чий хід — визначається кількістю зроблених ходів.
export const getCurrentPlayer = (board) =>
  board.filter(Boolean).length % 2 === 0 ? PLAYER_X : PLAYER_O;

export const getOpponent = (player) => (player === PLAYER_X ? PLAYER_O : PLAYER_X);

export const getEmptyCells = (board) =>
  board.reduce((cells, value, index) => (value ? cells : [...cells, index]), []);
