import { playerTwoReducer } from './playerTwoReducer';
import { playerOneReducer } from './playerOneReducer';
import { gameStartReducer } from './gameStartReducer';
import { nextTurnReducer } from './nextTurnReducer';
import { combineReducers } from 'redux';
import { placedShipsReducer } from './placedShipsReducer';
import { postAttackReducer } from './postAttackReducer';

export const rootReducer = combineReducers({
  playerOne: playerOneReducer,
  playerTwo: playerTwoReducer,
  gameStart: gameStartReducer,
  placedShips: placedShipsReducer,
  postAttack: postAttackReducer,
  nextTurn: nextTurnReducer,
});
