import { setupPlayers } from "../helperFunctions/player_setup_module";

export function currentPlayerReducer(state = null, actions){
  const { target, type, ship, vertical } = actions
  switch(type){
    case START_ONE_PLAYER:
    case START_TWO_PLAYER:
      return setupPlayers('1')
    case RECEIVE_ATTACK_ONE:
      return Object.assign({}, state, state.board[target].hit = true
      )
    case PLACE_SHIP_ONE:
      const board = state.board
      for (let i = 0; i < ship.length; i++ ){
        let x = i
        if (vertical === true){
          x = i*9
        }
        board[target + x].ship = ship
      }
      return Object.assign({}, state, state.ships.push(ship), state.board = board)
    default:
      return state;
  }
}