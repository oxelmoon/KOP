// Похідні дані для таблиці результатів. Чисті функції: на вході стан сторів, на виході рядки.
import { SORT_KEYS } from "./resultsTableStore";
import { getWinRate } from "../utils/players";

const toRow = (user) => ({
  id: user.id,
  name: user.name,
  ...user.stats,
  winRate: getWinRate(user.stats),
  roundDiff: user.stats.roundsWon - user.stats.roundsLost,
});

const compareBy = (key) => {
  if (key === SORT_KEYS.NAME) return (a, b) => a.name.localeCompare(b.name, "uk");
  if (key === SORT_KEYS.LAST_PLAYED) {
    return (a, b) => (a.lastPlayedAt ?? "").localeCompare(b.lastPlayedAt ?? "");
  }
  return (a, b) => a[key] - b[key];
};

// Місце в рейтингу — за перемогами, потім за відсотком і різницею турів (не залежить від сортування).
// У рейтингу беруть участь лише ті, хто зіграв хоча б один матч.
function withRanks(rows) {
  const ranked = rows
    .filter((row) => row.matches > 0)
    .sort((a, b) => b.wins - a.wins || b.winRate - a.winRate || b.roundDiff - a.roundDiff);
  const rankById = new Map(ranked.map((row, index) => [row.id, index + 1]));
  return rows.map((row) => ({ ...row, rank: rankById.get(row.id) ?? null }));
}

export function selectResultsRows(users, { sortBy, sortDir, query, onlyPlayed }) {
  const search = query.trim().toLowerCase();
  const compare = compareBy(sortBy);
  const direction = sortDir === "asc" ? 1 : -1;

  return withRanks(users.map(toRow))
    .filter((row) => !onlyPlayed || row.matches > 0)
    .filter((row) => !search || row.name.toLowerCase().includes(search))
    .sort((a, b) => direction * compare(a, b) || a.name.localeCompare(b.name, "uk"));
}

export function selectResultsSummary(users) {
  const totalMatches = users.reduce((sum, user) => sum + user.stats.matches, 0);
  const leader = withRanks(users.map(toRow)).find((row) => row.rank === 1) ?? null;
  return { totalPlayers: users.length, totalMatches, leader };
}
