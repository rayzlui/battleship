import React from 'react';
import { AttackBoardGrid } from './AttackBoardGrid';
import PropTypes from 'prop-types';

export function AttackBoard(props) {
  const { receiveAttack, board } = props;
  let display = [];
  let x = 0;
  let row = [];
  for (let i = 0; i < board.length; i++) {
    const gridNum = i;
    let gridValues = board[i];

    row.push(
      <AttackBoardGrid
        key={`${gridNum} grid attack`}
        grid={gridValues}
        receiveAttack={() => receiveAttack(gridNum)}
      />,
    );
    if (row.length === 9) {
      display.push(<li key={x}>{row}</li>);
      x += 1;
      row = [];
    }
  }

  return (
    <section className="attack__screen">
      <h3>Attack Board</h3>
      <section className="attack__board">
        <ul>{display}</ul>
      </section>
    </section>
  );
}

AttackBoard.propTypes = {
  receiveAttack: PropTypes.func,
  board: PropTypes.array,
};
