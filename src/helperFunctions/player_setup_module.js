import {SHIP_OPTIONS, createShip} from './ship_module'
import {createPlayer} from '../classes/player'
import { createBoard } from '../classes/board'
import {horizontalcheck, verticalcheck} from './gameplay_module'
import {placeShips} from './ship_module'




function setupPlayers(num){
    var name = `Player ${num}`
    var player = createPlayer({name: name, computer: false})
    var board = createBoard()
    player.board = board

    return player
}



function setupComputer(){
    var computer = createPlayer({name: "computer", computer: true})
    var compboard = createBoard()
    computer.board = compboard

    //this is the computer's ship placement
    placeAllCompShips({computer: computer})
    return computer
}

function placeAllCompShips(options){
    for (var j = 0; j < SHIP_OPTIONS.length;j ++){
   
        let vertical = Math.random() > 0.5? true : false
        //essentially a coinflip for if it's vertical or not
        var ship = createShip(SHIP_OPTIONS[j])
        
        findGridForCompShipPlacement({vertical:vertical, ship:ship, computer: options.computer})
    }
}

function findGridForCompShipPlacement(options){
    var spot = Math.floor(Math.random()*80)
    while (!placeShipForComputer(spot, options.vertical, options.ship, options.computer)) {
       
        //if the computer unable to place a ship at the spot it first randomly got
        
        spot = Math.floor(Math.random()*80)
    }
}

function placeShipForComputer(id, vertical, ship, player){

    var legalPlacement = vertical? verticalcheck({id: id, ship: ship, player: player} ) : horizontalcheck({id: id, ship: ship, player: player})
   
    if (legalPlacement){
      
      player = placeShips({player: player, vertical: vertical, ship: ship, id: id})
      //this setState updates the board to display where the ship was placed.

      return true
      //if this was a legal move we return true for computer to know.
      
    }else{

      return false

    }
  }

export {setupComputer, setupPlayers}

 /*
    Reminder:
        setupComputer's ship placement works because we're inputting our own object (instead of the setState in the function) 
        that is directly changing the object in the function and we're not resetting it when it's setState in 
        function (like when we don't put a value for computer)
        essentially it's as if did the following
        
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