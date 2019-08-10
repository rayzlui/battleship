import React from 'react';
import {
  createShip,
  IMAGE_URLS,
  SHIP_OPTIONS,
} from '../helperFunctions/shipSetup';
import PropTypes from 'prop-types';

export function ShipOptionsDisplay(props) {
  const { player, changeShip } = props;
  const ships = SHIP_OPTIONS.slice();
  const shipImages = ships.reduce((acc, curr) => {
    if (player.ships.find(x => x.name === curr) === undefined) {
      acc.push(
        <img
          key={curr}
          className={curr}
          src={IMAGE_URLS[curr]}
          alt={curr}
          onClick={() => {
            const newship = createShip(curr);
            changeShip(newship);
          }}
        />,
      );
    }
    return acc;
  }, []);
  return <>{shipImages}</>
}

ShipOptionsDisplay.propTypes = {
  player: PropTypes.object,
  changeShip: PropTypes.func,
};
