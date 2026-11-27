// Логіка комп'ютерного суперника для трьох рівнів складності.
import { DIFFICULTIES } from "../config/settings";
import {
  getBoardSize,
  getEmptyCells,
  getGameResult,
  getOpponent,
  getWinLines,
} from "./gameLogic";

const randomItem = (items) => items[Math.floor(Math.random() * items.length)];

// Клітинка, що одразу дає перемогу гравцю player (або null).
function findWinningMove(board, winLength, player) {
  for (const index of getEmptyCells(board)) {
    const next = [...board];
    next[index] = player;
    if (getGameResult(next, winLength).winner === player) return index;
  }
  return null;
}

// Клітинки ближче до центру — кращі. Сортуємо, щоб мінімакс швидше відсікав гілки.
function sortByCenter(cells, size) {
  const center = (size - 1) / 2;
  const distance = (i) =>
    Math.abs(Math.floor(i / size) - center) + Math.abs((i % size) - center);
  return [...cells].sort((a, b) => distance(a) - distance(b));
}

// Евристична оцінка позиції: лінії, де є лише фішки одного гравця, — потенційні перемоги.
function evaluate(board, winLength, bot) {
  const human = getOpponent(bot);
  let score = 0;
  for (const line of getWinLines(getBoardSize(board), winLength)) {
    let mine = 0;
    let theirs = 0;
    for (const index of line) {
      if (board[index] === bot) mine++;
      else if (board[index] === human) theirs++;
    }
    if (mine && !theirs) score += 10 ** mine;
    if (theirs && !mine) score -= 10 ** theirs;
  }
  return score;
}

// Мінімакс з альфа-бета відсіченням і обмеженням глибини (для полів 4×4 і 5×5).
function minimax(board, winLength, bot, depth, isBotTurn, alpha, beta) {
  const { winner } = getGameResult(board, winLength);
  if (winner === bot) return 100000 + depth;
  if (winner === getOpponent(bot)) return -100000 - depth;
  if (winner) return 0; // нічия
  if (depth === 0) return evaluate(board, winLength, bot);

  const player = isBotTurn ? bot : getOpponent(bot);
  let best = isBotTurn ? -Infinity : Infinity;

  for (const index of sortByCenter(getEmptyCells(board), getBoardSize(board))) {
    board[index] = player;
    const score = minimax(board, winLength, bot, depth - 1, !isBotTurn, alpha, beta);
    board[index] = "";

    if (isBotTurn) {
      best = Math.max(best, score);
      alpha = Math.max(alpha, score);
    } else {
      best = Math.min(best, score);
      beta = Math.min(beta, score);
    }
    if (beta <= alpha) break;
  }
  return best;
}

const SEARCH_DEPTH = { 3: 9, 4: 4, 5: 3 };

function bestMinimaxMove(board, winLength, bot) {
  const size = getBoardSize(board);
  const depth = SEARCH_DEPTH[size] ?? 3;
  const work = [...board];
  let bestScore = -Infinity;
  let bestMove = null;

  for (const index of sortByCenter(getEmptyCells(board), size)) {
    work[index] = bot;
    const score = minimax(work, winLength, bot, depth - 1, false, -Infinity, Infinity);
    work[index] = "";
    if (score > bestScore) {
      bestScore = score;
      bestMove = index;
    }
  }
  return bestMove;
}

/**
 * Обирає хід комп'ютера.
 *  easy   — випадкова вільна клітинка;
 *  medium — виграє, якщо може, блокує суперника, інакше ходить ближче до центру;
 *  hard   — мінімакс з альфа-бета відсіченням.
 */
export function chooseComputerMove(board, { winLength, difficulty, bot }) {
  const empty = getEmptyCells(board);
  if (!empty.length) return null;

  if (difficulty === DIFFICULTIES.EASY) return randomItem(empty);

  if (difficulty === DIFFICULTIES.HARD) return bestMinimaxMove(board, winLength, bot);

  const win = findWinningMove(board, winLength, bot);
  if (win !== null) return win;

  const block = findWinningMove(board, winLength, getOpponent(bot));
  if (block !== null) return block;

  // Трохи випадковості, щоб середній рівень не був передбачуваним.
  const preferred = sortByCenter(empty, getBoardSize(board)).slice(0, 3);
  return randomItem(preferred);
}
