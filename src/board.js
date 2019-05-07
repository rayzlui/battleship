class Board{
    constructor(){
        this.allgrids = this.createBoard()
        this.gameover = this.gameover.bind(this)
    }

    gridCreator(){
        return {player: '', ship: null, hit: false}
    }

    createBoard(){
        var board = []
        for (var i = 0; i < 81; i++){
            var grid = this.gridCreator()
            board.push(grid)
        }
        return board
    }

    gameover(){
        for (var i = 0; i < this.allgrids.length; i++){
            if (this.allgrids[i].ship !== null){
                //if there's a ship there
                if (this.allgrids[i].hit === false){
                    //and if the ship isn't hit
                    return false
                }
            }
        }
        return true
    }
}

export default Board