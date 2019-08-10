import {
  END_HOLD_SCREEN,
  BEGIN_ATTACK,
  PLACED_SHIPS_COMPLETED,
} from '../actions/actionTypes';

export function nextTurnReducer(state = false, actions) {
  switch (actions.type) {
    case BEGIN_ATTACK:
      return false;
    case END_HOLD_SCREEN:
    case PLACED_SHIPS_COMPLETED:
      return true;
    default:
      return state;
  }
}
