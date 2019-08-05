import { nextPlayerReducer } from "./nextPlayerReducer";
import { currentPlayerReducer } from "./currentPlayerReducer";
import { gameStartReducer } from "./gameStartReducer";
import { nextTurnReducer } from "./nextTurnReducer"
import { combineReducers } from 'redux'
import { gameOverReducer } from "./gameoverReducer";
import { placedShipsReducer } from './placedShipsReducer'

export const rootReducer = combineReducers({
  currentPlayer: currentPlayerReducer,
  nextPlayer: nextPlayerReducer,
  gameStart: gameStartReducer,
  placedShips: placedShipsReducer,
  gameOver: gameOverReducer,
  postAttack: false,
  nextTurn: nextTurnReducer,
})