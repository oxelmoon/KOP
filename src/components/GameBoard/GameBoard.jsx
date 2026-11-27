import Cell from "../Cell/Cell";
import "./GameBoard.css";

export default function GameBoard({ board, winningLine = [], disabled, onCellClick }) {
  return (
    <div className="game-board">
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
