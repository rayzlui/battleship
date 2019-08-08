import { connect } from 'react-redux';
import { receiveAttackOne, receiveAttackTwo } from '../actions/actions';
import { AttackView } from '../views/AttackView';

function mapStateToProps(state) {
  return {
    gameStart: state.gameStart,
    playerOne: state.playerOne,
    playerTwo: state.playerTwo,
    postAttack: state.postAttack,
    nextTurn: state.nextTurn,
    placedShips: state.placedShips,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    attackPlayerOne: target => dispatch(receiveAttackOne(target)),
    attackPlayerTwo: target => dispatch(receiveAttackTwo(target)),
  };
}

export const AttackViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AttackView);
