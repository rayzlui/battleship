import { StartRoundButton } from "../views/StartRoundButton";
import { connect } from "react-redux";
import { startAttack } from "../actions/actions";

function mapStateToProps(state) {
  return {
    currentPlayer: state.currentPlayer,
    nextPlayer: state.nextPlayer,
    nextTurn: state.nextTurn
  };
}

function mapDispatchToProps(dispatch) {
  return {
    startAttack: () => dispatch(startAttack())
  };
}

export const StartRoundButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StartRoundButton);
