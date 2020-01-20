import React from 'react';
import PropTypes from 'prop-types';

export function IntroPage(props) {
  const { startOnePlayer, startTwoPlayer, gameStart } = props;
  if (gameStart) return null;
  return (
    <section className="start__game">
      <h4>Please Select:</h4>
      <button className="oneplayerstart" onClick={startOnePlayer}>
        One Player
      </button>
      <button className="twoplayerstart" onClick={startTwoPlayer}>
        Two Player
      </button>
    </section>
  );
}

IntroPage.propTypes = {
  startOnePlayer: PropTypes.func,
  startTwoPlayer: PropTypes.func,
  gameStart: PropTypes.bool,
};
