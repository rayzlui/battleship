import React from 'react';
import { PlaceShipViewContainer } from '../containers/PlaceShipViewContainer';
import { IntroPageContainer } from '../containers/IntroPageContainer';
import { StartRoundButtonContainer } from '../containers/StartRoundButtonContainer';
import { AttackViewContainer } from '../containers/AttackViewContainer';
import { PostAttackContainer } from '../containers/PostAttackContainer';

export function RootView() {
  return (
    <div className="game__container">
      <img
        className="background-image"
        alt="a ship firing"
        src="https://nationalinterest.org/sites/default/files/styles/desktop__1260_/public/main_images/bang_2.jpg?itok=kzU9qcIq"
      ></img>
      <section className="game__title">
        <header>
          <h1 className="title">BATTLETO-- SHIPS. BATTLE SHIPS</h1>
        </header>
      </section>
      <section className="game__display">
        <IntroPageContainer />
        <StartRoundButtonContainer />
        <PlaceShipViewContainer />
        <AttackViewContainer />
        <PostAttackContainer />
      </section>
    </div>
  );
}

export default RootView;
