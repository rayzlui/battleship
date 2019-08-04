import React from 'react';
import {placeShips} from '../helperFunctions/ship_module'
import {setupComputer, setupPlayers} from '../helperFunctions/player_setup_module'
import {registerAttack, horizontalcheck, verticalcheck} from '../helperFunctions/gameplay_module'
import { computerAttackLocation } from '../helperFunctions/computerAttack'
import {GameModeBoard, PlaceShipsBoard} from './boards_module'
import {IntroPage, GameOverHeader, StartNextRoundButton} from './dom_stuff'
import {isGameOver} from '../classes/board'


 
export class RootView extends React.Component{

  
  constructor(props){
    super(props)
    this.state = {
      currentPlayer: null ,
      nextPlayer: null,
      gameStart: false,
      placedShips: false,
      gameover: false,
      postAttack: false,
      nextturn: false
  
    }

    this.startOnePlayer = this.startOnePlayer.bind(this)
    this.startTwoPlayer = this.startTwoPlayer.bind(this)
    this.selectGridForShip = this.selectGridForShip.bind(this)
    this.receiveAttack = this.receiveAttack.bind(this)
  }

  
  //dispatch(startOnePlayer)
  startOnePlayer(){
    var player = setupPlayers("1")
    var computer = setupComputer({placeShipForComputer: this.placeShipForComputer})
    this.setState({currentPlayer: player, nextPlayer: computer, gameStart: true})
  }

  //dispatch(startTwoPlayer)
  startTwoPlayer(){
    
    var player1 = setupPlayers("1")
    var player2 = setupPlayers("2")
    this.setState({currentPlayer: player1, nextPlayer: player2, gameStart: true, nextturn: true})
  }

 
  
  selectGridForShip(id, vertical, ship, player = this.state.currentPlayer){
    var legalPlacement = vertical? verticalcheck({id: id, ship: ship, player: player} ) : horizontalcheck({id: id, ship: ship, player: player})
   
    if (legalPlacement){
      
      player = placeShips({player: player, vertical: vertical, ship: ship, id: id})
      //this setState updates the board to display where the ship was placed.
      this.setState({currentPlayer: player})

      if (player.ships.length === 5){
  
        this.state.nextPlayer.ships.length === 0 ? this.setState({currentPlayer: this.state.nextPlayer, nextPlayer: this.state.currentPlayer, nextturn: true}) : this.setState({placedShips: true, nextturn: true})
      }      
    }else{

      alert("Error: You either have a piece there or it goes offboard")
  
    }
  }

  //dispatch(runComputerTurn) or dispatch(postAttack) or dispatch(gameOver)
  receiveAttack(id){

    var opponent = this.state.nextPlayer
    registerAttack({receiver: opponent, target: id, comp: false, attacker: null})
    
    if (isGameOver(opponent.board)){
      this.setState({gameover: true})
    }else{
      (opponent.computer === true) ? this.runComputerTurn.bind(this)() : this.setState({postAttack: true})
    }
    
      
  }
  //dispatch(switchPlayers) or this can be dealt with in useState() for battleView
  switchPlayers(){  
    this.setState({currentPlayer: this.state.nextPlayer, nextPlayer: this.state.currentPlayer, postAttack: false, nextturn: true})
      
  }

  //dispatch(endComputerTurn)
  runComputerTurn(){ 
    var opponent = this.state.nextPlayer
    var player = this.state.currentPlayer
    var target = computerAttackLocation(opponent)
    registerAttack({receiver: player, target: target, computer: true, attacker: opponent})
    this.setState({currentPlayer: player, nextPlayer: opponent})
  }


  
  //dispatch(startTurn)
  startTurn(){  
    this.setState({nextturn: false})  
  }

  generateDisplay(){
    //move function out as it does not actually set state.
    let display
    if (this.state.gameStart === false){

      display = <IntroPage startOne = {this.startOnePlayer} startTwo = {this.startTwoPlayer}/>

    }else if (this.state.nextturn){
      //next turn is triggered by switchplayers, which is in the last part of the function.
      display = StartNextRoundButton({ startTurn: this.startTurn.bind(this), currentPlayer: this.state.currentPlayer})

    }else if (this.state.placedShips === false){

      //display = setupShipPlacementBoard({state:this.state, selectGridForShip: this.selectGridForShip })
      display = <PlaceShipsBoard  player = {this.state.currentPlayer}  selectGridForShip = {this.selectGridForShip}/>
    }else{

      var click = this.receiveAttack
      var header = <h2>{this.state.currentPlayer.name + " Turn"}</h2>

      //it will be either gameover or postAttack, never both.
      if (this.state.gameover === true){
        click = null
        header = GameOverHeader({name:this.state.currentPlayer.name})
        
      }

      if (this.state.postAttack){
        header = <h2>Click on any empty attack grid to end turn.</h2>
        click = this.switchPlayers.bind(this)
      }

      display = 
        <div className = "attack-board">
          {header}
          <GameModeBoard 
            currentPlayer = {this.state.currentPlayer.board} 
            nextPlayer = {this.state.nextPlayer.board}
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







