import "./TextField.css";

export default function TextField({ id, label, value, placeholder, onChange }) {
  return (
    <label className="text-field" htmlFor={id}>
      <span className="text-field__label">{label}</span>
      <input
        id={id}
        className="text-field__input"
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
