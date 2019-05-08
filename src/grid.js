import React from 'react';


class Grid extends React.Component{
    constructor(props){
        super(props)
        this.selectGridForShip = this.selectGridForShip.bind(this)
        this.receiveAttack = this.receiveAttack.bind(this)
    }

    selectGridForShip(){
        return this.props.selectGridForShip ? this.props.selectGridForShip(this.props.id) : null
        
    }

    receiveAttack(){
        this.props.receiveAttack(this.props.id)
    }

    gridForShipPlacement(){ 
        if (this.props.value.ship === null){
            let click = this.selectGridForShip
            let color = "blue"
            let ship = null
            return {click, color, ship}
        }else{
            let color = "grey"
            let click = null
            let ship = <img src = {this.props.value.ship.image} alt = {this.props.value.ship.image} style ={{height: 30, width: 30, display: "inline-block", margin: 0}}/>
            return {click, color, ship}
        }
        
    }

    gridForOwnBoard(){
        let color = null
        let ship = null
        let click = ()=>alert("You can't attack yourself silly.")
        if (this.props.value.ship === null){
            color = this.props.value.hit === true ? "white" : "blue"
        }else{
            if (this.props.value.hit === true){
                color = "red"
            }else{
                color = "grey"
                ship = <img src = {this.props.value.ship.image} alt = {this.props.value.ship.image} style ={{height: 30, width: 30, display: "inline-block", margin: 0}}/>
            }
        }
        return {click, color, ship}
    }

    gridForAttackBoard(){
        let click = null
        let color = null
        if (this.props.value.hit === false){
            //if there's no hit, it's blue and can still receive an attack
            click = this.receiveAttack
            color = "blue"
        }else{
            //if there's been a shot it'll display based on if there was a ship. click will give notice it's been shot at.
            
            click = ()=>alert("You've already attacked this position")
            color = this.props.value.ship === null? "green" : "red"
        }  
        return {click, color, ship: null}
    }

    generateGridDisplay(){
        //see footnote
        let data
        if (this.props.placedships === false){
            //if ship haven't been placed
            data = this.gridForShipPlacement.bind(this)()
        }else{
            //if ships have been placed
            if (this.props.isOwnBoard === true){
                //displaying user's board
                data = this.gridForOwnBoard.bind(this)()
            }else{
                //displaying attack board
                data = this.gridForAttackBoard.bind(this)()
            }

        }
        return data
    }

    render(){

        var domData = this.generateGridDisplay.bind(this)()

        return(
            <div className = {"grid" + this.props.id} style = {{backgroundColor: domData.color, height: "60px", width: "60px", borderWidth: "5px", borderColor: "black", display: "inline-block", margin: 1, verticalAlign: "top"}} onClick = {domData.click}>{domData.ship}</div>
        )
    }
}

export default Grid

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