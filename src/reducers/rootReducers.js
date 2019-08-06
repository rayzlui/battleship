import { nextPlayerReducer } from "./nextPlayerReducer";
import { currentPlayerReducer } from "./currentPlayerReducer";
import { gameStartReducer } from "./gameStartReducer";
import { nextTurnReducer } from "./nextTurnReducer";
import { combineReducers } from "redux";
import { placedShipsReducer } from "./placedShipsReducer";
import { postAttackReducer } from "./postAttackReducer";

export const rootReducer = combineReducers({
  currentPlayer: currentPlayerReducer,
  nextPlayer: nextPlayerReducer,
  gameStart: gameStartReducer,
  placedShips: placedShipsReducer,
  postAttack: postAttackReducer,
  nextTurn: nextTurnReducer
});
