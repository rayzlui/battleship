import { nextPlayerReducer } from "./nextPlayerReducer";
import { currentPlayerReducer } from "./currentPlayerReducer";
import { gameStartReducer } from "./gameStartReducer";
import { nextTurnReducer } from "./nextTurnReducer"

const rootReducer = combineReducers({
  currentPlayer: currentPlayerReducer,
  nextPlayer: nextPlayerReducer,
  gameStart: gameStartReducer,
  placedShips,
  gameOver,
  postAttack,
  nextTurn: nextTurnReducer,
})