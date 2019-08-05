import { START_ONE_PLAYER } from '../actions/actionTypes'

export function nextTurnReducer(state = false, actions){
  switch(actions.type){
    case START_ONE_PLAYER:
      return true
    default:
      return state
  }
}