import { connect } from 'react-redux'
import { placeShipOne, placeShipTwo, playerOnePlaced, playerTwoPlaced } from '../actions/actions'
import { PlaceShipsBoard } from '../views/boards_module';

function mapDispatchToState(dispatch){
  return({
    placeShipOne: options => dispatch(placeShipOne(options)),
    placeShipTwo: options => dispatch(placeShipTwo(options)),
    playerOnePlaced: () => dispatch(playerOnePlaced()),
    playerTwoPlaced: () => dispatch(playerTwoPlaced())
  })
}

export const PlaceShipsBoardContainer = connect(
  null,
  mapDispatchToState,
)(PlaceShipsBoard)