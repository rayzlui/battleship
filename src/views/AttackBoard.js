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
    <div className="attackboard" style={{ backgroundColor: 'black' }}>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>{display}</ul>
    </div>
  );
}

AttackBoard.propTypes = {
  receiveAttack: PropTypes.func,
  board: PropTypes.object,
};
