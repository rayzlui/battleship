import React from 'react';
import { AttackBoard } from './AttackBoard';
import { OwnBoard } from './OwnBoard';

export function AttackView(props) {
  let display;
  const {
    gameStart,
    placedShips,
    playerOne,
    playerTwo,
    attackPlayerTwo,
    attackPlayerOne,
    nextTurn,
    postAttack,
  } = props;

  if (!gameStart || !placedShips || nextTurn || postAttack) return null;

  let header = `${playerTwo.name} Turn`;
  let attacker = playerTwo;
  let defender = playerOne;
  let click = target => attackPlayerOne(target);

  if (playerOne.turn) {
    attacker = playerOne;
    defender = playerTwo;
    click = target => attackPlayerTwo(target);
    header = `${playerOne.name} Turn`;
  }

  display = (
    <div className="attack-board">
      <h2 className={'header attack-view'}>{header}</h2>
      <AttackBoard board={defender.board} receiveAttack={click} />
      <OwnBoard board={attacker.board} />
    </div>
  );

  return display;
}
