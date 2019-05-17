function registerAttack(options){
    
    var player = options.receiver
    var grid = player.board.allgrids[options.target]
    grid.hit = true
    if (grid.ship !== null){
        if (options.computer===true){
            options.attacker.targetHit = options.target
        }
        grid.ship.shipHit()
        grid.ship.isSunk()
        if (grid.ship.sunk){
            (options.computer===true) ? alert("Your "  + grid.ship.name + "'s HAS SUNK!") : alert(player.name +" " + grid.ship.name + "'s ' HAS SUNK!")       
            
        }
    }
}


function randomAdjacentValues(value,compAttack){
    var adjacents = [value +1,value -1, value -9, value+9]
    var targets = adjacents.map(x=>compAttack.indexOf(x)).filter(y=>y!== -1)
    //see footnote
    return targets
}
  
  
function computerAttackLocation(computer){
    //oppponnet is computer in this situation

    var computerAttackOptions = computer.attackOptions
    let target

    if (computer.targetHit !== null){
        //if computer gets a hit, it'll store it as targetHit so it'll guess around the location again
        var value = computer.targetHit
        var targets = randomAdjacentValues(value, computerAttackOptions)
        var index = targets[Math.floor(Math.random()*targets.length)]
        if (targets.length <= 1){
            computer.targetHit = null
        }
        target = computerAttackOptions.splice(index,1)[0]

    }else{
        target = Math.floor(Math.random()*computerAttackOptions.length)
        target = computerAttackOptions.splice(target,1)[0]
    }

    return target
}
  

function horizontalcheck(options){
    var id = options.id
    var ship = options.ship
    var player = options.player

    let upperbound
    for (var i = 1; i <= 9; i++){
        //this checks for which row id is on, to get the value of the most right facing grid number.
        var num = (i * 9)-1
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
    return player.board.allgrids.slice(id, id+ship.length).every(grid=>grid.ship===null)
}
  
function verticalcheck(options){
    var id = options.id
    var ship = options.ship
    var player = options.player

    for (var i = 0; i < ship.length; i++){
        //since it's vertical we're going by 9's aka row size.
        var x = i * 9
        if ((id + x > 80) || player.board.allgrids[id + x].ship !== null){
            //checking if each part of the ship going vertical either falls off the board or the grid already has a ship on it.
            return false
        }
    }
    return true
}

export {registerAttack, horizontalcheck, verticalcheck, computerAttackLocation}

/*  Note for randomAdjacentValues

    in targets, we cross reference the adjacent spots of where the comp knows there's a hit (value)
        to it's attack options (its an array that started as from 0-80) that haven't been targetted. since 
        we remove targets that computer has attempted, adjacent values do not corespond directly to their 
        respective index in compattack. we filter -1 to remove any options that are outside of the board 
        limits or have been shot already. and we return those indices for the comp to randomly select out of.
    */