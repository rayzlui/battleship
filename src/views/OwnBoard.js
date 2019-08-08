import React from 'react';
import { OwnBoardGrid } from './OwnBoardGrid';
import PropTypes from 'prop-types';

export function OwnBoard(props) {
  const { board } = props;
  let display = [];
  let rowNum = 0;
  let row = [];

  for (let i = 0; i < board.length; i++) {
    const gridNum = i;
    const grid = board[i];
    row.push(
      <OwnBoardGrid key={`ownBoard ${gridNum}`} id={'own-board'} grid={grid} />,
    );

    if (row.length === 9) {
      display.push(<li key={rowNum}>{row}</li>);
      rowNum += 1;
      row = [];
    }
  }

  return (
    <div className="gameboard" style={{ backgroundColor: 'black' }}>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>{display}</ul>
    </div>
  );
}

OwnBoard.propTypes = {
  board: PropTypes.array,
};
