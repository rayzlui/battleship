import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { tryAndPlaceShip } from '../helperFunctions/placeShipChecks';
import { PlaceShipBoard } from './PlaceShipBoard';
import { ShipOptionsDisplay } from './ShipOptions';
import { TogglePlacement } from './TogglePlacementButton';

export function PlaceShipView(props) {
  const [isVertical, flipDirection] = useState(true);
  const [selectedShip, changeShip] = useState(null);
  const {
    placedShips,
    playerOne,
    playerTwo,
    gameStart,
    placeShipOne,
    placeShipTwo,
    completedPlacement,
  } = props;

  if (placedShips || !gameStart) return null;
  if (playerOne.shipsPlaced && playerTwo.shipsPlaced) {
    completedPlacement();
    return null;
  }

  let player = playerOne.shipsPlaced ? playerTwo : playerOne;

  let click = () => null;
  let selectedShipHeader = null;

  if (selectedShip) {
    const placementFunction =
      player.name === 'Player 1' ? placeShipOne : placeShipTwo;

    click = target =>
      tryAndPlaceShip({
        changeShip,
        placementFunction,
        isVertical,
        target,
        selectedShip,
        player,
      });
    selectedShipHeader = `You have selected ${selectedShip.name}`;
  }
  return (
    <section className="place-ships-board">
      <section className="place__ships__info">
        <h4>{player.name + ' Place Your Ships'}</h4>
        <p>{selectedShipHeader}</p>
      </section>
      <section className="place__ship__board">
        <h3>Place Your Ships</h3>
        <PlaceShipBoard board={player.board} selectGridForShip={click} />
      </section>
      <section className="place__ship__options">
        <ShipOptionsDisplay changeShip={changeShip} player={player} />
        <TogglePlacement
          isVertical={isVertical}
          flipDirection={flipDirection}
        />
      </section>
    </section>
  );
}

PlaceShipView.propTypes = {
  placedShips: PropTypes.bool,
  playerOne: PropTypes.object,
  playerTwo: PropTypes.object,
  gameStart: PropTypes.bool,
  placeShipOne: PropTypes.func,
  placeShipTwo: PropTypes.func,
  completedPlacement: PropTypes.func,
};
