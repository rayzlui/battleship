import React from 'react';
import { PlaceShipGrid } from './PlaceShipGrid';
import PropTypes from 'prop-types';

export function PlaceShipBoard(props) {
  const { selectGridForShip, board } = props;
  let display = [];
  let rowNum = 0;
  let row = [];
  for (let i = 0; i < board.length; i++) {
    const gridNum = i;
    let grid = board[i];
    row.push(
      <PlaceShipGrid
        key={`${gridNum} grid`}
        grid={grid}
        selectGridForShip={() => selectGridForShip(gridNum)}
      />,
    );
    if (row.length === 9) {
      display.push(<li key={rowNum}>{row}</li>);
      rowNum += 1;
      row = [];
    }
  }

  return <ul>{display}</ul>;
}

PlaceShipBoard.propTypes = {
  selectGridForShip: PropTypes.func,
  board: PropTypes.array,
};
