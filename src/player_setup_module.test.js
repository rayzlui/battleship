 import {setupComputer, setupPlayers}
 from './player_setup_module'
//test setupPlayers has a board
//test setupComputer has a board WITH 5 ships on it and comp has 5 ships in it.
 describe("setupPlayers", () => {
    var player = setupPlayers(1)
    it("should have a board", () => {
       
       expect (player.board.allgrids.length).toEqual(81)
       expect (player.board.allgrids.filter(grid=>grid.ship === null)).toEqual(81)
    })
    it('should not have ships created', ()=>{
        expect(player.ships.length).toEqual(0)

    })
 }) 

 describe("setupComputer", () => {
    var computer = setupComputer()
    var compGrid = computer.board.allgrids
    var compShips = computer.ships

    it("should have a board", () => {
       expect (compGrid.length).toEqual(81)
    })
    it('should have ships created', ()=>{
        expect(compShips.length).toEqual(5)
    })
    it('should have placed ships on board', ()=>{
        //this essentually tests all the ship placement functions.
        
        for (var i = 0; i < compShips.length; i++){
            var ship = compShips[i]
            expect(compGrid.some(grid=>grid.ship===ship)).toEqual(true)
        }
        expect(compGrid.filter(grid=> grid.ship? grid.ship.name === "submarine": false).length).toEqual(3)
        expect(compGrid.filter(grid=> grid.ship? grid.ship.name === "cruiser": false).length).toEqual(2)
        expect(compGrid.filter(grid=> grid.ship? grid.ship.name === "carrier": false).length).toEqual(5)
        expect(compGrid.filter(grid=> grid.ship? grid.ship.name === "destroyer": false).length).toEqual(3)
        expect(compGrid.filter(grid=> grid.ship? grid.ship.name === "battleship" : false).length).toEqual(4)
        expect(compGrid.filter(grid=> grid.ship !== null).length).toEqual(17)





    })
 }) 