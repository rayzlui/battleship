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
    startAttackOne,
    beginAttack,
    startAttackTwo,
  } = props;
  if (!postAttack) return null;

  let attacker = playerTwo;
  let defender = playerOne;

  if (playerOne.turn) {
    attacker = playerOne;
    defender = playerTwo;
  }

  let header = 'Click on any empty attack grid to end turn.';

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

  if (defender.loser) {
    click = () => alert(`${defender.name} is a loooooooser`);
    header = <GameOverHeader name={attacker.name} />;
  }

  return (
    <div className="attack-board" onClick={click}>
      <h2>{header}</h2>
      <div className="attack-board">
        <h3>Attack Board</h3>
        <AttackBoard board={defender.board} receiveAttack={() => null} />
      </div>
      <div className="own-board">
        <h3>Your Board</h3>
        <OwnBoard board={attacker.board} />
      </div>
    </div>
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
