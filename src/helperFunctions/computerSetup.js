import { SHIP_OPTIONS, createShip } from './shipSetup';
import { createPlayer } from '../classes/playerObject';
import { createBoard } from '../classes/boardObject';
import { checkLegalMove } from './placeShipChecks';

function setupComputer() {
  let compboard = createBoard();
  let computer = createPlayer({
    name: 'computer',
    computer: true,
    board: compboard,
    attackOptions: computerAttackOptions(),
  });
  let computerComplete = placeAllCompShips(computer);
  return computerComplete;
}

export function computerAttackOptions() {
  let attackOptions = [];
  for (let i = 0; i <= 80; i++) {
    attackOptions.push(i);
  }
  return attackOptions;
}

export function placeAllCompShips(computer) {
  for (let j = 0; j < SHIP_OPTIONS.length; j++) {
    let vertical = Math.random() > 0.5 ? true : false;
    let shipOption = SHIP_OPTIONS[j];
    let ship = createShip(shipOption);

    let spot = findGridForCompShipPlacement({
      vertical: vertical,
      ship: ship,
      computer: computer,
    });

    placeShips({
      player: computer,
      vertical: vertical,
      ship: ship,
      target: spot,
    });
  }
  return computer;
}

export function placeShips(options) {
  const { player, target, ship, vertical } = options;
  for (let i = 0; i < ship.length; i++) {
    let x = i;
    if (vertical === true) {
      x = i * 9;
    }
    player.board[target + x].ship = ship;
  }
  player.ships.push(ship);

  return player;
}

export function findGridForCompShipPlacement(
  options,
  checkMove = checkLegalMove,
) {
  const { vertical, ship, computer } = options;
  let spot = Math.floor(Math.random() * 80);
  while (!checkMove({ spot: spot, vertical, ship, player: computer })) {
    spot = Math.floor(Math.random() * 80);
  }
  return spot;
}

export { setupComputer };
