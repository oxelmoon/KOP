import "./Cell.css";

export default function Cell({ value = "", index, onClick, disabled, highlighted }) {
  return (
    <button
      className={`cell ${highlighted ? "cell--highlighted" : ""}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={`Клітинка ${index + 1}${value ? `: ${value}` : ""}`}
    >
      {value}
    </button>
  );
}
