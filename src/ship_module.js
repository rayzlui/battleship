import Ship from './ship'
import React from 'react'
import {PlaceShipsBoard} from './boards_module'


const shipoptions = ["battleship", "cruiser", "carrier", "destroyer", "submarine"]
const imageurls = {battleship: "batt", cruiser: "crui", carrier: "carr", destroyer: "des",  submarine: "sub"}

function createShip(ship){
    let length
    let image
    switch (ship){
      case "battleship":
        length = 4
        image = imageurls.battleship
        break;
      case "submarine":
        length = 3;
        image = imageurls.submarine
        break;
      case "destroyer":
        length = 3
        image = imageurls.destroyer
        break;
      case "cruiser":
        length = 2
        image = imageurls.cruiser
        break;
      case "carrier":
        length = 5
        image = imageurls.carrier
        break;
      default:
      break;
    }
    var newship = new Ship({name: ship, length:length, image: image})
    return newship

}

function placeShips(options){
  var player = options.player
  var id = options.id
  var ship = options.ship
  var vertical = options.vertical

  for (var i = 0; i < ship.length; i++ ){
    var x = i
    if (vertical === true){
      x = i*9
    }
    player.board.allgrids[id + x].ship = ship
  }
  player.ships.push(ship)

  return player
}

function unplacedShips(player){
  var copyships = shipoptions.slice()
  //this determines which ships have not been placed on board yet.
  
  for (var i = 0 ; i < player.ships.length; i++){
      var index = copyships.indexOf(player.ships[i].name)
      if (index !== -1){
          copyships.splice(index,1)

      }
  }
  return copyships
} 

function shipDom(options){
  return <img key = {options.ship} id = {options.ship} src = {options.image} alt = {options.ship} onClick ={()=>options.selectShip(options.ship)}/>
}

function generateShipOptions(options){
  var ships = unplacedShips(options.currentPlayer)
  var shipOptions = ships.map(ship=>shipDom({ship: ship, image: imageurls[ship], selectShip: options.selectShip}))
  
  return shipOptions

}


function setupShipPlacementBoard(options){
  var display = <PlaceShipsBoard  player = {options.state.currentPlayer}  selectGridForShip = {options.selectGridForShip}/>
  return display
}



export {createShip, unplacedShips, shipoptions, imageurls, shipDom, setupShipPlacementBoard, generateShipOptions, placeShips}