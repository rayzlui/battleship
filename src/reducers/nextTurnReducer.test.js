import {
  BEGIN_ATTACK,
  PLAYER_TWO_PLACED,
  END_HOLD_SCREEN,
  RECEIVE_ATTACK_ONE,
} from '../actions/actionTypes';
import { nextTurnReducer } from './nextTurnReducer';

describe('nextTurnReducer', () => {
  it('should handle action', () => {
    const action = { type: BEGIN_ATTACK };
    const reducer = nextTurnReducer(undefined, action);
    expect(reducer).toEqual(false);
  });

  it('should handle action', () => {
    const action = { type: PLAYER_TWO_PLACED };
    const reducer = nextTurnReducer(undefined, action);
    expect(reducer).toEqual(true);
  });

  it('should handle action', () => {
    const action = { type: END_HOLD_SCREEN };
    const reducer = nextTurnReducer(undefined, action);
    expect(reducer).toEqual(true);
  });

  it('should handle action', () => {
    const action = { type: RECEIVE_ATTACK_ONE };
    const reducer = nextTurnReducer(undefined, action);
    expect(reducer).toEqual(false);
  });
});
