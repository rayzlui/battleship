import Ship from './ship'
import React from 'react'
import {PlaceShipsBoard} from './boards_module'


const shipoptions = ["battleship", "cruiser", "carrier", "destroyer", "submarine"]
const imageurls = ["batt","crui", "carr","des", "sub"]

function createShip(ship){
    let length
    let image
    switch (ship){
      case "battleship":
        length = 4
        image = imageurls[0]
        break;
      case "submarine":
        length = 3;
        image = imageurls[4]
        break;
      case "destroyer":
        length = 3
        image = imageurls[3]
        break;
      case "cruiser":
        length = 2
        image = imageurls[1]
        break;
      case "carrier":
        length = 5
        image = imageurls[2]
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
  var copyshipurls = imageurls.slice()
  //this determines which ships have not been placed on board yet.
  for (var i = 0 ; i < player.ships.length; i++){
      var index = copyships.indexOf(player.ships[i].name)
      if (index !== -1){
          copyships.splice(index,1)
          copyshipurls.splice(index,1)

      }
  }
  return [copyships,copyshipurls]
}

function shipDom(options){
  return <img key = {options.ship} id = {options.ship} src = {options.image} alt = {options.ship} onClick ={()=>options.selectShip(options.ship)}/>
}



function setupShipPlacementBoard(options){
  var emptyboard = options.state.currentPlayer.board.allgrids
  let vertical
  var copyships = unplacedShips(options.state.currentPlayer)[0]
  var copyshipurls = unplacedShips(options.state.currentPlayer)[1]

  var shipOptions = copyships.map(x=>shipDom({ship: x, image: copyshipurls[copyships.indexOf(x)], selectShip: options.selectShip}))

  if (options.vertical === true){
    vertical = "Horizontalize Placement"
  }else{
    vertical = "Verticalize Placement"
  }

  var display = <PlaceShipsBoard selectedship = {options.selectedship} verticalize = {options.verticalize} name = {options.state.currentPlayer.name} options = {shipOptions} vertical = {vertical} emptyboard = {emptyboard} selectGridForShip = {options.selectGridForShip}/>
  return display
}



export {createShip, unplacedShips, shipoptions, imageurls, shipDom, setupShipPlacementBoard, placeShips}