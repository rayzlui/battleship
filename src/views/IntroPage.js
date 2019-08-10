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
      <button className="oneplayerstart" onClick={startOnePlayer}>
        One Player
      </button>
      <button className="twoplayerstart" onClick={startTwoPlayer}>
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
