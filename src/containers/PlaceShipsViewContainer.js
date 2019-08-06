import { connect } from "react-redux";
import {
  placeShipOne,
  placeShipTwo,
  playerOnePlaced,
  playerTwoPlaced,
  completeShipPlacement
} from "../actions/actions";
import { PlaceShipsView } from "../views/PlaceShipsView";

function mapStateToProps(state) {
  return {
    currentPlayer: state.currentPlayer,
    nextPlayer: state.nextPlayer,
    placedShips: state.placedShips,
    gameStart: state.gameStart
  };
}

function mapDispatchToProps(dispatch) {
  return {
    placeShipOne: options => dispatch(placeShipOne(options)),
    placeShipTwo: options => dispatch(placeShipTwo(options)),
    playerOnePlaced: () => dispatch(playerOnePlaced()),
    playerTwoPlaced: () => dispatch(playerTwoPlaced()),
    completedPlacement: () => dispatch(completeShipPlacement())
  };
}

export const PlaceShipsViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceShipsView);
