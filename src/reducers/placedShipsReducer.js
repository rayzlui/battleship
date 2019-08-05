import { PLACED_SHIPS } from '../actions/actionTypes'

export function placedShipsReducer(state = false, actions){
  switch(actions.type){
    case PLACED_SHIPS:
      return true;
    default:
      return state;
  }
}