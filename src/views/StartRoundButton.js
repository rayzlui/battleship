import React from 'react';
import PropTypes from 'prop-types';

export function StartRoundButton(props) {
  const { startAttack, playerOne, playerTwo, nextTurn } = props;
  if (!nextTurn) return null;
  let name = playerOne.turn ? playerOne.name : playerTwo.name;
  return (
    <div className="change-players-cutscreen">
      <h2
        className="start-next-player-button"
        onClick={startAttack}
      >{`Click to Start ${name}'s Turn`}</h2>
    </div>
  );
}

StartRoundButton.propTypes = {
  startAttack: PropTypes.func,
  playerOne: PropTypes.object,
  playerTwo: PropTypes.object,
  nextTurn: PropTypes.object,
};
