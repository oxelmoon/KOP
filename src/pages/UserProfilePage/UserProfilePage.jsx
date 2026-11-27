import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import Avatar from "../../components/Avatar/Avatar";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import useUserProfile from "../../hooks/useUserProfile";
import { ROUTES } from "../../config/routes";
import cx from "../../utils/cx";
import styles from "./UserProfilePage.module.css";

// Маршрут /users/:userId — профіль конкретного гравця.
export default function UserProfilePage() {
  const { user, winRate, history, play, confirm } = useUserProfile();

  if (!user) return <NotFoundPage message="Такого гравця не існує або його видалено." />;

  const stats = [
    { label: "Матчів", value: user.stats.matches },
    { label: "Перемог", value: user.stats.wins },
    { label: "Поразок", value: user.stats.losses },
    { label: "Відсоток перемог", value: `${winRate}%` },
  ];

  return (
    <>
      <Card className={styles.profile}>
        <Avatar name={user.name} size="large" />
        <h1 className={styles.name}>{user.name}</h1>
        <p className={styles.id}>ID: {user.id}</p>

        <dl className={styles.stats}>
          {stats.map(({ label, value }) => (
            <div key={label} className={styles.stat}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <div className={styles.actions}>
          <Button onClick={play}>Грати</Button>
          <Button variant="secondary" to={ROUTES.USERS}>Усі гравці</Button>
        </div>
      </Card>

      <Card className={styles.history}>
        <h2 className={styles.sectionTitle}>Останні матчі</h2>
        {history.length === 0 ? (
          <p className={styles.empty}>Ще не зіграно жодного матчу.</p>
        ) : (
          <ul className={styles.matches}>
            {history.map((match) => (
              <li key={match.id} className={styles.match}>
                <span className={cx(styles.badge, match.won ? styles.win : styles.loss)}>
                  {match.won ? "Перемога" : "Поразка"}
                </span>
                <span className={styles.opponent}>vs {match.opponent}</span>
                <span className={styles.score}>{match.score}</span>
                <span className={styles.date}>{match.date}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <div className={styles.danger}>
        <Button variant="danger" onClick={confirm.open}>Видалити гравця</Button>
      </div>

      <ConfirmDialog
        isOpen={confirm.isOpen}
        title="Видалити гравця?"
        message={`Статистику та історію матчів гравця «${user.name}» буде втрачено.`}
        confirmLabel="Видалити"
        onConfirm={confirm.accept}
        onCancel={confirm.close}
      />
    </>
  );
}
