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
    <section className="ownboard__screen">
      <h3 className="ownboard__head">Your Board</h3>
      <ul>{display}</ul>
    </section>
  );
}

OwnBoard.propTypes = {
  board: PropTypes.array,
};
