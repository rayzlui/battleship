export function createBoard() {
  let board = [];
  for (let i = 0; i < 81; i++) {
    let grid = { ship: null, hit: false };
    board.push(grid);
  }
  return board;
}
