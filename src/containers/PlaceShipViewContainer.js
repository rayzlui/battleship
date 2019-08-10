import { connect } from 'react-redux';
import {
  completeShipPlacement,
  placeShipOne,
  placeShipTwo,
} from '../actions/actions';
import { PlaceShipView } from '../views/PlaceShipView';

function mapStateToProps(state) {
  return {
    playerOne: state.playerOne,
    playerTwo: state.playerTwo,
    placedShips: state.placedShips,
    gameStart: state.gameStart,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    completedPlacement: () => dispatch(completeShipPlacement()),
    placeShipOne: options => dispatch(placeShipOne(options)),
    placeShipTwo: options => dispatch(placeShipTwo(options)),
  };
}

export const PlaceShipViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaceShipView);
