import "./PlayerCard.css";

export default function PlayerCard({ name, symbol, wins = 0, active = false }) {
  return (
    <article className={`player-card ${active ? "player-card--active" : ""}`}>
      <span className="player-card__symbol">{symbol}</span>
      <span className="player-card__name">{name}</span>
      <span className="player-card__wins">Перемог: {wins}</span>
      {active && <span className="player-card__status">Ваш хід</span>}
    </article>
  );
}
