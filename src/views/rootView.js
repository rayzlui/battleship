import React from 'react';
import {placeShips} from '../helperFunctions/ship_module'
import {setupComputer, setupPlayers} from '../helperFunctions/player_setup_module'
import {registerAttack, horizontalcheck, verticalcheck} from '../helperFunctions/gameplay_module'
import { computerAttackLocation } from '../helperFunctions/computerAttack'
import {GameModeBoard, PlaceShipsBoard} from './boards_module'
import {IntroPage, GameOverHeader, StartNextRoundButton} from './dom_stuff'
import {isGameOver} from '../classes/board'
import { PlaceShipsBoardContainer } from '../containers/PlaceShipsBoardContainer'
import { startAttackTwo } from '../actions/actions';


 
export class RootView extends React.Component{

  
  constructor(props){
    super(props)
    this.state = this.props.state
    this.startOnePlayer = this.props.startOnePlayer
    this.startTwoPlayer = this.props.startTwoPlayer
    this.receiveAttack = this.receiveAttack.bind(this)
  }


  //dispatch(runComputerTurn) or dispatch(postAttack) or dispatch(gameOver)
  receiveAttack(id){

    var opponent = this.props.nextPlayer
    
    if (isGameOver(opponent.board)){
      this.setState({gameover: true})
    }else{
      (opponent.computer === true) ? this.runComputerTurn.bind(this)() : this.setState({postAttack: true})
    }
    
      
  }
  //dispatch(switchPlayers) or this can be dealt with in useState() for battleView
  switchPlayers(){  
    this.setState({currentPlayer: this.props.nextPlayer, nextPlayer: this.props.currentPlayer, postAttack: false, nextturn: true})
      
  }

  //dispatch(endComputerTurn)
  runComputerTurn(){ 
    var opponent = this.props.nextPlayer
    var player = this.props.currentPlayer
    var target = computerAttackLocation(opponent)
    registerAttack({receiver: player, target: target, computer: true, attacker: opponent})
    this.setState({currentPlayer: player, nextPlayer: opponent})
  }


  generateDisplay(){
    //move function out as it does not actually set state.
    let display
    if (this.props.gameStart === false){

      display = <IntroPage startOne = {this.startOnePlayer} startTwo = {this.startTwoPlayer}/>

    }else if (this.props.nextTurn){
      //next turn is triggered by switchplayers, which is in the last part of the function.
      display = StartNextRoundButton({startTurn: this.props.startAttack, currentPlayer: this.props.currentPlayer.turn ? this.props.currentPlayer.name : this.props.nextPlayer.name})

    }else if (!this.props.currentPlayer.shipsPlaced){
      //display = setupShipPlacementBoard({state:this.state, selectGridForShip: this.selectGridForShip })
      display = <PlaceShipsBoardContainer  player = {this.props.currentPlayer}  />
    } else if (!this.props.nextPlayer.shipsPlaced){
      display = <PlaceShipsBoardContainer  player = {this.props.nextPlayer}  />
    }else{

      var click = this.props.currentPlayer.turn ? id => this.props.attackPlayerTwo(id) : id => this.props.attackPlayerOne(id)
      var header = <h2>{this.props.currentPlayer.turn ?  this.props.currentPlayer.name : this.props.nextPlayer.name + " Turn"}</h2>
      let attacker = this.props.currentPlayer.turn ? this.props.currentPlayer : this.props.nextPlayer
      let defender = this.props.currentPlayer.turn ? this.props.nextPlayer : this.props.currentPlayer
      //it will be either gameover or postAttack, never both.
      if (this.props.gameOver === true){
        click = null
        header = GameOverHeader({name:this.props.currentPlayer.name})
        
      }

      if (this.props.postAttack){
        header = <h2>Click on any empty attack grid to end turn.</h2>
        click = () => { 
          this.props.endHoldScreen()
          this.props.currentPlayer.turn ? this.props.startAttackTwo() : this.props.startAttackOne()
        }
        
      }
      display = 
        <div className = "attack-board">
          {header}
          <GameModeBoard 
            currentPlayer = {attacker} 
            nextPlayer = {defender}
            isOwnBoard = {true}
            receiveAttack = {click}
          />
        </div>
      }
    return display
  }

  render(){

    var display = this.generateDisplay.bind(this)()

    return(
      <div className = "game-container" style = {{textAlign: "center", display: "inline-block"}}>
        <div className = "game-title">
          <h1 className = "title">BATTLETO-- SHIPS. BATTLE SHIPS</h1>
        </div>
        <div className = "display-continer">
          {display}
        </div>
      </div>

    )
  }

}


export default RootView;







