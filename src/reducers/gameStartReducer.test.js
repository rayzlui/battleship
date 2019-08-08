import {
  START_ONE_PLAYER,
  START_TWO_PLAYER,
  BEGIN_ATTACK,
} from '../actions/actionTypes';
import { gameStartReducer } from './gameStartReducer';

describe('gameStartReducer', () => {
  it('should handle action', () => {
    const action = { type: START_ONE_PLAYER };
    const reducer = gameStartReducer(undefined, action);
    expect(reducer).toEqual(true);
  });
  it('should handle action', () => {
    const action = { type: START_TWO_PLAYER };
    const reducer = gameStartReducer(undefined, action);
    expect(reducer).toEqual(true);
  });
  it('should handle action', () => {
    const action = { type: BEGIN_ATTACK };
    const reducer = gameStartReducer(undefined, action);
    expect(reducer).toEqual(false);
  });
});
