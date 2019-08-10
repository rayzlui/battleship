import React from 'react';
import PropTypes from 'prop-types';

export function OwnBoardGrid(props) {
  const { grid } = props;

  const { ship } = grid;
  let color,
    shipImage = null;

  let click = () => alert("You can't attack yourself silly.");
  if (ship === null) {
    color = grid.hit === true ? 'white' : 'blue';
  } else {
    if (grid.hit === true) {
      color = 'red';
    } else {
      const { image, name } = ship;
      color = 'grey';
      shipImage = (
        <img
          className="grid-ship-image"
          src={image}
          alt={name}
          style={{
            height: 30,
            width: 30,
            display: 'inline-block',
            margin: 0,
          }}
        />
      );
    }
  }

  return (
    <div
      className={`grid ${color}`}
      style={{
        backgroundColor: color,
        height: '60px',
        width: '60px',
        borderWidth: '5px',
        borderColor: 'black',
        display: 'inline-block',
        margin: 1,
        verticalAlign: 'top',
      }}
      onClick={click}
    >
      {shipImage}
    </div>
  );
}

OwnBoardGrid.propTypes = {
  grid: PropTypes.object,
  id: PropTypes.string,
};
