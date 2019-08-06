import React from "react";
import { PlaceShipGrid } from "./PlaceShipGrid";

export function PlaceShipsBoard(props) {
  const { selectGridForShip, value } = props;
  let display = [];
  let rowNum = 0;
  let row = [];
  for (let i = 0; i < value.length; i++) {
    const gridNum = i;
    let info = value[i];
    row.push(
      <PlaceShipGrid
        id={i}
        info={info}
        selectGridForShip={() => selectGridForShip(gridNum)}
      />
    );
    if (row.length === 9) {
      display.push(<li key={rowNum}>{row}</li>);
      rowNum += 1;
      row = [];
    }
  }

  return (
    <div className="gameboard" style={{ backgroundColor: "black" }}>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>{display}</ul>
    </div>
  );
}
