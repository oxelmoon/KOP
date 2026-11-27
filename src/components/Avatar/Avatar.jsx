import cx from "../../utils/cx";
import styles from "./Avatar.module.css";

// Кругла "аватарка" з першою літерою імені.
export default function Avatar({ name, size = "medium" }) {
  return (
    <span className={cx(styles.avatar, styles[size])} aria-hidden="true">
      {name.charAt(0).toUpperCase()}
    </span>
  );
}
