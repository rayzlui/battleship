import React from 'react';
import PropTypes from 'prop-types';

export function StartRoundButton(props) {
  const { beginAttack, playerOne, playerTwo, nextTurn } = props;
  if (!nextTurn) return null;
  let name = playerOne.turn ? playerOne.name : playerTwo.name;
  return (
    <section className="change-players-cutscreen">
      <button
        className="start-next-player-button"
        onClick={beginAttack}
      >{`Click to Start ${name}'s Turn`}</button>
    </section>
  );
}

StartRoundButton.propTypes = {
  beginAttack: PropTypes.func,
  playerOne: PropTypes.object,
  playerTwo: PropTypes.object,
  nextTurn: PropTypes.object,
};
