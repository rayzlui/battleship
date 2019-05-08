import Player from './player'

describe("Player", ()=>{
    it("should have attack options if it's a computer", ()=>{
        var player = new Player({name:"comp", board: [], computer:true})
        expect(player.attackOptions.length).toEqual(81)
    })
    it("should have not have attack options if it's not a computer", ()=>{
        var player = new Player({name:"person", board: [], computer: false})
        expect(player.attackOptions).toEqual(undefined)
    })
})