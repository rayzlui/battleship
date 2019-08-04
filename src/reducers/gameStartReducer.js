export function gameStartReducer(state = false, actions){
  switch(actions.type){
    case START_ONE_PLAYER:
    case START_TWO_PLAYER:
      return true
    default:
      return state 
  }
}