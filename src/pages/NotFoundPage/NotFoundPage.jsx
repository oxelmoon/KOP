import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import { ROUTES } from "../../config/routes";
import styles from "./NotFoundPage.module.css";

// 404 — невідомий маршрут або неіснуючий :userId.
export default function NotFoundPage({ message = "Такої сторінки не існує." }) {
  return (
    <Card className={styles.card}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>Не знайдено</h1>
      <p className={styles.message}>{message}</p>
      <div className={styles.actions}>
        <Button to={ROUTES.HOME}>На головну</Button>
        <Button variant="secondary" to={ROUTES.USERS}>Список гравців</Button>
      </div>
    </Card>
  );
}
