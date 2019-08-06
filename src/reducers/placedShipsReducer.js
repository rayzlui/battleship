import { SHIPS_PLACED } from "../actions/actionTypes";

export function placedShipsReducer(state = false, actions) {
  switch (actions.type) {
    case SHIPS_PLACED:
      return true;
    default:
      return state;
  }
}
