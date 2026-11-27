import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import TextField from "../../components/TextField/TextField";
import { PLAYER_O, PLAYER_X } from "../../utils/gameLogic";
import "./StartPage.css";

export default function StartPage({ names, placeholders, error, isValid, onNameChange, onStart }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onStart();
  };

  return (
    <main className="page start-page">
      <Header />
      <section className="start-content">
        <p className="eyebrow">GAME</p>
        <h1>Хрестики-нулики</h1>
        <p className="subtitle">Класична гра для двох гравців</p>

        <form className="start-form" onSubmit={handleSubmit}>
          {[PLAYER_X, PLAYER_O].map((symbol) => (
            <TextField
              key={symbol}
              id={`player-${symbol}`}
              label={`Гравець ${symbol}`}
              value={names[symbol]}
              placeholder={placeholders[symbol]}
              onChange={(value) => onNameChange(symbol, value)}
            />
          ))}
          {error && <p className="start-form__error">{error}</p>}
          <Button type="submit" disabled={!isValid}>Грати</Button>
        </form>
      </section>
    </main>
  );
}
