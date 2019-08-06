import React from "react";
import { GameOverHeader } from "./GameOverHeader";
import { getComputerAttackLocation } from "../helperFunctions/computerAttack";
import { AttackBoard } from "./AttackBoard";
import { OwnBoard } from "./OwnBoard";

export function AttackView(props) {
  //move function out as it does not actually set state.
  let display;
  const {
    gameStart,
    placedShips,
    currentPlayer,
    nextPlayer,
    attackPlayerTwo,
    attackPlayerOne,
    startAttackTwo,
    startAttackOne,
    endHoldScreen,
    nextTurn,
    postAttack,
    startAttack
  } = props;
  if (!gameStart || !placedShips || nextTurn) return null;

  let click = currentPlayer.turn
    ? id => attackPlayerTwo(id)
    : id => attackPlayerOne(id);
  let header = (
    <h2>
      {currentPlayer.turn ? currentPlayer.name : nextPlayer.name + " Turn"}
    </h2>
  );
  let attacker = currentPlayer.turn ? currentPlayer : nextPlayer;
  let defender = currentPlayer.turn ? nextPlayer : currentPlayer;
  //it will be either gameover or postAttack, never both.
  if (attacker.loser || defender.loser) {
    click = () => alert(`${defender.name} is a loooooooser`);
    header = <GameOverHeader name={attacker.name} />;
  } else if (postAttack) {
    header = <h2>Click on any empty attack grid to end turn.</h2>;
    click = () => {
      endHoldScreen();
      if (defender.computer === true) {
        let computer = defender;
        let target = getComputerAttackLocation(computer, attacker);
        attackPlayerOne(target);
        startAttackOne();
        startAttack();
      } else {
        currentPlayer.turn ? startAttackTwo() : startAttackOne();
      }
    };
  }

  display = (
    <div className="attack-board">
      {header}
      <div id="attack-board">
        <h3>Attack Board</h3>
        <AttackBoard
          value={defender.board}
          isOwnBoard={false}
          receiveAttack={click}
        />
      </div>
      <div id="own-board">
        <h3>Your Board</h3>
        <OwnBoard value={attacker.board} isOwnBoard={true} />
      </div>
    </div>
  );

  return display;
}
