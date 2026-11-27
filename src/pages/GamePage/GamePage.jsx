import Header from "../../components/Header/Header";
import PlayerCard from "../../components/PlayerCard/PlayerCard";
import GameBoard from "../../components/GameBoard/GameBoard";
import Button from "../../components/Button/Button";
import useTicTacToe from "../../hooks/useTicTacToe";
import { DRAW, PLAYER_O, PLAYER_X } from "../../utils/gameLogic";
import "./GamePage.css";

export default function GamePage({ players, score, onFinish }) {
  const { board, currentPlayer, winner, winningLine, isFinished, makeMove, resetGame } =
    useTicTacToe({ onFinish });

  const status = !isFinished
    ? <>Хід гравця: <strong>{players[currentPlayer]} ({currentPlayer})</strong></>
    : winner === DRAW
      ? <strong>Нічия!</strong>
      : <>Переміг: <strong>{players[winner]}</strong></>;

  return (
    <main className="page game-page">
      <Header />
      <section className="game-content">
        <div className="players">
          {[PLAYER_X, PLAYER_O].map((symbol) => (
            <PlayerCard
              key={symbol}
              name={players[symbol]}
              symbol={symbol}
              wins={score[symbol]}
              active={!isFinished && currentPlayer === symbol}
            />
          ))}
        </div>

        <p className="turn" aria-live="polite">{status}</p>

        <GameBoard
          board={board}
          winningLine={winningLine}
          disabled={isFinished}
          onCellClick={makeMove}
        />

        <Button variant="secondary" onClick={resetGame} disabled={isFinished}>
          Нова гра
        </Button>
      </section>
    </main>
  );
}
