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
      shipImage = <img className="grid-ship-image" src={image} alt={name} />;
    }
  }

  return (
    <section className={`grid ${color}`} onClick={click}>
      {shipImage}
    </section>
  );
}

OwnBoardGrid.propTypes = {
  grid: PropTypes.object,
  id: PropTypes.string,
};
