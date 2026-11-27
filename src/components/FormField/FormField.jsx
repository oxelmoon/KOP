import cx from "../../utils/cx";
import styles from "./FormField.module.css";

// Класи для самих контролів (input/select/radio), щоб сторінки могли їх використовувати.
export const fieldStyles = styles;

// Обгортка поля форми: підпис, підказка та повідомлення про помилку.
export default function FormField({ id, label, hint, error, children }) {
  return (
    <div className={cx(styles.field, error && styles.hasError)}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      {children}
      {error ? (
        <p className={styles.error} role="alert">{error}</p>
      ) : (
        hint && <p className={styles.hint}>{hint}</p>
      )}
    </div>
  );
}
