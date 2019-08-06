export function createBoard() {
  let board = [];
  for (let i = 0; i < 81; i++) {
    let grid = { ship: null, hit: false };
    board.push(grid);
  }
  return board;
}

export function isGameOver(board) {
  for (let i = 0; i < board.length; i++) {
    if (board[i].ship !== null) {
      if (board[i].hit === false) {
        return false;
      }
    }
  }
  return true;
}
