import * as actions from './actionTypes'

export function startOnePlayer(){
  return { type: actions.START_ONE_PLAYER }
}

export function startTwoPlayer(){
  return { type: actions.START_TWO_PLAYER}
}

export function receiveAttackOne(target){
  return { type: actions.RECEIVE_ATTACK_ONE, target: target}
}

export function receiveAttackTwo(target){
  return { type: actions.RECEIVE_ATTACK_TWO, target: target}
}

export function placeShipOne(options){
  return { type: actions.PLACE_SHIP_ONE, shipPlace: options }
}

export function placeShipTwo(options){
  return { type: actions.PLACE_SHIP_TWO, shipPlace: options }
}

export function gameOver(){
  return { type: actions.GAME_OVER }
}

export function placedShips(){
  return { type: actions.PLACED_SHIPS}
}

export function playerOnePlaced(){
  return { type: actions.PLAYER_ONE_PLACED}
}

export function playerTwoPlaced(){
  return { type: actions.PLAYER_TWO_PLACED}
}