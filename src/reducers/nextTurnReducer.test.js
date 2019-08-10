import {
  BEGIN_ATTACK,
  END_HOLD_SCREEN,
  RECEIVE_ATTACK_ONE,
  PLACED_SHIPS_COMPLETED,
} from '../actions/actionTypes';
import { nextTurnReducer } from './nextTurnReducer';

describe('nextTurnReducer', () => {
  it('should handle action', () => {
    const action = { type: BEGIN_ATTACK };
    const reducer = nextTurnReducer(undefined, action);
    expect(reducer).toEqual(false);
  });

  it('should handle action', () => {
    const action = { type: PLACED_SHIPS_COMPLETED };
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
