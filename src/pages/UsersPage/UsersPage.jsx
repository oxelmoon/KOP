import { Link } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import Avatar from "../../components/Avatar/Avatar";
import useUsersPage from "../../hooks/useUsersPage";
import { ROUTES } from "../../config/routes";
import styles from "./UsersPage.module.css";

// Маршрут /users — список гравців; кожен веде на динамічний маршрут /users/:userId.
export default function UsersPage() {
  const { users } = useUsersPage();

  return (
    <>
      <PageTitle eyebrow="Гравці" title="Таблиця гравців" subtitle="Відсортовано за кількістю перемог" />

      {users.length === 0 ? (
        <Card className={styles.empty}>
          <p>Ще немає жодного гравця.</p>
          <Button to={ROUTES.HOME}>Створити гравця і зіграти</Button>
        </Card>
      ) : (
        <ol className={styles.list}>
          {users.map((user, index) => (
            <li key={user.id}>
              <Link to={user.url} className={styles.row}>
                <span className={styles.place}>{index + 1}</span>
                <Avatar name={user.name} />
                <span className={styles.info}>
                  <span className={styles.name}>{user.name}</span>
                  <span className={styles.meta}>
                    Матчів: {user.stats.matches} · Перемог: {user.stats.wins} · {user.winRate}%
                  </span>
                </span>
                <span className={styles.arrow} aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </>
  );
}
