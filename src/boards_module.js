import Gameboard from './gameboard'
import React from 'react'
import {createShip, generateShipOptions} from './ship_module'


class PlaceShipsBoard extends React.Component{
    //move verticalize state to here, and pass it back into selectGridForShip
    constructor(props){
        super(props)
        this.state = {
            vertical: false,
            selectedship: null
        }
    }

    verticalize(){
        this.setState({vertical: !this.state.vertical})
    }
    
    verticalDisplay(){
        let vertical
        if (this.state.vertical === true){
            vertical = "Horizontalize Placement"
        }else{
            vertical = "Verticalize Placement"
        }
        return vertical
    }

    selectGridForShip(id){
        this.props.selectGridForShip(id, this.state.vertical, this.state.selectedship)
        this.setState({selectedship: null})
    }

    selectShip(ship){
        //we could seperate these two, but the only time we need to use selected ship is during the place ship phase. 
        //so in this situation we just create ship and set it for placement at the same time.
        var newship = createShip(ship)
        this.setState({selectedship: newship})
    }

    
    render(){  
        var click = null
        var selectedship = null
        
        if (this.state.selectedship){
            click = this.selectGridForShip.bind(this)
            
            selectedship = <h4>{`You have selected ${this.state.selectedship.name}`}</h4>
        }
       
        return(
            
        <div className = "place-ships-board" style = {{display: "inline"}}>
            <h2>{this.props.player.name + " Place Your Ships"}</h2>
            {selectedship}
            <div id = "place-ship-board">
                <Gameboard value = {this.props.player.board.allgrids} selectGridForShip = {click} placedships = {false}/>
            </div>
            <div id = "place-ship-options"style = {{display: "grid"}}>
                <button id = "vertical-button" onClick = {this.verticalize.bind(this)}>{this.verticalDisplay.bind(this)()}</button>
                {generateShipOptions({selectShip: this.selectShip.bind(this), currentPlayer: this.props.player})}
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
  