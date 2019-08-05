import { START_ATTACK_ONE, START_ATTACK_TWO, RECEIVE_ATTACK_TWO, RECEIVE_ATTACK_ONE } from '../actions/actionTypes'

export function postAttackReducer(state = false, actions){
  switch(actions.type){
    case RECEIVE_ATTACK_ONE:
    case RECEIVE_ATTACK_TWO:
      return true
    case START_ATTACK_ONE:
    case START_ATTACK_TWO:
      return false
    default:
      return state
  }
}