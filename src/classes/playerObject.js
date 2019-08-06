export function createPlayer(options) {
  const { name, computer, board } = options;
  if (computer) {
    let attackOptions = [];
    for (let i = 0; i <= 80; i++) {
      attackOptions.push(i);
    }
    return {
      attackOptions: attackOptions,
      targetHit: null,
      name: name,
      ships: [],
      board: board,
      computer: computer,
      shipsPlaced: true,
      loser: false
    };
  }
  return {
    name: name,
    ships: [],
    board: board,
    computer: computer,
    shipsPlaced: false,
    turn: false,
    loser: false
  };
}
