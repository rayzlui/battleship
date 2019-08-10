import { connect } from 'react-redux';
import {
  receiveAttackOne,
  beginAttack,
  endHoldScreen,
  startAttackTwo,
  startAttackOne,
  updateAttackOptions,
} from '../actions/actions';
import { PostAttackView } from '../views/PostAttackView';

function mapStateToProps(state) {
  return {
    playerOne: state.playerOne,
    playerTwo: state.playerTwo,
    postAttack: state.postAttack,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    startAttackOne: () => dispatch(startAttackOne()),
    startAttackTwo: () => dispatch(startAttackTwo()),
    endHoldScreen: () => dispatch(endHoldScreen()),
    beginAttack: () => dispatch(beginAttack()),
    attackPlayerOne: target => dispatch(receiveAttackOne(target)),
    updateComputerAttackOptions: target =>
      dispatch(updateAttackOptions(target)),
  };
}

export const PostAttackContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostAttackView);
