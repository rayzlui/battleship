import React from "react";

export function IntroPage(props) {
  const { startOnePlayer, startTwoPlayer, gameStart } = props;
  if (gameStart) return null;
  return (
    <div
      className="startGame"
      style={{ textAlign: "center", display: "inline-block" }}
    >
      <button className="oneplayer" onClick={startOnePlayer}>
        One Player
      </button>
      <button className="twoplayer" onClick={startTwoPlayer}>
        Two Player
      </button>
    </div>
  );
}
