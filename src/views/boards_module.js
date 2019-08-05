import Gameboard from './gameboard'
import React, {useState} from 'react'
import {createShip} from '../helperFunctions/ship_module'
import {IMAGE_URLS, SHIP_OPTIONS} from '../helperFunctions/ship_module'
import { verticalcheck, horizontalcheck } from '../helperFunctions/gameplay_module'




export function PlaceShipsBoard(props){
    //move verticalize state to here, and pass it back into selectGridForShip
    const [isVertical, flipDirection] = useState(true)
    const [selectedShip, changeShip] = useState(null)
    let verticalDisplay
    if (isVertical === true){
        verticalDisplay = "Horizontalize Placement"
    }else{
        verticalDisplay = "Verticalize Placement"
    }

    const ships = SHIP_OPTIONS.slice()
    const {player, placeShipOne, placeShipTwo, playerOnePlaced, playerTwoPlaced} = props
    for (var i = 0 ; i < player.ships.length; i++){
        var index = ships.indexOf(player.ships[i].name)
        if (index !== -1){
            ships.splice(index,1)
  
        }
    }
    let options = ships.map(ship=>
        <img key = {ship} id = {ship} src = {IMAGE_URLS[ship]} alt = {ship} onClick ={() => {
            const newship = createShip(ship)
            changeShip(newship)
        }}/>
    )

    
    let  click = () => null
    let selectedShipHeader = null
    if (selectedShip){
        let placeFunc = player.name === 'Player 1' ? placeShipOne : placeShipTwo
        let completeFunc = player.name === 'Player 1' ? playerOnePlaced : playerTwoPlaced
        click = (id) => {
            let legalPlacement = isVertical? verticalcheck({id: id, ship: selectedShip, player: player} ) : horizontalcheck({id: id, ship: selectedShip, player: player})
            if (legalPlacement){
                placeFunc({target: id, vertical: isVertical, ship: selectedShip})      
                if (player.ships.length === 5){
                    completeFunc()
                }             
            }else{      
                alert("Error: You either have a piece there or it goes offboard")
            }
            changeShip(null)
        }
        
        selectedShipHeader = <h4>{`You have selected ${selectedShip.name}`}</h4>
    }
    return(
        
    <div className = "place-ships-board" style = {{display: "inline"}}>
        <h2>{player.name + " Place Your Ships"}</h2>
            {selectedShipHeader}
        <div id = "place-ship-board">
            <Gameboard value = {props.player.board} selectGridForShip = {click} placedships = {false}/>
        </div>
        <div id = "place-ship-options">
            <button id = "vertical-button" onClick = {() => flipDirection(!isVertical)}>{verticalDisplay}</button>
            {options}
        </div>
    </div>
    )
}

export function GameModeBoard(props) {

        const {nextPlayer, isOwnBoard, receiveAttack, currentPlayer} = props
        return(

            <div className = "game-mode-board">
                <div id = "attack-board">
                    <h3>Attack Board</h3>
                    <Gameboard value = {nextPlayer.board} isOwnBoard = {!isOwnBoard} receiveAttack = {receiveAttack}/>
                </div>

                <br/>
                <br/>

                <div id = "own-board">
                    <h3>Your Board</h3>
                    <Gameboard value = {currentPlayer.board} isOwnBoard = {isOwnBoard}/>
                </div>
            </div>    
        )
    

}

  