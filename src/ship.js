class Ship{
    constructor(options){
        this.name = options.name
        this.length = options.length
        this.shiphits = 0
        this.sunk = false
        this.image = options.image
        this.shipHit = this.shipHit.bind(this)
        this.isSunk = this.isSunk.bind(this)
    }

    shipHit(){
        this.shiphits += 1
    }

    isSunk(){
        this.sunk = this.shiphits === this.length
        return this.sunk
    }

}

export default Ship