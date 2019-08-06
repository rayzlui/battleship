import { setupPlayers } from "../helperFunctions/playerSetup";
import {
  START_ATTACK_ONE,
  RECEIVE_ATTACK_ONE,
  PLACE_SHIP_ONE,
  PLAYER_ONE_PLACED,
  START_ATTACK_TWO
} from "../actions/actionTypes";

export function currentPlayerReducer(state = setupPlayers("1"), actions) {
  const { type, shipPlace, id } = actions;
  let copyBoard = state.board.map(grid => Object.assign({}, grid));
  let copyShips = state.ships.map(grid => Object.assign({}, grid));
  let changes;
  switch (type) {
    case RECEIVE_ATTACK_ONE:
      changes = { loser: false, board: copyBoard, ships: copyShips };
      copyBoard[id].hit = true;
      let findShip = copyBoard[id].ship;
      if (findShip !== null) {
        findShip.shiphits++;
        if (findShip.shiphits === findShip.length) {
          findShip.sunk = true;
          alert(`Player One's ${findShip.name} has sunk`);
        }
        let index = copyShips.indexOf(x => x.name === findShip.name);
        copyShips.splice(index, 1, findShip);
        if (copyShips.every(ship => ship.shiphits === ship.length)) {
          changes["loser"] = true;
        }
      }
      return Object.assign({}, state, changes);

    case PLACE_SHIP_ONE:
      const { ship, target, vertical } = shipPlace;
      changes = { ships: copyShips, board: copyBoard };
      for (let i = 0; i < ship.length; i++) {
        let x = i;
        if (vertical === true) {
          x = i * 9;
        }
        copyBoard[target + x].ship = ship;
      }
      copyShips.push(ship);
      return Object.assign({}, state, changes);

    case PLAYER_ONE_PLACED:
      changes = { shipsPlaced: true, turn: true };
      return Object.assign({}, state, changes);
    case START_ATTACK_ONE:
      changes = { turn: true };
      return Object.assign({}, state, changes);

    case START_ATTACK_TWO:
      changes = { turn: false };
      return Object.assign({}, state, changes);

    default:
      return state;
  }
}
