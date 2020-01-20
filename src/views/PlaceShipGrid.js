import React from 'react';
import PropTypes from 'prop-types';

export function PlaceShipGrid(props) {
  const { selectGridForShip, grid } = props;

  const { ship } = grid;
  let click,
    color,
    shipImage = null;

  if (ship === null) {
    click = selectGridForShip;
    color = 'blue';
    shipImage = null;
  } else {
    const { name, image } = ship;
    color = 'grey';
    shipImage = <img src={image} alt={name} />;
  }

  return (
    <section className={`grid ${color}`} onClick={click}>
      {shipImage}
    </section>
  );
}

PlaceShipGrid.propTypes = {
  selectGridForShip: PropTypes.func,
  id: PropTypes.number,
  grid: PropTypes.object,
};
