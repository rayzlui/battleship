import React from "react";
import { AttackBoardGrid } from "./AttackBoardGrid";

export function AttackBoard(props) {
  const { receiveAttack, value } = props;
  let display = [];
  let x = 0;
  let row = [];
  let element;
  for (let i = 0; i < value.length; i++) {
    const gridNum = i;
    let grid = value[i];

    element = (
      <AttackBoardGrid
        value={grid}
        receiveAttack={() => receiveAttack(gridNum)}
      />
    );
    row.push(element);
    if (row.length === 9) {
      display.push(<li key={x}>{row}</li>);
      x += 1;
      row = [];
    }
  }

  return (
    <div className="attackboard" style={{ backgroundColor: "black" }}>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>{display}</ul>
    </div>
  );
}
