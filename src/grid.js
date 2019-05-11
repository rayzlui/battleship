import React from 'react';

function gridForShipPlacement(options){ 
    if (options.value.ship === null){
        let click = options.selectGridForShip
        let color = "blue"
        let ship = null
        return {click, color, ship}
    }else{
        let color = "grey"
        let click = null
        let ship = <img src = {options.value.ship.image} alt = {options.value.ship.image} style ={{height: 30, width: 30, display: "inline-block", margin: 0}}/>
        return {click, color, ship}
    }
    
}

function gridForOwnBoard(options){
    let color = null
    let ship = null
    let click = ()=>alert("You can't attack yourself silly.")
    if (options.value.ship === null){
        color = options.value.hit === true ? "white" : "blue"
    }else{
        if (options.value.hit === true){
            color = "red"
        }else{
            color = "grey"
            ship = <img src = {options.value.ship.image} alt = {options.value.ship.image} style ={{height: 30, width: 30, display: "inline-block", margin: 0}}/>
        }
    }
    return {click, color, ship}
}

function gridForAttackBoard(options){
    let click = null
    let color = null
    if (options.value.hit === false){
        //if there's no hit, it's blue and can still receive an attack
        click = options.receiveAttack
        color = "blue"
    }else{
        //if there's been a shot it'll display based on if there was a ship. click will give notice it's been shot at.
        
        click = ()=>alert("You've already attacked this position")
        color = options.value.ship === null? "green" : "red"
    }  
    return {click, color, ship: null}
}

function generateGridDisplay(options){
    //see footnote
    let data
    if (options.props.placedships === false){
        //if ship haven't been placed
        data = options.placeships({value: options.props.value, selectGridForShip: options.selectGridForShip})
    }else{
        //if ships have been placed
        if (options.props.isOwnBoard === true){
            //displaying user's board
            data = options.ownboard({value: options.props.value})
        }else{
            //displaying attack board
            data = options.attackboard({value: options.props.value, receiveAttack: options.receiveAttack})
        }

    }
    return data
}


class Grid extends React.Component{
   

    selectGridForShip(){
        return this.props.selectGridForShip ? this.props.selectGridForShip(this.props.id) : null
        
    }

    receiveAttack(){
        this.props.receiveAttack(this.props.id)
    }


    render(){

        var domData = generateGridDisplay({placeships: gridForShipPlacement, ownboard: gridForOwnBoard, attackboard: gridForAttackBoard, props: this.props, receiveAttack: this.receiveAttack.bind(this), selectGridForShip: this.selectGridForShip.bind(this)})

        return(
            <div className = {"grid" + this.props.id} style = {{backgroundColor: domData.color, height: "60px", width: "60px", borderWidth: "5px", borderColor: "black", display: "inline-block", margin: 1, verticalAlign: "top"}} onClick = {domData.click}>{domData.ship}</div>
        )
    }
}

export {Grid, gridForShipPlacement, gridForOwnBoard, gridForAttackBoard, generateGridDisplay}

/* Note on generateGridDisplay:
    Each grid has the following possibilities
    Game is at setup phase:
        - Grid has no ship on it, hence it'll be clickable and blue
        - Grid has a ship on it, it'll be grey and no longer be clickable.
    Game is in game mode:
        - User's board to see their OWN ships
            - Grid has not been shot at, no ship on. Will be blue
            - Grid has not been shot, with ship on. Will be grey.
            - Grid has been shot, no ship on. Will be white
            - Grid has been shot, ship on. Will be red.
        - Attack board, for user to attack opp ships
            - Grid has not been shot at, no ship on. Will be blue
            - Grid has been shot at, no ship. Will be green
            - Grid has been shot, ship on. Will be red.



*/