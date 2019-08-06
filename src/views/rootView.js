import React from "react";
import { PlaceShipsViewContainer } from "../containers/PlaceShipsViewContainer";
import { IntroPageContainer } from "../containers/IntroPageContainer";
import { StartRoundButtonContainer } from "../containers/StartRoundButtonContainer";
import { AttackViewContainer } from "../containers/AttackViewContainer";

export function RootView(props) {
  return (
    <div
      className="game-container"
      style={{ textAlign: "center", display: "inline-block" }}
    >
      <div className="game-title">
        <h1 className="title">BATTLETO-- SHIPS. BATTLE SHIPS</h1>
      </div>
      <div className="display-continer">
        <IntroPageContainer />
        <StartRoundButtonContainer />
        <PlaceShipsViewContainer />
        <AttackViewContainer />
      </div>
    </div>
  );
}

export default RootView;
