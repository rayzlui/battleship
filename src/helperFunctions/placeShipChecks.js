export function horizontalCheck(options) {
  const { spot, ship, player } = options;
  let upperbound;
  for (let i = 1; i <= 9; i++) {
    let num = i * 9 - 1;
    //this finds which row the player is trying to place the ship and the most right coordinate grid number is the upperbound.
    if (num >= spot) {
      upperbound = num;
      break;
    }
  }
  if (spot + ship.length - 1 > upperbound) {
    return false;
  }

  return player.board
    .slice(spot, spot + ship.length)
    .every(grid => grid.ship === null);
}

export function verticalCheck(options) {
  const { spot, ship, player } = options;

  for (let i = 0; i < ship.length; i++) {
    let x = i * 9;
    if (spot + x > 80 || player.board[spot + x].ship !== null) {
      return false;
    }
  }
  return true;
}

export function checkLegalMove(options) {
  return options.vertical ? verticalCheck(options) : horizontalCheck(options);
}
