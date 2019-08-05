import { END_HOLD_SCREEN, PLAYER_TWO_PLACED, START_ATTACK } from '../actions/actionTypes'

export function nextTurnReducer(state = false, actions){
  switch(actions.type){
    case START_ATTACK:
      return false;
    case END_HOLD_SCREEN:
    case PLAYER_TWO_PLACED:
      return true;
    default:
      return state
  }
}