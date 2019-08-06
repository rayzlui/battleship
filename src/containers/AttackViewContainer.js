import { connect } from "react-redux";
import {
  receiveAttackOne,
  receiveAttackTwo,
  startAttackOne,
  endHoldScreen,
  startAttackTwo,
  startAttack
} from "../actions/actions";
import { AttackView } from "../views/AttackView";

function mapStateToProps(state) {
  return {
    gameStart: state.gameStart,
    currentPlayer: state.currentPlayer,
    nextPlayer: state.nextPlayer,
    gameOver: state.gameOver,
    postAttack: state.postAttack,
    nextTurn: state.nextTurn,
    placedShips: state.placedShips
  };
}

function mapDispatchToProps(dispatch) {
  return {
    attackPlayerOne: target => dispatch(receiveAttackOne(target)),
    attackPlayerTwo: target => dispatch(receiveAttackTwo(target)),
    startAttackOne: () => dispatch(startAttackOne()),
    startAttackTwo: () => dispatch(startAttackTwo()),
    endHoldScreen: () => dispatch(endHoldScreen()),
    startAttack: () => dispatch(startAttack())
  };
}

export const AttackViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AttackView);
