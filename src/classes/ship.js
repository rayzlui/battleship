export function shipObject(options){
    const {name, length, image} = options
    return{
        name: name,
        length: length,
        shiphits: 0,
        sunk: false,
        image: image,
    }
}

export function shipHit(ship){
    ship.shiphits += 1
}

export function isSunk(ship){
    ship.sunk = ship.shiphits === ship.length
    return ship.sunk
}
