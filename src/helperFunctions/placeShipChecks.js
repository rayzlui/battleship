export function horizontalCheck(options) {
  const { id, ship, player } = options;

  let upperbound;
  for (let i = 1; i <= 9; i++) {
    let num = i * 9 - 1;
    //this finds which row the player is trying to place the ship and the most right coordinate grid number is the upperbound.
    if (num >= id) {
      upperbound = num;
      break;
    }
  }
  if (id + ship.length - 1 > upperbound) {
    return false;
  }

  return player.board
    .slice(id, id + ship.length)
    .every(grid => grid.ship === null);
}

export function verticalCheck(options) {
  const { id, ship, player } = options;

  for (let i = 0; i < ship.length; i++) {
    let x = i * 9;
    if (id + x > 80 || player.board[id + x].ship !== null) {
      return false;
    }
  }
  return true;
}

