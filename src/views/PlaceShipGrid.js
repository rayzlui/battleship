import React from "react";

export function PlaceShipGrid(props) {
  const { selectGridForShip, info, id } = props;

  const { ship } = info;
  let click,
    color,
    shipImage = null;

  if (ship === null) {
    click = selectGridForShip;
    color = "blue";
    shipImage = null;
  } else {
    const { image } = ship;
    color = "grey";
    click = null;
    shipImage = (
      <img
        src={image}
        alt={image}
        style={{ height: 30, width: 30, display: "inline-block", margin: 0 }}
      />
    );
  }

  return (
    <div
      className={"grid" + id}
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
