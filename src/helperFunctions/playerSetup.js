import { createPlayer } from '../classes/playerObject';
import { createBoard } from '../classes/boardObject';

export function setupPlayers(num) {
  let name = `Player ${num}`;
  let board = createBoard();
  let player = createPlayer({ name: name, computer: false, board: board });

  return player;
}
