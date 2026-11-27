import "./ResultCard.css";

export default function ResultCard({
  winner,
  label = "Переможець",
  isDraw = false,
  scoreX,
  scoreO,
  draws,
}) {
  return (
    <article className="result-card">
      <div className="result-card__icon">{isDraw ? "🤝" : "🏆"}</div>
      <p className="result-card__label">{isDraw ? "Результат" : label}</p>
      <h1>{isDraw ? "Нічия" : winner}</h1>

      <div className="score">
        <span>X</span>
        <strong>{scoreX} : {scoreO}</strong>
        <span>O</span>
      </div>
      <p className="result-card__draws">Нічиїх: {draws}</p>
    </article>
  );
}
