import { setupPlayers } from '../helperFunctions/playerSetup';
import { setupComputer } from '../helperFunctions/computerSetup';
import {
  START_ATTACK_TWO,
  START_ONE_PLAYER,
  RECEIVE_ATTACK_TWO,
  PLACE_SHIP_TWO,
  RECEIVE_ATTACK_ONE,
  START_ATTACK_ONE,
  UPDATE_ATTACK_OPTIONS,
} from '../actions/actionTypes';

export function playerTwoReducer(state = setupPlayers('2'), actions) {
  const { type, shipPlace, target } = actions;
  let copyShips = state.ships.map(ship => Object.assign({}, ship));
  let copyBoard = state.board.map(grid => {
    if (grid.ship !== null) {
      let name = grid.ship.name;
      let copyShip = copyShips.find(ship => ship.name === name);
      return Object.assign({}, grid, { ship: copyShip });
    } else {
      return Object.assign({}, grid);
    }
  });
  let changes;
  switch (type) {
    case START_ONE_PLAYER:
      return setupComputer();
    case RECEIVE_ATTACK_ONE:
      if (state.computer) {
        const copyattackOptions = state.attackOptions.slice();
        copyattackOptions.splice(target, 1);
        changes = { targetHit: target, attackOptions: copyattackOptions };
        //prevents compuer from attacking the same spot.
      }
      return Object.assign({}, state, changes);

    case RECEIVE_ATTACK_TWO:
      changes = { loser: false, board: copyBoard, ships: copyShips };
      copyBoard[target].hit = true;
      let findShip = copyBoard[target].ship;
      if (findShip !== null) {
        findShip.shiphits++;
        if (findShip.shiphits === findShip.length) {
          findShip.sunk = true;
          alert(`Player Two's ${findShip.name} has sunk`);
        }
        if (copyShips.every(ship => ship.shiphits === ship.length)) {
          changes['loser'] = true;
        }
      }
      return Object.assign({}, state, changes);

    case PLACE_SHIP_TWO:
      const { ship, spot, vertical } = shipPlace;
      changes = { ships: copyShips, board: copyBoard };
      for (let i = 0; i < ship.length; i++) {
        let x = i;
        if (vertical === true) {
          x = i * 9;
        }
        copyBoard[spot + x].ship = ship;
      }
      copyShips.push(ship);
      if (copyShips.length === 5) {
        changes['shipsPlaced'] = true;
      }
      return Object.assign({}, state, changes);

    case START_ATTACK_ONE:
      changes = { turn: false };
      return Object.assign({}, state, changes);

    case START_ATTACK_TWO:
      changes = { turn: true };
      return Object.assign({}, state, changes);

    case UPDATE_ATTACK_OPTIONS:
      let copyAttackOptions = state.attackOptions.slice();
      copyAttackOptions.splice(target, 1);
      changes = { attackOptions: copyAttackOptions };
      return Object.assign({}, state, changes);
    default:
      return state;
  }
}
