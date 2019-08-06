import React from "react";

export function AttackBoardGrid(props) {
  const { value, receiveAttack } = props;

  const { ship, hit } = value;
  let click,
    color,
    shipImage = null;

  if (hit === false) {
    click = receiveAttack;
    color = "blue";
  } else {
    click = () => alert("You've already attacked this position");
    color = ship === null ? "green" : "red";
  }

  return (
    <div
      className={`grid ${color}`}
      style={{
        backgroundColor: color,
        height: "60px",
        width: "60px",
        borderWidth: "5px",
        borderColor: "black",
        display: "inline-block",
        margin: 1,
        verticalAlign: "top"
      }}
      onClick={click}
    >
      {shipImage}
    </div>
  );
}
