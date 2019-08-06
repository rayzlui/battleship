import React from "react";

export function OwnBoardGrid(props) {
  const { value, id } = props;

  const { ship } = value;
  let color,
    shipImage = null;

  let click = () => alert("You can't attack yourself silly.");
  if (ship === null) {
    color = value.hit === true ? "white" : "blue";
  } else {
    if (value.hit === true) {
      color = "red";
    } else {

      const { image } = ship;
      color = "grey";
      shipImage = (
        <img
          src={image}
          alt={image}
          style={{
            height: 30,
            width: 30,
            display: "inline-block",
            margin: 0
          }}
        />
      );
    }
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
