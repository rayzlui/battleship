export function randomAdjacentValues(value, attackOptions) {
  if (value === null) return [];
  let adjacents = [value + 1, value - 1, value - 9, value + 9];
  let targets = adjacents.filter(x => attackOptions.includes(x));
  return targets;
}

export function getComputerAttackLocation(computer, player) {
  let { attackOptions, targetHit } = computer;
  let { board } = player;
  let target;
  const targets = randomAdjacentValues(targetHit, attackOptions);

  if (
    board[targetHit] &&
    board[targetHit].ship !== null &&
    targets.length !== 0
  ) {
    const index = targets[Math.floor(Math.random() * targets.length)];
    target = attackOptions[index];
  } else {
    let id = Math.floor(Math.random() * attackOptions.length);
    target = attackOptions[id];
  }

  return target;
}

