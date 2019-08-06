import React from "react";

export function StartRoundButton(props) {
  const { startAttack, currentPlayer, nextPlayer, nextTurn } = props;
  if (!nextTurn) return null;
  let name = currentPlayer.turn ? currentPlayer.name : nextPlayer.name;
  return (
    <div className="change-players-cutscreen">
      <h2
        className="start-next-player-button"
        onClick={startAttack}
      >{`Click to Start ${name}'s Turn`}</h2>
    </div>
  );
}
