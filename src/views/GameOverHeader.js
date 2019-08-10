import React from 'react';
import PropTypes from 'prop-types';

export function GameOverHeader(props) {
  const { name } = props;
  return (
    <div className="game-over">
      {alert(`Game Over! ${name} Wins!`)}
      <h1 className="game-over-banner">{`Game Over! ${name} Wins!`}</h1>
    </div>
  );
}

GameOverHeader.propTypes = {
  name: PropTypes.string,
};
