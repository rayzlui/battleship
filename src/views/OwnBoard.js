import React from "react";
import { OwnBoardGrid } from "./OwnBoardGrid";

export function OwnBoard(props) {
  const { receiveAttack, value, isOwnBoard } = props;
  let display = [];
  let rowNum = 0;
  let row = [];

  for (let i = 0; i < value.length; i++) {
    const gridNum = i;
    let grid = value[i];
    row.push(
      <OwnBoardGrid
        key={i}
        id={i}
        value={grid}
        isOwnBoard={isOwnBoard}
        receiveAttack={() => receiveAttack(gridNum)}
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
