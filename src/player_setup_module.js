import {shipoptions, createShip} from './ship_module'
import Player from './player'
import Board from './board'



function setupPlayers(num){
    var name = prompt(`What is player ${num}'s name`)
    var player = new Player({name: name, computer: false})
    var board = new Board({player: player})
    player.board = board

    return player
}

function setupComputer(options){
    var computer = new Player({name: "computer", computer: true})
    var compboard = new Board({player: computer})
    computer.board = compboard

    //this is the computer's ship placement
    for (var j = 0; j < shipoptions.length;j ++){
   
        let spot = Math.floor(Math.random()*80)
        let vertical = Math.random() > 0.5? true : false
        //essentially a coinflip for if it's vertical or not
        var ship = createShip(shipoptions[j])
        
        while (!options.selectGridForShip(spot, vertical, ship, computer)) {
        //this works with selectGrid because we're inputting our own object (instead of using what's given in the function) 
        //that is directly changed in the function and we're not resetting it when it's setState in function (like when we don't put a value for computer)
        //essentially it's as if did the following
        /*
            var counter = 1
            function add(x){
            x[counter]= counter
            counter += 1
            }
            var b = {3:2}
            add(b)
            add(b)
            add(b)
            console.log(b)
            //{3:2, 1:1, 2:2, 3:3}
        */
        //if the computer unable to place a ship at the spot it first randomly got
        //it'll redo it until it gets one that is correct
        spot = Math.floor(Math.random()*80)
        }
    }
  return computer
}

export {setupComputer, setupPlayers}