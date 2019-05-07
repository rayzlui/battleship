import React, { Component } from 'react';
import {createShip, setupShipPlacementBoard, placeShips} from './ship_module'
import {setupComputer, setupPlayers} from './player_setup_module'
import {registerAttack, horizontalcheck, verticalcheck, computerAttackLocation} from './gameplay_module'
import {GameModeBoard} from './boards_module'
import './App.css';

class IntroPage extends React.Component{

  render(){
    return(
      <div className = "startGame" style = {{textAlign: "center", display: "inline-block"}}>
        <button className = "oneplayer" onClick = {this.props.startOne}>One Player</button>
        <button className = "twoplayer" onClick = {this.props.startTwo}>Two Player</button>
      </div>
    )
  }
}


class App extends React.Component{

  
  constructor(props){
    super(props)
    this.state = {
      currentPlayer: null ,
      nextPlayer: null,
      gamestart: false,
      placedships: false,
      gameover: false,
      postAttack: false,
      selectedship: null,
      vertical: false,
      explosion: false,
      nextturn: false
      //if we're placing ships, when a ship a clicked it will change this selectedship to specified ship
      //and when its clicked on a grid it'll log those grids with selected ship and change back to null
    }

    this.startOnePlayer = this.startOnePlayer.bind(this)
    this.startTwoPlayer = this.startTwoPlayer.bind(this)
    this.selectGridForShip = this.selectGridForShip.bind(this)
    this.receiveAttack = this.receiveAttack.bind(this)
    this.verticalize = this.verticalize.bind(this)
    this.selectShip = this.selectShip.bind(this)
  }

  

  startOnePlayer(){
    var player = setupPlayers("you")
    var computer = setupComputer({selectGridForShip: this.selectGridForShip})
    this.setState({currentPlayer: player, nextPlayer: computer, gamestart: true})
  }

  startTwoPlayer(){
    
    var player1 = setupPlayers("1")
    var player2 = setupPlayers("2")
    this.setState({currentPlayer: player1, nextPlayer: player2, gamestart: true, nextturn: true})
  }

 
  
  selectGridForShip(id, vertical = this.state.vertical, ship = this.state.selectedship, player = this.state.currentPlayer){
  
    var legalPlacement = vertical? verticalcheck({id: id, ship: ship, player: player} ) : horizontalcheck({id: id, ship: ship, player: player})
    if (legalPlacement){
      
      player = placeShips({player: player, vertical: vertical, ship: ship, id: id})

      this.setState({currentPlayer: player, selectedship: null})

      if (player.ships.length === 5 && !player.computer){
  
        this.state.nextPlayer.ships.length === 0 ? this.setState({currentPlayer: this.state.nextPlayer, nextPlayer: this.state.currentPlayer, nextturn: true}) : this.setState({placedships: true, nextturn: true})
      }

      return true
      //if this was a legal move we return true for computer to know.
      
    }else{

      if (player.computer === false){
        alert("Error: You either have a piece there or it goes offboard")
      }else{
        return false
        //return false for computer to know
      }

    }
  }

  



  receiveAttack(id){

    //note, we should display board one more time to show the current player 
    //their attack and if it was successful, then we have a notice saying it's next player turn
    //and when the notice is confirmed show the board in two player.
    //it's going to be:
    // -set state with new attack board
    // -end turn button
    // -blank screen
    // -set state with diff player

    var opponent = this.state.nextPlayer
    registerAttack({receiver: opponent, target: id, comp: false, attacker: null})
    
    if (opponent.board.gameover()) {
      this.setState({ gameover: true})
    }

    if (opponent.computer === true){
      this.runComputerTurn.bind(this)()
    }else{  
      this.setState({postAttack: true})
    }
   
   
  
  }

  switchPlayers(){  
    this.setState({currentPlayer: this.state.nextPlayer, nextPlayer: this.state.currentPlayer, postAttack: false, nextturn: true})
      
  }

  runComputerTurn(){ 
    var opponent = this.state.nextPlayer
    var player = this.state.currentPlayer
    var target = computerAttackLocation(opponent)
    registerAttack({receiver: player, target: target, computer: true, attacker: opponent})
    this.setState({currentPlayer: player, nextPlayer: opponent})
  }


  selectShip(ship){
    //we could seperate these two, but the only time we need to use selected ship is during the place ship phase. 
    //so in this situation we just create ship and set it for placement at the same time.
    var newship = createShip(ship)
    this.setState({selectedship: newship})
  }

  verticalize(){
    this.setState({vertical: !this.state.vertical})
  }

  startTurn(){  
    this.setState({nextturn: false})  
  }

  render(){

    let display
    if (this.state.gamestart === false){
      display = <IntroPage startOne = {this.startOnePlayer} startTwo = {this.startTwoPlayer}/>
    }else if (this.state.nextturn){


      display = <div className = "blank-screen">
                  <h2 onClick = {this.startTurn.bind(this)}>{`Click to Start ${this.state.currentPlayer.name}'s Turn`}</h2>
                </div>
    }else if (this.state.placedships === false){

      display = setupShipPlacementBoard({selectedship: this.state.selectedship, verticalize: this.verticalize, vertical: this.state.vertical, state:this.state, selectShip: this.selectShip, selectGridForShip: this.selectGridForShip })
  
    }else{

      var click = this.receiveAttack
      var header = <h1>{this.state.currentPlayer.name + " Turn"}</h1>

      if (this.state.gameover === true){
        click = null
        header = 
        <div className = "game-over">
          {alert("Game Over! " + this.state.currentPlayer.name + " Wins!")}
          <h1>{"Game Over! " + this.state.currentPlayer.name + " Wins!"}</h1>
        </div>
      }

      if (this.state.postAttack){
        header = <h1>Click on any empty attack grid to end turn.</h1>
        click = this.switchPlayers.bind(this)
      }

      display = 
      <div className = "attack-board">
        {header}
        <GameModeBoard 
          currentPlayer = {this.state.currentPlayer.board.allgrids} 
          nextPlayer = {this.state.nextPlayer.board.allgrids}
          isOwnBoard = {true}
          receiveAttack = {click}
        />
      </div>
    }

    return(
      <div className = "gameContainer" style = {{textAlign: "center", display: "inline-block"}}>
        <h1 className = "title">BATTLETO-- SHIPS. BATTLE SHIPS</h1>
        {display}
      </div>

    )
  }

}


export default App;







