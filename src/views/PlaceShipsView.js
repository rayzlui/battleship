import React, { useState } from "react";
import {
  createShip,
  IMAGE_URLS,
  SHIP_OPTIONS
} from "../helperFunctions/shipSetup";
import {
  verticalCheck,
  horizontalCheck
} from "../helperFunctions/placeShipChecks";
import PropTypes from "prop-types";
import { PlaceShipsBoard } from "./PlaceShipsBoard";

export function PlaceShipsView(props) {
  //move verticalize state to here, and pass it back into selectGridForShip
  const [isVertical, flipDirection] = useState(true);
  const [selectedShip, changeShip] = useState(null);

  let verticalDisplay;
  if (isVertical === true) {
    verticalDisplay = "Horizontalize Placement";
  } else {
    verticalDisplay = "Verticalize Placement";
  }

  const ships = SHIP_OPTIONS.slice();
  const {
    placedShips,
    currentPlayer,
    nextPlayer,
    gameStart,
    placeShipOne,
    placeShipTwo,
    playerOnePlaced,
    playerTwoPlaced,
    completedPlacement
  } = props;
  if (placedShips || currentPlayer === null || !gameStart) return null;
  if (currentPlayer.shipsPlaced && nextPlayer.shipsPlaced) {
    completedPlacement();
    return null;
  }

  let player = currentPlayer.shipsPlaced ? nextPlayer : currentPlayer;
  for (let i = 0; i < player.ships.length; i++) {
    let index = ships.indexOf(player.ships[i].name);
    if (index !== -1) {
      ships.splice(index, 1);
    }
  }
  let options = ships.map(ship => (
    <img
      key={ship}
      id={ship}
      src={IMAGE_URLS[ship]}
      alt={ship}
      onClick={() => {
        const newship = createShip(ship);
        changeShip(newship);
      }}
    />
  ));
  let completeFunc =
    player.name === "Player 1" ? playerOnePlaced : playerTwoPlaced;
  let click = () => null;
  let selectedShipHeader = null;
  if (player.ships.length === 5) {
    completeFunc();
  }
  if (selectedShip) {
    let placeFunc = player.name === "Player 1" ? placeShipOne : placeShipTwo;
    click = id => {
      let legalPlacement = isVertical
        ? verticalCheck({ id: id, ship: selectedShip, player: player })
        : horizontalCheck({ id: id, ship: selectedShip, player: player });
      if (legalPlacement) {
        placeFunc({ target: id, vertical: isVertical, ship: selectedShip });
      } else {
        alert("Error: You either have a piece there or it goes offboard");
      }
      changeShip(null);
    };

    selectedShipHeader = <h4>{`You have selected ${selectedShip.name}`}</h4>;
  }
  return (
    <div className="place-ships-board" style={{ display: "inline" }}>
      <h2>{player.name + " Place Your Ships"}</h2>
      {selectedShipHeader}
      <div id="place-ship-board">
        <PlaceShipsBoard value={player.board} selectGridForShip={click} />
      </div>
      <div id="place-ship-options">
        <button id="vertical-button" onClick={() => flipDirection(!isVertical)}>
          {verticalDisplay}
        </button>
        {options}
      </div>
    </div>
  );
}
