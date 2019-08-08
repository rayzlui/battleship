import { PLACED_SHIPS_COMPLETED, BEGIN_ATTACK } from '../actions/actionTypes';
import { placedShipsReducer } from './placedShipsReducer';

describe('placedShipsReducer', () => {
  it('should handle action', () => {
    const action = { type: PLACED_SHIPS_COMPLETED };
    const reducer = placedShipsReducer(undefined, action);
    expect(reducer).toEqual(true);
  });

  it('should handle action', () => {
    const action = { type: BEGIN_ATTACK };
    const reducer = placedShipsReducer(undefined, action);
    expect(reducer).toEqual(false);
  });
});
