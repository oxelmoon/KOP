import { Link, NavLink } from "react-router-dom";
import { ROUTES } from "../../config/routes";
import cx from "../../utils/cx";
import styles from "./Header.module.css";

const NAV_ITEMS = [
  { to: ROUTES.HOME, label: "Гра", end: true },
  { to: ROUTES.USERS, label: "Таблиця результатів" },
  { to: ROUTES.SETTINGS, label: "Налаштування" },
];

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to={ROUTES.HOME} className={styles.logo}>
          <span className={styles.logoX}>X</span>
          <span className={styles.logoO}>O</span>
          <span className={styles.logoText}>TIC TAC TOE</span>
        </Link>

        <nav className={styles.nav} aria-label="Головна навігація">
          {NAV_ITEMS.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => cx(styles.link, isActive && styles.active)}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
