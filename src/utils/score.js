import { DRAW, PLAYER_O, PLAYER_X } from "./gameLogic";

export const EMPTY_SCORE = { [PLAYER_X]: 0, [PLAYER_O]: 0, [DRAW]: 0 };

export const addResult = (score, winner) => ({
  ...score,
  [winner]: (score[winner] ?? 0) + 1,
});

export const getPlayedRounds = (score) => score[PLAYER_X] + score[PLAYER_O] + score[DRAW];

// Переможець матчу — той, хто першим набрав roundsToWin перемог (або null).
export const getMatchWinner = (score, roundsToWin) =>
  [PLAYER_X, PLAYER_O].find((player) => score[player] >= roundsToWin) ?? null;
