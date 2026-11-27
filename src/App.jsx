import StartPage from "./pages/StartPage/StartPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import GamePage from "./pages/GamePage/GamePage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import useGameFlow from "./hooks/useGameFlow";
import { PAGES } from "./hooks/useNavigation";

function App() {
  const {
    page,
    playersState,
    settings,
    settingsSummary,
    score,
    matchWinner,
    startGame,
    finishRound,
    newMatch,
    openSettings,
    backToStart,
  } = useGameFlow();

  switch (page) {
    case PAGES.SETTINGS:
      return <SettingsPage onBack={backToStart} />;

    case PAGES.GAME:
      return (
        <GamePage
          settings={settings}
          players={playersState.players}
          score={score}
          onRoundEnd={finishRound}
          onExit={backToStart}
        />
      );

    case PAGES.RESULTS:
      return (
        <ResultsPage
          winner={matchWinner}
          players={playersState.players}
          score={score}
          onNewMatch={newMatch}
          onBackToStart={backToStart}
        />
      );

    default:
      return (
        <StartPage
          names={playersState.names}
          placeholders={playersState.placeholders}
          editableSymbols={playersState.editableSymbols}
          error={playersState.error}
          isValid={playersState.isValid}
          settingsSummary={settingsSummary}
          onNameChange={playersState.setPlayerName}
          onStart={startGame}
          onOpenSettings={openSettings}
        />
      );
  }
}

export default App;
