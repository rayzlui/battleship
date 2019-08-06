import * as actions from "./actionTypes";

export function startOnePlayer() {
  return { type: actions.START_ONE_PLAYER };
}

export function startTwoPlayer() {
  return { type: actions.START_TWO_PLAYER };
}

export function receiveAttackOne(id) {
  return { type: actions.RECEIVE_ATTACK_ONE, id: id };
}

export function receiveAttackTwo(id) {
  return { type: actions.RECEIVE_ATTACK_TWO, id: id };
}

export function placeShipOne(options) {
  return { type: actions.PLACE_SHIP_ONE, shipPlace: options };
}

export function placeShipTwo(options) {
  return { type: actions.PLACE_SHIP_TWO, shipPlace: options };
}

export function gameOver() {
  return { type: actions.GAME_OVER };
}

export function placedShips() {
  return { type: actions.PLACED_SHIPS };
}

export function playerOnePlaced() {
  return { type: actions.PLAYER_ONE_PLACED };
}

export function playerTwoPlaced() {
  return { type: actions.PLAYER_TWO_PLACED };
}

export function startAttackOne() {
  return { type: actions.START_ATTACK_ONE };
}

export function startAttackTwo() {
  return { type: actions.START_ATTACK_TWO };
}

export function startAttack() {
  return { type: actions.START_ATTACK };
}

export function endHoldScreen() {
  return { type: actions.END_HOLD_SCREEN };
}
export function completeShipPlacement() {
  return { type: actions.SHIPS_PLACED };
}
