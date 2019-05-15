import {registerAttack, horizontalcheck, verticalcheck, computerAttackLocation} from './gameplay_module'
function playerSetup(){
    var mockBoard = []
    for (var i = 0; i < 81; i++){
        mockBoard.push({ship: null, hit: false})
    }
    return {board: {allgrids: mockBoard}}
}

describe("registerAttack", ()=>{
    var mockShipHit = jest.fn(x=>"mockShipHit")
    var mockShipSunk = jest.fn(x=>"mockShipSunk")
    
    function setupCompAttacker(target){
        return {targetHit: target}
    }

    function setupTest(attacking, attacker, num, comp){
        return {receiver: attacking, attacker: attacker, target: num, computer: comp}
    }

    function mockShip(name, length){
        return{name: name, length: length, shipHit: mockShipHit, isSunk: mockShipSunk}
    }

    it ('should not register a hit at grid 15 even if theres a ship there if grid 20 is attacked, should not call functions or set targetHit if computer === true', () => {
        var testplayer = playerSetup()
        var ship = mockShip("tugboat", 3)
        var attacker = setupCompAttacker(null)
        testplayer.board.allgrids[15].ship = ship
        var testinput = setupTest(testplayer, attacker, 20, true)
        registerAttack(testinput)
        expect(testplayer.board.allgrids[15].hit).toEqual(false)
        expect(testplayer.board.allgrids[20].hit).toEqual(true)
        expect(mockShipHit).not.toHaveBeenCalled()
        expect(mockShipSunk).not.toHaveBeenCalled()
        expect(attacker.targetHit).toEqual(null)

    })

    it ('should call isSunk and shipHit, set comp.hitTarget if theres a ship there for computer === true', () => {
        var testplayer = playerSetup()
        var ship = mockShip("tugboat", 3)
        var attacker = setupCompAttacker(null)
        testplayer.board.allgrids[7].ship = ship
        var testinput = setupTest(testplayer, attacker, 7, true)

        expect(testplayer.board.allgrids[7].hit).toEqual(false)
        registerAttack(testinput)
        expect(mockShipHit).toHaveBeenCalled()
        expect(mockShipSunk).toHaveBeenCalled()
        expect(attacker.targetHit).toEqual(7)
        expect(testplayer.board.allgrids[7].hit).toEqual(true)


    })

    




})
describe("checkfunctions", () => {
    //test all the edge values like 7,8,17,...80 and the bottom row and place 
    //random ship parts and test when they are there and if there are false positives
    
    function testSetup(ship, player, id){
        return {ship: ship, player: player, id: id}
    }

    function ship(name, length){
        return {name: name, length: length}
    }

    describe("horizontalcheck", ()=>{

        it('should return false when a ship is placed on any mulitple of (x*9)-1 (aka the edge of the board)', ()=>{
            for (var i = 1; i <= 9; i++){
                var testship = ship("tugboat", 3)
                var testplayer = playerSetup()
                var inputinfo = testSetup(testship, testplayer, (i*9)-1)
                var test = horizontalcheck(inputinfo)
                expect(test).toEqual(false)
            }
        })

        it('should return false when a ship of length 4 is placed at a grid that is greater than (i*9-1)-2 (aka falls off the edge by 1 grid)', () => {
            for (var i = 1; i <= 9; i++){
                var testship = ship("tugboat", 4)
                var testplayer = playerSetup()
                var inputinfo = testSetup(testship, testplayer, ((i*9)-1-2))
                var test = horizontalcheck(inputinfo)
                expect(test).toEqual(false)
            }
        })

        it('should return false when a ship is placed on where another ship has been placed', ()=>{
            var testship = ship("tugboat" , 4)
            var testplayer = playerSetup()
            testplayer.board.allgrids[5] = {ship:"ship here"}
            testplayer.board.allgrids[6] = {ship:"ship here"}
            testplayer.board.allgrids[7] = {ship:"ship here"}
            testplayer.board.allgrids[14] = {ship: "ship here"}
            var inputinfo = testSetup(testship, testplayer, 4)
            var test = horizontalcheck(inputinfo)
            expect(test).toEqual(false)
        })

        it('should return true when a ship is placed on near another ship has been placed, but not on', ()=>{
            var testship = ship("tugboat" , 4)
            var testplayer = playerSetup()
            testplayer.board.allgrids[5] = {ship:"ship here"}
            testplayer.board.allgrids[6] = {ship:"ship here"}
            testplayer.board.allgrids[7] = {ship:"ship here"}
            var inputinfo = testSetup(testship, testplayer, 0)
            var test = horizontalcheck(inputinfo)
            expect(test).toEqual(true)
        })

        it('should return true when a ship is placed near the edge', ()=>{
            var testship = ship("tugboat" , 4)
            var testplayer = playerSetup()
            var inputinfo = testSetup(testship, testplayer, 5)
            var test = horizontalcheck(inputinfo)
            expect(test).toEqual(true)
        })

    })

    describe("verticalcheck", ()=>{

        it('should return false for any ship placed on bottom row (aka 72 - 80', () => {
            for (var i = 72; i <=80; i++){
                var testship = ship("ferry", 2)
                var testplayer = playerSetup()
                var inputinfo = testSetup(testship, testplayer, i)
                var test = verticalcheck(inputinfo)
                expect(test).toEqual(false)

            }
        })
        it('should return false for ship of length 3 placed on near the bottom row and falls off the edge aka (63 - 71)', () => {
            for (var i = 63; i <=71; i++){
                var testship = ship("ferry", 3)
                var testplayer = playerSetup()
                var inputinfo = testSetup(testship, testplayer, i)
                var test = verticalcheck(inputinfo)
                expect(test).toEqual(false)

            }
        })
        it('should return false for ship of length 2 placed on near the bottom row and falls off the edge aka (63 - 71)', () => {
            for (var i = 63; i <=71; i++){
                var testship = ship("ferry", 2)
                var testplayer = playerSetup()
                var inputinfo = testSetup(testship, testplayer, i)
                var test = verticalcheck(inputinfo)
                expect(test).toEqual(true)

            }
        })

        it('should return false for ship of length 3 placed on grid where ship exists', () => {
            var testship = ship("ferry" , 2)
            var testplayer = playerSetup()
            testplayer.board.allgrids[15] = {ship:"ship here"}
            testplayer.board.allgrids[16] = {ship:"ship here"}
            testplayer.board.allgrids[17] = {ship:"ship here"}
            var inputinfo = testSetup(testship, testplayer, 7)
            var test = verticalcheck(inputinfo)
            expect(test).toEqual(false)
        })

        it('should return true for ship of length 3 placed on grid near where ship exists, but no on (no false positives)', () => {
            var testship = ship("ferry" , 2)
            var testplayer = playerSetup()
            testplayer.board.allgrids[15] = {ship:"ship here"}
            testplayer.board.allgrids[16] = {ship:"ship here"}
            testplayer.board.allgrids[17] = {ship:"ship here"}
            var inputinfo = testSetup(testship, testplayer, 5)
            var test = verticalcheck(inputinfo)
            expect(test).toEqual(true)
        })

    })
})

