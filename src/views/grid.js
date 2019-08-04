import React from 'react';


function Grid(props){
    const { selectGridForShip, placedships, value, isOwnBoard, receiveAttack } = props
    //see footnote
    const {ship, hit} = value
    let click, color, shipImage = null
    
    if (placedships === false){
        //if ship haven't been placed
        
        if (ship === null){
            click = selectGridForShip
            color = "blue"
            shipImage = null
        }else{
            color = "grey"
            click = null
            shipImage = <img src = {ship.image} alt = {ship.image} style ={{height: 30, width: 30, display: "inline-block", margin: 0}}/>
        }
    }else{
        //if ships have been placed
        if (isOwnBoard === true){
            //displaying user's board
                    
            click = ()=>alert("You can't attack yourself silly.")
            if (ship === null){
                color = value.hit === true ? "white" : "blue"
            }else{
                if (value.hit === true){
                    color = "red"
                }else{
                    color = "grey"
                    shipImage = <img src = {ship.image} alt = {ship.image} style ={{height: 30, width: 30, display: "inline-block", margin: 0}}/>
                }
            }
        }else{
            //displaying attack board
            if (hit === false){
                //if there's no hit, it's blue and can still receive an attack
                click = receiveAttack
                color = "blue"
            }else{
                //if there's been a shot it'll display based on if there was a ship. click will give notice it's been shot at.
                
                click = ()=>alert("You've already attacked this position")
                color = ship === null? "green" : "red"
            }  
        }

    }

    return(
        <div className = {"grid" + props.id} style = {{backgroundColor: color, height: "60px", width: "60px", borderWidth: "5px", borderColor: "black", display: "inline-block", margin: 1, verticalAlign: "top"}} onClick = {click}>{shipImage}</div>
    )
    
}

export {Grid}

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