import React from 'react';
import {Grid} from './grid'

function Gameboard(props){

    const { selectGridForShip, receiveAttack, value, isOwnBoard, placedships } = props
   
    let display = []
    let x = 0
    var row = []
    let element
    for (var i = 0; i < value.length; i++){

        const gridNum = i
        var grid = value[i]

        if (placedships === false){
            element = <Grid key = {i} id = {i} value = {grid} selectGridForShip = {()=> selectGridForShip(gridNum)} placedships = {placedships}/>
            
        }else{
            if (isOwnBoard === true){
                element = <Grid key = {i} id = {i} value = {grid} selectGridForShip={() => null}isOwnBoard = {isOwnBoard}/>
                
                //display with ships aka user board
            }else{
                element = <Grid key = {i} id = {i} value = {grid} selectGridForShip= {()=> null} isOwnBoard = {isOwnBoard} receiveAttack = {() => receiveAttack(gridNum)}/>
                
                //display without ships, aka board to attack with
            } 
            
        }
        row.push(element)
        if (row.length === 9){
            display.push(<li key = {x}>{row}</li>)
            x+=1
            row = []
        }
    }
    
        
    return(

        <div className = "gameboard" style = {{backgroundColor: "black"}}>
            <ul style = {{listStyle: 'none', padding: 0, margin: 0}}>{display}</ul>
        </div>
    )
    
}

export default Gameboard