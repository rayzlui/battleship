import { setupPlayers, setupComputer } from "../helperFunctions/player_setup_module";
import { START_ONE_PLAYER, START_TWO_PLAYER, RECEIVE_ATTACK_TWO, PLACE_SHIP_TWO, PLAYER_TWO_PLACED } from '../actions/actionTypes'

export function nextPlayerReducer(state = null, actions){
  const { type, shipPlace  } = actions

  switch(type){
    case START_ONE_PLAYER:
      return setupComputer()
    case START_TWO_PLAYER:
      return setupPlayers('2')
    case RECEIVE_ATTACK_TWO:
      return Object.assign({}, state, state.board[target].hit = true
    )
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
    case PLAYER_TWO_PLACED:
    return Object.assign({}, state, state.shipsPlaced = true)
    default:
      return state
  }
}