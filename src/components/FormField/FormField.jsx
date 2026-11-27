import "./FormField.css";

// Обгортка поля форми: підпис, підказка та повідомлення про помилку.
export default function FormField({ id, label, hint, error, children }) {
  return (
    <div className={`form-field ${error ? "form-field--error" : ""}`}>
      <label className="form-field__label" htmlFor={id}>
        {label}
      </label>
      {children}
      {error ? (
        <p className="form-field__error" role="alert">{error}</p>
      ) : (
        hint && <p className="form-field__hint">{hint}</p>
      )}
    </div>
  );
}
