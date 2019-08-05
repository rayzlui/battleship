import { GAME_OVER } from '../actions/actionTypes'
export function gameOverReducer(state = false, actions){
  switch(actions.type){
    case GAME_OVER:
      return true;
    default:
      return state
    }
}