describe("computerAttackLocation", ()=>{
    //test if we have a targetHit, the return should be one of the targets that are adjacent to it. 
    //testing wise it would be expect([array]).toContain(test) and if it's no targetHit
    //it should at least be a number.
    function mockComputer(target){
        var options = []
        for (var i = 0; i < 81; i++){
            options.push(i)
        }
        return {targetHit: target, attackOptions: options}
    }
    it('should return one of [6,14,16,24] when targetHit === 15' , () => {
        var comp = mockComputer(15)
        var test = computerAttackLocation(comp)
        expect([6,14,16,24]).toContain(test)
    })

    it('should return one of [1,9] when targetHit === 0' , () => {
        var comp = mockComputer(0)
        var test = computerAttackLocation(comp)
        expect([1,9]).toContain(test)
    })

    it('should return one of [7,15,17] when targetHit === 16 and 25 is removed from attackOptions',()=>{
        var comp = mockComputer(16)
        comp.attackOptions.splice(25,1)
        var test = computerAttackLocation(comp)
        expect([7,15,17]).toContain(test)
        expect(test).not.toEqual(25)
    })
    it('should return 17 when targetHit === 16 and 7,15,25 is removed from attackOptions, should also set comp.targetHit = null',()=>{
        var comp = mockComputer(16)
        comp.attackOptions.splice(25,1)
        comp.attackOptions.splice(15,1)
        comp.attackOptions.splice(7,1)
        var test = computerAttackLocation(comp)
        expect(test).toEqual(17)
        expect(comp.targetHit).toEqual(null)
    })

    it('should return a numerical value when targetHit === false', ()=>{
        var comp = mockComputer(null)
        var test = computerAttackLocation(comp)
        expect(test).not.toBeNaN()
    })

})
