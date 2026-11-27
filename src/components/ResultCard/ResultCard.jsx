import Card from "../Card/Card";
import ScoreBoard from "../ScoreBoard/ScoreBoard";
import styles from "./ResultCard.module.css";

export default function ResultCard({ winner, label = "Переможець", isDraw = false, score }) {
  return (
    <Card as="article" className={styles.card}>
      <div className={styles.icon}>{isDraw ? "🤝" : "🏆"}</div>
      <p className={styles.label}>{isDraw ? "Результат" : label}</p>
      <h2 className={styles.winner}>{isDraw ? "Нічия" : winner}</h2>
      <ScoreBoard score={score} />
    </Card>
  );
}
