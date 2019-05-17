import React from 'react';
import {Grid} from './grid'

class Gameboard extends React.Component{
    constructor(props){
        super(props)
        this.selectGridForShip = this.selectGridForShip.bind(this)
        this.receiveAttack = this.receiveAttack.bind(this)
    }

    selectGridForShip(id){
        if (this.props.selectGridForShip){
            this.props.selectGridForShip(id)
        }
    }

    receiveAttack(id){
        if (this.props.receiveAttack){
            this.props.receiveAttack(id)
        }
    }
 
    renderBoard(){
        let display = []
        let x = 0
        var row = []
        let element
        for (var i = 0; i < this.props.value.length; i++){
            var grid = this.props.value[i]

            if (this.props.placedships === false){
                element = <Grid key = {i} id = {i} value = {grid} selectGridForShip = {this.selectGridForShip} placedships = {this.props.placedships}/>
                
            }else{
                if (this.props.isOwnBoard === true){
                    element = <Grid key = {i} id = {i} value = {grid} isOwnBoard = {this.props.isOwnBoard}/>
                    
                    //display with ships aka user board
                }else{
                    element = <Grid key = {i} id = {i} value = {grid} isOwnBoard = {this.props.isOwnBoard} receiveAttack = {this.receiveAttack}/>
                    
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
        return display
    }
  

    render(){

        return(

            <div className = "gameboard" style = {{backgroundColor: "black"}}>
                <ul style = {{listStyle: 'none', padding: 0, margin: 0}}>{this.renderBoard.bind(this)()}</ul>
            </div>
        )
    }
}

export default Gameboard