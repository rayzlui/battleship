import { setupPlayers } from "../helperFunctions/playerSetup";
import { setupComputer } from "../helperFunctions/computerSetup";
import {
  START_ATTACK_TWO,
  START_ONE_PLAYER,
  RECEIVE_ATTACK_TWO,
  PLACE_SHIP_TWO,
  PLAYER_TWO_PLACED,
  RECEIVE_ATTACK_ONE,
  START_ATTACK_ONE
} from "../actions/actionTypes";

export function nextPlayerReducer(state = setupPlayers("2"), actions) {
  const { type, shipPlace, id } = actions;
  let copyBoard = state.board.map(grid => Object.assign({}, grid));
  let copyShips = state.ships.map(grid => Object.assign({}, grid));
  let changes;
  switch (type) {
    case START_ONE_PLAYER:
      return setupComputer();
    case RECEIVE_ATTACK_ONE:
      if (state.computer) {
        const copyattackOptions = state.attackOptions.slice();
        copyattackOptions.splice(id, 1);
        changes = { targetHit: id, attackOptions: copyattackOptions };
        //prevents compuer from attacking the same spot.
      }
      return Object.assign({}, state, changes);

    case RECEIVE_ATTACK_TWO:
      changes = { loser: false, board: copyBoard, ships: copyShips };
      copyBoard[id].hit = true;
      let findShip = copyBoard[id].ship;
      if (findShip !== null) {
        findShip.shiphits++;
        if (findShip.shiphits === findShip.length) {
          findShip.sunk = true;
          alert(`Player Two's ${findShip.name} has sunk`);
        }
        let index = copyShips.indexOf(x => x.name === findShip.name);
        copyShips.splice(index, 1, findShip);
        if (copyShips.every(ship => ship.shiphits === ship.length)) {
          changes["loser"] = true;
        }
      }
      return Object.assign({}, state, changes);

    case PLACE_SHIP_TWO:
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

    case START_ATTACK_ONE:
      changes = { turn: false };
      return Object.assign({}, state, changes);

    case START_ATTACK_TWO:
      changes = { turn: true };
      return Object.assign({}, state, changes);

    case PLAYER_TWO_PLACED:
      changes = { shipsPlaced: true };
      return Object.assign({}, state, changes);

    default:
      return state;
  }
}
