import { setupPlayers } from '../helperFunctions/playerSetup';
import {
  START_ATTACK_ONE,
  RECEIVE_ATTACK_ONE,
  PLACE_SHIP_ONE,
  START_ATTACK_TWO,
} from '../actions/actionTypes';

export function playerOneReducer(state = setupPlayers('1'), actions) {
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
    case RECEIVE_ATTACK_ONE:
      changes = { loser: false, board: copyBoard, ships: copyShips };
      copyBoard[target].hit = true;
      let findShip = copyBoard[target].ship;
      if (findShip !== null) {
        findShip.shiphits++;
        if (findShip.shiphits === findShip.length) {
          findShip.sunk = true;
          alert(`Player One's ${findShip.name} has sunk`);
        }
        if (copyShips.every(ship => ship.shiphits === ship.length)) {
          changes['loser'] = true;
        }
      }
      return Object.assign({}, state, changes);

    case PLACE_SHIP_ONE:
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
        changes['turn'] = true;
      }
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
