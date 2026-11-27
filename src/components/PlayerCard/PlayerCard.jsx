import cx from "../../utils/cx";
import { PLAYER_X } from "../../utils/gameLogic";
import styles from "./PlayerCard.module.css";

export default function PlayerCard({ name, symbol, wins = 0, active = false }) {
  return (
    <article className={cx(styles.card, active && styles.active)}>
      <span className={cx(styles.symbol, symbol === PLAYER_X ? styles.x : styles.o)}>
        {symbol}
      </span>
      <span className={styles.name}>{name}</span>
      <span className={styles.wins}>Перемог: {wins}</span>
      <span className={styles.status}>{active ? "Ваш хід" : " "}</span>
    </article>
  );
}
