    import {createShip, unplacedShips, shipoptions, shipDom, placeShips} from './ship_module'
    
    import {shallow} from 'enzyme'

    
    describe('createship', () => {
        it('creates a battleship if battleship input', () => {
            var battleship = createShip("battleship")
            expect(battleship.name).toEqual("battleship")
            expect(battleship.length).toEqual(4)
        }) 

        it('creates a submarine if submarine input', () => {
            var submarine = createShip("submarine")
            expect(submarine.name).toEqual("submarine")
            expect(submarine.length).toEqual(3)
        }) 

        it('creates a cruiser if cruiser input', () => {
            var cruiser = createShip("cruiser")
            expect(cruiser.name).toEqual("cruiser")
            expect(cruiser.length).toEqual(2)
        }) 

        it('creates a carrier if carrier input', () => {
            var carrier = createShip("carrier")
            expect(carrier.name).toEqual("carrier")
            expect(carrier.length).toEqual(5)
        })  

        it('creates a destroyer if destroyer input', () => {
            var destroyer = createShip("destroyer")
            expect(destroyer.name).toEqual("destroyer")
            expect(destroyer.length).toEqual(3)
        }) 
    })



    describe('unplacedShips', () => {
        it('should return all ships when players.ships === null', () => {
            var player = {ships:[]}
            var ships = unplacedShips(player)
            expect(ships.length).toEqual(5)
            expect(ships).toEqual(expect.arrayContaining(shipoptions))
        })

        it ('should return return 4 ships when player.ship has one ship', () => {
        var player = {ships:[{name:"cruiser"}]}
        var expected = ["battleship", "destroyer", "carrier", "submarine"]
        var ships = unplacedShips(player)
        expect(ships.length).toEqual(4)
        expect(ships).toEqual(expect.arrayContaining(expected))
        })

        it('should return no ships when player.ship has 5 ships', () => {
            var player = {ships:[{name: "battleship"}, {name: "cruiser"}, {name: "carrier"}, {name: "destroyer"}, {name: "submarine"}]}
            var ships = unplacedShips(player)
            expect(ships.length).toEqual(0)
        })
    })

    describe("shipDOM", ()=>{
        it("should have a click event listener", ()=>{
            var mockFunc = jest.fn()
            var wrapper = shallow(shipDom({ship:"MESC", image: "fake", selectShip: mockFunc}))
            wrapper.simulate('click')
            expect(mockFunc).toHaveBeenCalled()
            var data = wrapper.props()
            expect(data.id).toEqual("MESC")
            expect(data.src).toEqual("fake")

        })
    })

    describe("placeShips", () => {
        describe("test horizontal placement", ()=>{var array = []
            for (var i = 0; i < 81; i++){
                array.push({ship:null})
            }
            var player = {ships: [], board: {allgrids: array}}
            var ship = {name: "tugboat", length: 3}
            placeShips({player: player, ship: ship, vertical: false, id: 8})
            it("should be placed in the player's ships", ()=>{
                expect(player.ships.length).toEqual(1)
            })
            it("should be placed on the player's board", ()=>{
                expect(player.board.allgrids[8].ship).toEqual(ship)
                expect(player.board.allgrids[9].ship).toEqual(ship)
                expect(player.board.allgrids[10].ship).toEqual(ship)
            })
            it('should not be placed on any other grid', () => {
                var copy = player.board.allgrids.slice()
                copy.splice(8,3)
                for (var i = 0; i< copy.length; i++){
                    expect(copy[i].ship).toEqual(null)
                }
            })
        })

        describe("test vertical placement", ()=>{var array = []
            for (var i = 0; i < 81; i++){
                array.push({ship:null})
            }
            var player = {ships: [], board: {allgrids: array}}
            var ship = {name: "train", length: 4}
            placeShips({player: player, ship: ship, vertical: true, id: 9})
            it("should be placed in the player's ships", ()=>{
                expect(player.ships.length).toEqual(1)
                expect(player.ships[0]).toEqual(ship)
            })
            it("should be placed on the player's board", ()=>{
                expect(player.board.allgrids[9].ship).toEqual(ship)
                expect(player.board.allgrids[18].ship).toEqual(ship)
                expect(player.board.allgrids[27].ship).toEqual(ship)
                expect(player.board.allgrids[36].ship).toEqual(ship)
            })
            it('should not be placed on any other grid', () => {
                var copy = player.board.allgrids.slice()
                copy.splice(36,1)
                copy.splice(27,1)
                copy.splice(18,1)
                copy.splice(9,1)
                for (var i = 0; i< copy.length; i++){
                    expect(copy[i].ship).toEqual(null)
                }
            })
        })
    })



