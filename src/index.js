import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

/*
Player holds the overall master grids array, will use this to determine if game over or not.
Player uses master grids to produce board
  Board uses that to produce singular grids
  Grids will have receiveAttack function that sends back up to Player to determine if hit.
  Board will show both current Player and opp board. Depending on which it will display which info for ships + hits etc.

*/


serviceWorker.unregister();
