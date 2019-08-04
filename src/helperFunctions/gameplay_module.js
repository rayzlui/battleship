import {shipHit, isSunk} from '../classes/ship'

//dispatch(receiveAttackOne(target)) or dispatch(receieveAttackTwo(target))
function registerAttack(options){
    var player = options.receiver
    var grid = player.board[options.target]
    grid.hit = true
    if (grid.ship !== null){
        if (options.computer===true){
            options.attacker.targetHit = options.target
        }
        shipHit(grid.ship)
        isSunk(grid.ship)
        if (grid.ship.sunk){
            (options.computer===true) ? alert("Your "  + grid.ship.name + "'s HAS SUNK!") : alert(player.name +" " + grid.ship.name + "'s ' HAS SUNK!")       
            
        }
    }
}


function horizontalcheck(options){
    const { id, ship, player } = options

    let upperbound
    for (let i = 1; i <= 9; i++){
        //this checks for which row id is on, to get the value of the most right facing grid number.
        let num = (i * 9)-1
        if (num >= id){
            upperbound = num
            break;
        }

    }

    //this checks if we go off the edge of the map
    if ((id + ship.length-1) > upperbound){
        return false
    }

    //this checks if the spaces we want to put on are clear
    return player.board.slice(id, id+ship.length).every(grid=>grid.ship===null)
}
  
function verticalcheck(options){
    const { id, ship, player } = options

    for (var i = 0; i < ship.length; i++){
        //since it's vertical we're going by 9's aka row size.
        var x = i * 9
        if ((id + x > 80) || player.board[id + x].ship !== null){
            //checking if each part of the ship going vertical either falls off the board or the grid already has a ship on it.
            return false
        }
    }
    return true
}

export {registerAttack, horizontalcheck, verticalcheck}

