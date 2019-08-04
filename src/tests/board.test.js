import Board from './board'

describe('Board', () =>{
    var testBoard = new Board()
    var grids = testBoard.allgrids
    
    it ('should have 81 grids', ()=>{
        expect (grids.length).toEqual(81)
    })

    it ('should {player: "", ship: null, hit: false} in each grid', ()=>{
        var grids = testBoard.allgrids
        for (var i = 0; i < grids.length; i++){
            expect(grids[i].player).toEqual('')
            expect(grids[i].ship).toEqual(null)
            expect(grids[i].hit).toEqual(false)
        }
    })
    
    describe("gameover", ()=>{
        
    
        it ("should return false when there's a ship with no hit", () => {
            var mockShip = {name: "tugboat"}
            grids[0].ship = mockShip
            grids[1].ship = mockShip
            grids[2].ship = mockShip

            expect(testBoard.gameover()).toEqual(false)
        })

        it ("should return false when there's a ship with no hit", () => { 
            var mockShip = {name: "tugboat"}
            grids[10].ship = mockShip
            grids[11].ship = mockShip
            grids[12].ship = mockShip    
            grids[10].hit = true
            grids[11].hit = true
            grids[12].hit = true
            expect(testBoard.gameover()).toEqual(true)
        })
    })
})