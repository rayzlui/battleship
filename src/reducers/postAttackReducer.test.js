import {
  RECEIVE_ATTACK_ONE,
  RECEIVE_ATTACK_TWO,
  START_ATTACK_ONE,
  START_ATTACK_TWO,
  BEGIN_ATTACK,
} from '../actions/actionTypes';
import { postAttackReducer } from './postAttackReducer';

describe('postAttackReducer', () => {
  it('should handle action', () => {
    const action = { type: RECEIVE_ATTACK_ONE };
    const reducer = postAttackReducer(undefined, action);
    expect(reducer).toEqual(true);
  });
  it('should handle action', () => {
    const action = { type: RECEIVE_ATTACK_TWO };
    const reducer = postAttackReducer(undefined, action);
    expect(reducer).toEqual(true);
  });

  it('should handle action', () => {
    const action = { type: START_ATTACK_ONE };
    const reducer = postAttackReducer(undefined, action);
    expect(reducer).toEqual(false);
  });

  it('should handle action', () => {
    const action = { type: START_ATTACK_TWO };
    const reducer = postAttackReducer(undefined, action);
    expect(reducer).toEqual(false);
  });

  it('should handle action', () => {
    const action = { type: BEGIN_ATTACK };
    const reducer = postAttackReducer(undefined, action);
    expect(reducer).toEqual(false);
  });
});
