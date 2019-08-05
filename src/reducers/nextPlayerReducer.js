import { setupPlayers, setupComputer } from "../helperFunctions/player_setup_module";
import { START_ATTACK_TWO, START_ONE_PLAYER, START_TWO_PLAYER, RECEIVE_ATTACK_TWO, PLACE_SHIP_TWO, PLAYER_TWO_PLACED, RECEIVE_ATTACK_ONE, START_ATTACK_ONE } from '../actions/actionTypes'

export function nextPlayerReducer(state = null, actions){
  const { type, shipPlace, id  } = actions

  switch(type){
    case START_ONE_PLAYER:
      return setupComputer()
    case START_TWO_PLAYER:
      return setupPlayers('2')
    case RECEIVE_ATTACK_ONE:
      return Object.assign({}, state)
    case RECEIVE_ATTACK_TWO:
      return Object.assign({}, state, state.board[id].hit = true)
    case PLACE_SHIP_TWO:
        const {ship, target, vertical} = shipPlace
  
        const board = state.board
        for (let i = 0; i < ship.length; i++ ){
          let x = i
          if (vertical === true){
            x = i*9
          }
          board[target + x].ship = ship
        }
      return Object.assign({}, state, state.ships.push(ship))
    case START_ATTACK_ONE:
      return Object.assign({}, state, state.turn = false)
    case START_ATTACK_TWO:
      return Object.assign({}, state, state.turn = true)
    case PLAYER_TWO_PLACED:
      return Object.assign({}, state, state.shipsPlaced = true)
    default:
      return state
  }
}