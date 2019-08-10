import { PLACED_SHIPS_COMPLETED } from '../actions/actionTypes';

export function placedShipsReducer(state = false, actions) {
  switch (actions.type) {
    case PLACED_SHIPS_COMPLETED:
      return true;
    default:
      return state;
  }
}
