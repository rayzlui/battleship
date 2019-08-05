import { setupPlayers } from "../helperFunctions/player_setup_module";
import { START_ATTACK_ONE, START_ONE_PLAYER, START_TWO_PLAYER, RECEIVE_ATTACK_ONE, PLACE_SHIP_ONE, PLAYER_ONE_PLACED, PLAYER_TWO_PLACED, RECEIVE_ATTACK_TWO, START_ATTACK_TWO } from '../actions/actionTypes'
export function currentPlayerReducer(state = null, actions){
  const { type, shipPlace, id } = actions
  switch(type){
    case START_ONE_PLAYER:
    case START_TWO_PLAYER:
      return setupPlayers('1')
    case RECEIVE_ATTACK_ONE:
      return Object.assign({}, state, state.board[id].hit = true);
    case RECEIVE_ATTACK_TWO:
      return Object.assign({}, state)
    case PLACE_SHIP_ONE:
      const {ship, target, vertical} = shipPlace

      const board = state.board.slice()
      for (let i = 0; i < ship.length; i++ ){
        let x = i
        if (vertical === true){
          x = i*9
        }
        board[target + x].ship = ship
      }
      return Object.assign({}, state, state.ships.push(ship))
    case PLAYER_ONE_PLACED:
      return Object.assign({}, state, state.shipsPlaced = true)
    case PLAYER_TWO_PLACED:
      return Object.assign({}, state, state.turn = true)
    case START_ATTACK_ONE:
        return Object.assign({}, state, state.turn = true)
    case START_ATTACK_TWO:
      return Object.assign({}, state, state.turn = false)
    default:
      return state;
  }
}