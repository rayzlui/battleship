import { connect } from "react-redux";
import { IntroPage } from "../views/IntroPage";
import { startOnePlayer, startTwoPlayer } from "../actions/actions";

function mapStateToProps(state) {
  return {
    gameStart: state.gameStart
  };
}

function mapDispatchToProps(dispatch) {
  return {
    startOnePlayer: () => dispatch(startOnePlayer()),
    startTwoPlayer: () => dispatch(startTwoPlayer())
  };
}

export const IntroPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(IntroPage);
