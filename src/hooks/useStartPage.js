import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { useUsersStore } from "../store/usersStore";
import { useMatchStore } from "../store/matchStore";
import { useGameSettings } from "../store/settingsStore";
import describeSettings from "../utils/describeSettings";
import { MAX_NAME_LENGTH, getOpponentName } from "../utils/players";
import { MODES } from "../config/settings";
import { ROUTES } from "../config/routes";

export const NEW_USER = "new";

// Стартова сторінка: вибір (або створення) гравця, ім'я суперника і перехід до /users/:id/game.
export default function useStartPage() {
  const navigate = useNavigate();
  const settings = useGameSettings();
  const isPvc = settings.mode === MODES.PVC;

  const { users, lastUserId, lastOpponent, addUser, isNameTaken, setLastChoice } =
    useUsersStore(
      useShallow((state) => ({
        users: state.users,
        lastUserId: state.lastUserId,
        lastOpponent: state.lastOpponent,
        addUser: state.addUser,
        isNameTaken: state.isNameTaken,
        setLastChoice: state.setLastChoice,
      }))
    );
  const startMatch = useMatchStore((state) => state.startMatch);

  const initialUser = users.some((user) => user.id === lastUserId) ? lastUserId : users[0]?.id;
  const [selectedId, setSelectedId] = useState(initialUser ?? NEW_USER);
  const [newName, setNewName] = useState("");
  const [opponent, setOpponent] = useState(lastOpponent);

  const isNewUser = selectedId === NEW_USER || !users.some((user) => user.id === selectedId);
  const playerName = isNewUser
    ? newName.trim()
    : users.find((user) => user.id === selectedId).name;
  const opponentName = getOpponentName(settings, opponent);

  let error = "";
  if (isNewUser && !playerName) error = "Введіть ім'я нового гравця";
  else if (isNewUser && isNameTaken(playerName)) error = "Гравець з таким ім'ям уже є";
  else if (playerName.toLowerCase() === opponentName.toLowerCase())
    error = "Імена гравців мають відрізнятися";

  const start = () => {
    if (error) return;
    const userId = isNewUser ? addUser(playerName) : selectedId;
    setLastChoice(userId, opponent);
    startMatch(userId, opponent);
    navigate(ROUTES.game(userId));
  };

  return {
    users,
    selectedId: isNewUser ? NEW_USER : selectedId,
    isNewUser,
    newName,
    opponent,
    isPvc,
    error,
    settingsSummary: describeSettings(settings),
    selectUser: setSelectedId,
    setNewName: (value) => setNewName(value.slice(0, MAX_NAME_LENGTH)),
    setOpponent: (value) => setOpponent(value.slice(0, MAX_NAME_LENGTH)),
    start,
  };
}
