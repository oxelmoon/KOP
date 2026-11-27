import { DRAW, PLAYER_O, PLAYER_X } from "../../utils/gameLogic";
import styles from "./ScoreBoard.module.css";

// Рахунок матчу "X 2 : 1 O" + кількість нічиїх.
export default function ScoreBoard({ score, showDraws = true }) {
  return (
    <div className={styles.wrapper} aria-label="Рахунок матчу">
      <div className={styles.score}>
        <span className={styles.x}>X</span>
        <strong className={styles.value}>
          {score[PLAYER_X]} : {score[PLAYER_O]}
        </strong>
        <span className={styles.o}>O</span>
      </div>
      {showDraws && <p className={styles.draws}>Нічиїх: {score[DRAW]}</p>}
    </div>
  );
}
