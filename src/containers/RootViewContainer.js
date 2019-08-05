import { RootView } from '../views/rootView'
import { connect }from 'react-redux'
import {startOnePlayer, startTwoPlayer, receiveAttackOne, receiveAttackTwo, startAttackOne, endHoldScreen, startAttackTwo, startAttack} from '../actions/actions'

function mapStateToProps(state){
  return({
    state: state,
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
    attackPlayerOne: target => dispatch(receiveAttackOne(target)),
    attackPlayerTwo: target => dispatch(receiveAttackTwo(target)),
    startAttackOne: () => dispatch(startAttackOne()),
    startAttackTwo: () => dispatch(startAttackTwo()),
    endHoldScreen: () => dispatch(endHoldScreen()),
    startAttack: () => dispatch(startAttack()),

    
  })
}

export const RootViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootView)