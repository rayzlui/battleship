import React from 'react';
import { AttackBoard } from './AttackBoard';
import { OwnBoard } from './OwnBoard';
import { getComputerAttackLocation } from '../helperFunctions/computerAttack';
import PropTypes from 'prop-types';

export function PostAttackView(props) {
  const {
    postAttack,
    playerOne,
    playerTwo,
    endHoldScreen,
    attackPlayerOne,
    updateComputerAttackOptions,
    startAttackOne,
    startAttack,
    startAttackTwo,
  } = props;
  if (!postAttack) return null;

  let attacker = playerTwo;
  let defender = playerOne;

  if (playerOne.turn) {
    attacker = playerOne;
    defender = playerTwo;
  }

  let click = () => {
    endHoldScreen();
    if (!defender.loser) {
      if (defender.computer === true) {
        let target = getComputerAttackLocation(playerTwo, playerOne);
        attackPlayerOne(target);
        updateComputerAttackOptions(target);
        startAttackOne();
        startAttack();
      } else {
        playerOne.turn ? startAttackTwo() : startAttackOne();
      }
    }
  };

  return (
    <div className="attack-board" onClick={click}>
      <h2>Click on any empty attack grid to end turn.</h2>
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
  startAttack: PropTypes.func,
};
