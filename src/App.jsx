import StartPage from "./pages/StartPage/StartPage";
import GamePage from "./pages/GamePage/GamePage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import useGameFlow from "./hooks/useGameFlow";
import { PAGES } from "./hooks/useNavigation";

function App() {
  const {
    page,
    playersState,
    score,
    lastWinner,
    startGame,
    finishGame,
    playAgain,
    backToStart,
  } = useGameFlow();

  if (page === PAGES.GAME) {
    return <GamePage players={playersState.players} score={score} onFinish={finishGame} />;
  }

  if (page === PAGES.RESULTS) {
    return (
      <ResultsPage
        winner={lastWinner}
        players={playersState.players}
        score={score}
        onPlayAgain={playAgain}
        onBackToStart={backToStart}
      />
    );
  }

  return (
    <StartPage
      names={playersState.names}
      placeholders={playersState.placeholders}
      error={playersState.error}
      isValid={playersState.isValid}
      onNameChange={playersState.setPlayerName}
      onStart={startGame}
    />
  );
}

export default App;
