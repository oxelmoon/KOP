import Cell from "../Cell/Cell";
import styles from "./GameBoard.module.css";

export default function GameBoard({ board, size = 3, winningLine = [], disabled, onCellClick }) {
  return (
    <div className={styles.board} style={{ "--size": size }}>
      {board.map((value, index) => (
        <Cell
          key={index}
          index={index}
          value={value}
          highlighted={winningLine.includes(index)}
          disabled={disabled || Boolean(value)}
          onClick={() => onCellClick(index)}
        />
      ))}
    </div>
  );
}
