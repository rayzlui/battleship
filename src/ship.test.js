import Ship from './ship'

describe('Ship', () => {
    
    let newShip = new Ship({name: "shippy", length: 4, image: "none"})

    it('should have ship.length == 4', ()=>{
        expect(newShip.length).toEqual(4)
    })
     

    describe("shipHit ", () => {    
        it("should +1 to newShip.shiphits each time", () => {
            newShip.shipHit()
            expect(newShip.shiphits).toEqual(1)
            newShip.shipHit()
            expect(newShip.shiphits).toEqual(2)
            newShip.shipHit()
            expect(newShip.shiphits).toEqual(3)
        })
    })

    let newerShip = new Ship({name: "newershippy", length: 4, image: "none"})
     
    describe("isSunk",()=> {
        it("should return false when newerShip.shiphits !=== newerShip.length", () =>{
            expect(newerShip.shiphits).toEqual(0)
            for (var i = 0; i < newerShip.length; i++){
                newerShip.shipHit()
            }
            expect(newerShip.shiphits).toEqual(newerShip.length)
            expect(newerShip.isSunk()).toBe(true)
        })
    })
})