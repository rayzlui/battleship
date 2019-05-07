function registerAttack(options){
    var player = options.receiver
    var userBoard = player.board.allgrids[options.target]
    userBoard.hit = true
    if (userBoard.ship !== null){
    
        if (options.computer===true){
            options.attacker.targetHit = options.target
        }
        userBoard.ship.shipHit()
        userBoard.ship.isSunk()
        if (userBoard.ship.sunk){
            if (options.computer===true){
                alert("Your "  + userBoard.ship.name + "'s HAS SUNK!")
            }else{
                alert(player.name +" " + userBoard.ship.name + "'s ' HAS SUNK!")       
            }
        }
    }
}


function randomAdjacentValue(value,compAttack){
    var adjacents = [value +1,value -1, value -9, value+9]
    var targets = adjacents.map(x=>compAttack.indexOf(x)).filter(y=>y!== -1)
    //in targets, we cross reference the adjacent spots of the target 
    //we just hit to the attack options (array of nums from 0-80) and choose a random one.
    return targets
}
  
  
function computerAttackLocation(computer){
//oppponnet is computer in this situation

    var computerAttackOptions = computer.attackOptions
    let target

    if (computer.targetHit !== null){
        //if computer gets a hit, it'll store it as targetHit so it'll guess around the location again
        var value = computer.targetHit
        var targets = randomAdjacentValue(value, computerAttackOptions)
        var index = targets[Math.floor(Math.random()*targets.length)]
        if (targets.length <= 1){
            computer.targetHit = null
        }
        target = computerAttackOptions.splice(index,1)[0]

    }else{
        target = Math.floor(Math.random()*computerAttackOptions.length)
        //we're taking the value at the array, not the index number because we are splicing
        //the computerAttackOptions so the index !== value down the road.
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

    for (var i = 0; i<ship.length; i++){
        var x = i * 9

        if ((id + x > 80) || player.board.allgrids[id + x].ship !== null){

        return false
        }
    }
    return true
}

export {registerAttack, horizontalcheck, verticalcheck, computerAttackLocation}