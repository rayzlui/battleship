import { shipObject } from '../classes/ship'


export const SHIP_OPTIONS = ["battleship", "cruiser", "carrier", "destroyer", "submarine"]
export const IMAGE_URLS = {battleship: "batt", cruiser: "crui", carrier: "carr", destroyer: "des",  submarine: "sub"}

function createShip(ship){
    let length
    let image
    switch (ship){
      case "battleship":
        length = 4
        image = IMAGE_URLS.battleship
        break;
      case "submarine":
        length = 3;
        image = IMAGE_URLS.submarine
        break;
      case "destroyer":
        length = 3
        image = IMAGE_URLS.destroyer
        break;
      case "cruiser":
        length = 2
        image = IMAGE_URLS.cruiser
        break;
      case "carrier":
        length = 5
        image = IMAGE_URLS.carrier
        break;
      default:
      break;
    }
    var newship = shipObject({name: ship, length:length, image: image})
    return newship

}

function placeShips(options){
  const {player, id, ship, vertical} = options
  for (var i = 0; i < ship.length; i++ ){
    var x = i
    if (vertical === true){
      x = i*9
    }
    player.board[id + x].ship = ship
  }
  player.ships.push(ship)

  return player
}

function unplacedShips(player){
  var copyships = SHIP_OPTIONS.slice()
  //this determines which ships have not been placed on board yet.
  
  for (var i = 0 ; i < player.ships.length; i++){
      var index = copyships.indexOf(player.ships[i].name)
      if (index !== -1){
          copyships.splice(index,1)

      }
  }
  return copyships
} 



export {createShip, unplacedShips, placeShips}