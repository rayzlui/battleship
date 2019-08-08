import React from 'react';
import { GameOverHeader } from './GameOverHeader';
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

  let header = playerTwo.name + ' turn';
  let attacker = playerTwo;
  let defender = playerOne;
  let click = target => attackPlayerOne(target);

  if (playerOne.turn) {
    attacker = playerOne;
    defender = playerTwo;
    click = target => attackPlayerTwo(target);
    header = playerOne.name + ' turn';
  }

  if (attacker.loser || defender.loser) {
    click = () => alert(`${defender.name} is a loooooooser`);
    header = <GameOverHeader name={attacker.name} />;
  }

  display = (
    <div className="attack-board">
      <h2>{header}</h2>
      <div className="attack-board">
        <h3>Attack Board</h3>
        <AttackBoard board={defender.board} receiveAttack={click} />
      </div>
      <div className="own-board">
        <h3>Your Board</h3>
        <OwnBoard board={attacker.board} />
      </div>
    </div>
  );

  return display;
}
