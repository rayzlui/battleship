import React from 'react';
import PropTypes from 'prop-types';

export function GameOverHeader(props) {
  const { name } = props;
  return (
    <section className="game-over">
      {alert(`Game Over! ${name} Wins!`)}
      <h1 className="game-over-banner">{`Game Over! ${name} Wins!`}</h1>
    </section>
  );
}

GameOverHeader.propTypes = {
  name: PropTypes.string,
};
