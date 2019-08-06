import { SHIP_OPTIONS, createShip } from "./shipSetup";
import { createPlayer } from "../classes/playerObject";
import { createBoard } from "../classes/boardObject";
import { horizontalCheck, verticalCheck } from "./placeShipChecks";
import { placeShips } from "./shipSetup";

function setupComputer() {
  let computer = createPlayer({ name: "computer", computer: true });
  let compboard = createBoard();
  computer.board = compboard;
  let computerComplete = placeAllCompShips({ computer: computer });
  return computerComplete;
}

function placeAllCompShips(options) {
  const { computer } = options;
  for (let j = 0; j < SHIP_OPTIONS.length; j++) {
    let vertical = Math.random() > 0.5 ? true : false;
    let ship = createShip(SHIP_OPTIONS[j]);

    let spot = findGridForCompShipPlacement({
      vertical: vertical,
      ship: ship,
      computer: computer
    });
    placeShips({
      player: computer,
      vertical: vertical,
      ship: ship,
      id: spot
    });
  }
  return computer;
}

function findGridForCompShipPlacement(options) {
  const { vertical, ship, computer } = options;
  let spot = Math.floor(Math.random() * 80);
  while (!computerTryPlaceShip(spot, vertical, ship, computer)) {
    spot = Math.floor(Math.random() * 80);
  }
  return spot;
}

function computerTryPlaceShip(id, vertical, ship, computer) {
  return vertical
    ? verticalCheck({ id: id, ship: ship, player: computer })
    : horizontalCheck({ id: id, ship: ship, player: computer });
}

export { setupComputer };
