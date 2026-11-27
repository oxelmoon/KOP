// Об'єднує класи CSS-модулів, пропускаючи порожні: cx(styles.a, isOn && styles.b)
export default function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}
