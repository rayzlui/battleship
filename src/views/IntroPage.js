import React from 'react';
import PropTypes from 'prop-types';

export function IntroPage(props) {
  const { startOnePlayer, startTwoPlayer, gameStart } = props;
  if (gameStart) return null;
  return (
    <div
      className="start-game"
      style={{ textAlign: 'center', display: 'inline-block' }}
    >
      <button className="oneplayer" onClick={startOnePlayer}>
        One Player
      </button>
      <button className="twoplayer" onClick={startTwoPlayer}>
        Two Player
      </button>
    </div>
  );
}

IntroPage.propTypes = {
  startOnePlayer: PropTypes.func,
  startTwoPlayer: PropTypes.func,
  gameStart: PropTypes.bool,
};
