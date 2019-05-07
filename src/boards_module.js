import Gameboard from './gameboard'
import React from 'react'

class PlaceShipsBoard extends React.Component{

    render(){  
        var click = null
        if (this.props.selectedship){
            click = this.props.selectGridForShip
        }
        return(
        <div className = "place-ships-board" style = {{display: "inline"}}>
            <h2>{this.props.name + " Place Your Ships"}</h2>
            <div>
                <Gameboard value = {this.props.emptyboard} selectGridForShip = {click} placedships = {false}/>
            </div>
            <div style = {{display: "grid"}}>
                <button onClick = {this.props.verticalize}>{this.props.vertical}</button>
                {this.props.options}
            </div>
        </div>
        )
    }
}



class GameModeBoard extends React.Component {

    render(){
        return(

            <div className = "game-mode-board">
                <div id = "attack-board">
                    <h2>Attack Board</h2>
                    <Gameboard value = {this.props.nextPlayer} isOwnBoard = {!this.props.isOwnBoard} receiveAttack = {this.props.receiveAttack}/>
                </div>

                <br/>
                <br/>

                <div id = "own-board">
                    <h2>Your Board</h2>
                    <Gameboard value = {this.props.currentPlayer} isOwnBoard = {this.props.isOwnBoard}/>
                </div>
            </div>    
        )
    }

}

export {GameModeBoard, PlaceShipsBoard}
  