import { Link } from "react-router-dom";
import cx from "../../utils/cx";
import styles from "./Button.module.css";

// Кнопка; з пропсом `to` рендериться як посилання роутера, але виглядає так само.
export default function Button({
  children,
  variant = "primary",
  type = "button",
  to,
  onClick,
  disabled = false,
}) {
  const className = cx(styles.button, styles[variant]);

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button className={className} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
