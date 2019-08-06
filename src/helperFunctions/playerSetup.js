import { createPlayer } from "../classes/playerObject";
import { createBoard } from "../classes/boardObject";

export function setupPlayers(num) {
  let name = `Player ${num}`;
  let player = createPlayer({ name: name, computer: false });
  let board = createBoard();
  player.board = board;

  return player;
}
