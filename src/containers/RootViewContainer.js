import { RootView } from '../views/rootView'
import { connect }from 'react-redux'
import {startOnePlayer, startTwoPlayer} from '../actions/actions'

function mapStateToProps(state){
  return({
    state: state,
    placedShips: state.placedShips,
    currentPlayer: state.currentPlayer,
    nextPlayer: state.nextPlayer,
    gameStart: state.gameStart,
    gameOver: state.gameOver,
    postAttack: state.postAttack,
    nextTurn: state.nextTurn,
  })
}

function mapDispatchToProps(dispatch){
  return({
    startOnePlayer: () => dispatch(startOnePlayer()),
    startTwoPlayer: () => dispatch(startTwoPlayer()),
  })
}

export const RootViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootView)