import { StartRoundButton } from '../views/StartRoundButton';
import { connect } from 'react-redux';
import { beginAttack } from '../actions/actions';

function mapStateToProps(state) {
  return {
    playerOne: state.playerOne,
    playerTwo: state.playerTwo,
    nextTurn: state.nextTurn,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    beginAttack: () => dispatch(beginAttack()),
  };
}

export const StartRoundButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StartRoundButton);
