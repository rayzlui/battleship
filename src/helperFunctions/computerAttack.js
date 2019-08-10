export function randomAdjacentValues(target, attackOptions) {
  if (target === null) return [];
  let adjacents = [target + 1, target - 1, target - 9, target + 9];
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
    target = targets[Math.floor(Math.random() * targets.length)];
  } else {
    let spot = Math.floor(Math.random() * attackOptions.length);
    target = attackOptions[spot];
  }
  return target;
}
