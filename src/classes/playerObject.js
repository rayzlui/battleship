export function createPlayer(options) {
  const { name, computer, board, attackOptions } = options;
  if (computer) {
    return {
      attackOptions: attackOptions,
      targetHit: null,
      name: name,
      ships: [],
      board: board,
      computer: computer,
      shipsPlaced: true,
      loser: false,
    };
  }
  return {
    name: name,
    ships: [],
    board: board,
    computer: computer,
    shipsPlaced: false,
    turn: false,
    loser: false,
  };
}
