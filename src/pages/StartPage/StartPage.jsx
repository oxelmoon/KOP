import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import TextField from "../../components/TextField/TextField";
import "./StartPage.css";

export default function StartPage({
  names,
  placeholders,
  editableSymbols,
  error,
  isValid,
  settingsSummary,
  onNameChange,
  onStart,
  onOpenSettings,
}) {
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
        <p className="subtitle">Класична гра для двох гравців або проти комп'ютера</p>

        <form className="start-form" onSubmit={handleSubmit}>
          {editableSymbols.map((symbol) => (
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

          <ul className="settings-summary" aria-label="Поточні налаштування">
            {settingsSummary.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <Button type="submit" disabled={!isValid}>Грати</Button>
          <Button variant="secondary" onClick={onOpenSettings}>Налаштування</Button>
        </form>
      </section>
    </main>
  );
}
