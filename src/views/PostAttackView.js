import React from 'react';
import { AttackBoard } from './AttackBoard';
import { OwnBoard } from './OwnBoard';
import { getComputerAttackLocation } from '../helperFunctions/computerAttack';
import PropTypes from 'prop-types';
import { GameOverHeader } from './GameOverHeader';

export function PostAttackView(props) {
  const {
    postAttack,
    playerOne,
    playerTwo,
    endHoldScreen,
    attackPlayerOne,
    updateComputerAttackOptions,
    beginAttack,
    startAttackOne,
    startAttackTwo,
  } = props;
  if (!postAttack) return null;

  let attacker = playerTwo;
  let defender = playerOne;

  if (playerOne.turn) {
    attacker = playerOne;
    defender = playerTwo;
  }

  let header = <h2>Click on any empty attack grid to end turn.</h2>;

  let click = () => {
    endHoldScreen();
    if (defender.computer === true) {
      let target = getComputerAttackLocation(playerTwo, playerOne);
      attackPlayerOne(target);
      updateComputerAttackOptions(target);
      startAttackOne();
      beginAttack();
    } else {
      playerOne.turn ? startAttackTwo() : startAttackOne();
    }
  };

  if (attacker.loser || defender.loser) {
    const loser = attacker.loser ? attacker.name : defender.name;
    const winner = attacker.loser ? defender.name : attacker.name;
    click = () => alert(`${loser} is a loooooooser`);
    header = <GameOverHeader name={winner} />;
  }

  return (
    <section className="post-attack-view" onClick={click}>
      {header}
      <AttackBoard board={defender.board} receiveAttack={() => null} />

      <OwnBoard board={attacker.board} />
    </section>
  );
}

PostAttackView.propTypes = {
  postAttack: PropTypes.bool,
  playerOne: PropTypes.object,
  playerTwo: PropTypes.object,
  endHoldScreen: PropTypes.func,
  attackPlayerOne: PropTypes.func,
  updateComputerAttackOptions: PropTypes.func,
  startAttackOne: PropTypes.func,
  startAttackTwo: PropTypes.func,
  beginAttack: PropTypes.func,
};
