import cx from "../../utils/cx";
import { PLAYER_X } from "../../utils/gameLogic";
import styles from "./Cell.module.css";

export default function Cell({ value = "", index, onClick, disabled, highlighted }) {
  return (
    <button
      className={cx(
        styles.cell,
        value && (value === PLAYER_X ? styles.x : styles.o),
        highlighted && styles.highlighted
      )}
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={`Клітинка ${index + 1}${value ? `: ${value}` : ""}`}
    >
      {value}
    </button>
  );
}
