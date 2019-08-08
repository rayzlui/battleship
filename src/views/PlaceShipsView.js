import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { checkLegalMove } from '../helperFunctions/placeShipChecks';
import { PlaceShipsBoard } from './PlaceShipsBoard';
import { ShipOptionsDisplay } from './ShipOptions';
import { TogglePlacement } from './TogglePlacementButton';

export function PlaceShipsView(props) {
  const [isVertical, flipDirection] = useState(true);
  const [selectedShip, changeShip] = useState(null);
  const {
    placedShips,
    playerOne,
    playerTwo,
    gameStart,
    placeShipOne,
    placeShipTwo,
    playerOnePlaced,
    playerTwoPlaced,
    completedPlacement,
  } = props;

  if (placedShips || !gameStart) return null;
  if (playerOne.shipsPlaced && playerTwo.shipsPlaced) {
    completedPlacement();
  }

  let player = playerOne.shipsPlaced ? playerTwo : playerOne;

  if (player.ships.length === 5) {
    player.name === 'Player 1' ? playerOnePlaced() : playerTwoPlaced();
  }

  let click = () => null;
  let selectedShipHeader = null;

  if (selectedShip) {
    click = target => {
      let legalPlacement = checkLegalMove({
        vertical: isVertical,
        spot: target,
        ship: selectedShip,
        player: player,
      });

      if (legalPlacement) {
        let options = {
          spot: target,
          vertical: isVertical,
          ship: selectedShip,
        };
        player.name === 'Player 1'
          ? placeShipOne(options)
          : placeShipTwo(options);
      } else {
        alert('Error: You either have a piece there or it goes offboard');
      }

      changeShip(null);
    };

    selectedShipHeader = <h4>{`You have selected ${selectedShip.name}`}</h4>;
  }
  return (
    <div className="place-ships-board" style={{ display: 'inline' }}>
      <h2>{player.name + ' Place Your Ships'}</h2>
      {selectedShipHeader}
      <div className="place-ship-board">
        <PlaceShipsBoard board={player.board} selectGridForShip={click} />
      </div>
      <div className="place-ship-options">
        <TogglePlacement
          isVertical={isVertical}
          flipDirection={flipDirection}
        />
        <ShipOptionsDisplay changeShip={changeShip} player={player} />
      </div>
    </div>
  );
}

PlaceShipsView.propTypes = {
  placedShips: PropTypes.bool,
  playerOne: PropTypes.object,
  playerTwo: PropTypes.object,
  gameStart: PropTypes.bool,
  placeShipOne: PropTypes.func,
  placeShipTwo: PropTypes.func,
  playerOnePlaced: PropTypes.func,
  playerTwoPlaced: PropTypes.func,
  completedPlacement: PropTypes.func,
};
