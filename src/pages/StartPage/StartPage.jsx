import { Link } from "react-router-dom";
import Card from "../../components/Card/Card";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from "../../components/Button/Button";
import FormField, { fieldStyles } from "../../components/FormField/FormField";
import TextField from "../../components/TextField/TextField";
import useStartPage, { NEW_USER } from "../../hooks/useStartPage";
import { DEFAULT_OPPONENT_NAME } from "../../utils/players";
import { ROUTES } from "../../config/routes";
import styles from "./StartPage.module.css";

export default function StartPage() {
  const {
    users,
    selectedId,
    isNewUser,
    newName,
    opponent,
    isPvc,
    error,
    settingsSummary,
    selectUser,
    setNewName,
    setOpponent,
    start,
  } = useStartPage();

  const handleSubmit = (event) => {
    event.preventDefault();
    start();
  };

  return (
    <>
      <PageTitle
        eyebrow="Game"
        title="Хрестики-нулики"
        subtitle="Класична гра для двох гравців або проти комп'ютера"
      />

      <Card>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {users.length > 0 && (
            <FormField id="player" label="Хто грає за X">
              <select
                id="player"
                className={fieldStyles.control}
                value={selectedId}
                onChange={(event) => selectUser(event.target.value)}
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
                <option value={NEW_USER}>+ Новий гравець</option>
              </select>
            </FormField>
          )}

          {isNewUser && (
            <TextField
              id="new-player"
              label="Ім'я нового гравця (X)"
              placeholder="Наприклад, Олена"
              value={newName}
              onChange={setNewName}
            />
          )}

          {isPvc ? (
            <p className={styles.opponent}>Суперник (O): <strong>Комп'ютер</strong></p>
          ) : (
            <TextField
              id="opponent"
              label="Суперник (O)"
              placeholder={DEFAULT_OPPONENT_NAME}
              value={opponent}
              onChange={setOpponent}
            />
          )}

          {error && <p className={styles.error} role="alert">{error}</p>}

          <div className={styles.summary}>
            <ul className={styles.chips} aria-label="Поточні налаштування">
              {settingsSummary.map((item) => (
                <li key={item} className={styles.chip}>{item}</li>
              ))}
            </ul>
            <Link to={ROUTES.SETTINGS} className={styles.change}>Змінити налаштування</Link>
          </div>

          <Button type="submit" disabled={Boolean(error)}>Грати</Button>
        </form>
      </Card>
    </>
  );
}
