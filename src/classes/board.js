export function createBoard(){
    var board = []
    for (var i = 0; i < 81; i++){
        var grid = {ship: null, hit: false}
        board.push(grid)
    }
    return board
}


export function isGameOver(board){
    for (var i = 0; i < board.length; i++){
        if (board[i].ship !== null){
            //if there's a ship there
            if (board[i].hit === false){
                //and if the ship isn't hit
                return false
            }
        }
    }
    return true
}