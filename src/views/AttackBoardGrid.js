import React from 'react';
import PropTypes from 'prop-types';

export function AttackBoardGrid(props) {
  const { grid, receiveAttack } = props;

  const { ship, hit } = grid;
  let click,
    color = null;
  if (hit === false) {
    click = receiveAttack;
    color = 'blue';
  } else {
    click = () => alert("You've already attacked this position");
    color = ship === null ? 'green' : 'red';
  }

  return <section className={`grid ${color}`} onClick={click}></section>;
}

AttackBoardGrid.propTypes = {
  receiveAttack: PropTypes.func,
  grid: PropTypes.object,
};
