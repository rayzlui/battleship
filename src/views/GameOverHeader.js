import React from "react";

export function GameOverHeader(props) {
  const { name } = props;
  return (
    <div className="game-over">
      {alert(`Game Over! ${name} Wins!`)}
      <h1 id="game-over-banner">{`Game Over! ${name}  Wins!`}</h1>
    </div>
  );
}
