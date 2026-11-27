import { Link } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import Avatar from "../../components/Avatar/Avatar";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import { fieldStyles } from "../../components/FormField/FormField";
import useResultsTable from "../../hooks/useResultsTable";
import { SORT_KEYS } from "../../store/resultsTableStore";
import { ROUTES } from "../../config/routes";
import cx from "../../utils/cx";
import styles from "./ResultsTablePage.module.css";

const COLUMNS = [
  { key: SORT_KEYS.NAME, label: "Гравець", align: "left" },
  { key: SORT_KEYS.MATCHES, label: "Матчі" },
  { key: SORT_KEYS.WINS, label: "Перемоги" },
  { key: SORT_KEYS.LOSSES, label: "Поразки" },
  { key: SORT_KEYS.WIN_RATE, label: "% перемог" },
  { key: SORT_KEYS.ROUNDS, label: "Тури ±", title: "Різниця виграних і програних турів" },
  { key: SORT_KEYS.LAST_PLAYED, label: "Остання гра" },
];

// Маршрут /users — таблиця результатів усіх гравців.
export default function ResultsTablePage() {
  const { rows, summary, hasUsers, view, getSortState, confirmReset } = useResultsTable();

  if (!hasUsers) {
    return (
      <>
        <PageTitle eyebrow="Результати" title="Таблиця результатів" />
        <Card className={styles.empty}>
          <p>Ще немає жодного гравця.</p>
          <Button to={ROUTES.HOME}>Створити гравця і зіграти</Button>
        </Card>
      </>
    );
  }

  return (
    <div className={styles.wide}>
      <PageTitle eyebrow="Результати" title="Таблиця результатів" />

      <div className={styles.summary}>
        <Card className={styles.summaryItem}>
          <span className={styles.summaryValue}>{summary.totalPlayers}</span>
          <span className={styles.summaryLabel}>гравців</span>
        </Card>
        <Card className={styles.summaryItem}>
          <span className={styles.summaryValue}>{summary.totalMatches}</span>
          <span className={styles.summaryLabel}>матчів зіграно</span>
        </Card>
        <Card className={styles.summaryItem}>
          <span className={styles.summaryValue}>{summary.leader ? `🏆 ${summary.leader.name}` : "—"}</span>
          <span className={styles.summaryLabel}>лідер</span>
        </Card>
      </div>

      <Card className={styles.tableCard}>
        <div className={styles.toolbar}>
          <input
            type="search"
            className={cx(fieldStyles.control, styles.search)}
            placeholder="Пошук гравця…"
            aria-label="Пошук гравця"
            value={view.query}
            onChange={(event) => view.setQuery(event.target.value)}
          />
          <label className={styles.checkbox}>
            <input type="checkbox" checked={view.onlyPlayed} onChange={view.toggleOnlyPlayed} />
            Лише ті, хто грав
          </label>
          <button type="button" className={styles.resetView} onClick={view.resetView}>
            Скинути вигляд
          </button>
        </div>

        <div className={styles.scroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col" className={styles.rankCell}>#</th>
                {COLUMNS.map((column) => (
                  <th
                    key={column.key}
                    scope="col"
                    aria-sort={getSortState(column.key)}
                    className={cx(column.align === "left" && styles.left)}
                  >
                    <button
                      type="button"
                      className={cx(styles.sortButton, view.sortBy === column.key && styles.sorted)}
                      title={column.title}
                      onClick={() => view.setSort(column.key)}
                    >
                      {column.label}
                      <span className={styles.arrow} aria-hidden="true">
                        {view.sortBy === column.key ? (view.sortDir === "asc" ? "▲" : "▼") : "↕"}
                      </span>
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td className={styles.rankCell}>
                    <span className={cx(styles.rank, row.rank === 1 && styles.first)}>
                      {row.rank ?? "—"}
                    </span>
                  </td>
                  <td className={styles.left}>
                    <Link to={row.url} className={styles.player}>
                      <Avatar name={row.name} />
                      <span className={styles.playerName}>{row.name}</span>
                    </Link>
                  </td>
                  <td>{row.matches}</td>
                  <td className={styles.wins}>{row.wins}</td>
                  <td className={styles.losses}>{row.losses}</td>
                  <td>
                    <span className={styles.rate}>
                      <span className={styles.rateBar} style={{ "--rate": `${row.winRate}%` }} />
                      {row.winRate}%
                    </span>
                  </td>
                  <td className={cx(row.roundDiff > 0 && styles.wins, row.roundDiff < 0 && styles.losses)}>
                    {row.roundDiff > 0 ? `+${row.roundDiff}` : row.roundDiff}
                  </td>
                  <td className={styles.date}>{row.lastPlayed}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 && <p className={styles.noRows}>Нікого не знайдено.</p>}
        </div>
      </Card>

      <div className={styles.danger}>
        <Button variant="danger" onClick={confirmReset.open} disabled={summary.totalMatches === 0}>
          Обнулити всю статистику
        </Button>
      </div>

      <ConfirmDialog
        isOpen={confirmReset.isOpen}
        title="Обнулити статистику?"
        message="Результати та історія матчів усіх гравців будуть видалені. Самі гравці залишаться."
        confirmLabel="Обнулити"
        onConfirm={confirmReset.accept}
        onCancel={confirmReset.close}
      />
    </div>
  );
}
