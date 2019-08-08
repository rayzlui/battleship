import { createBoard } from './boardObject';

describe('createBoard', () => {
  it('should return object', () => {
    const board = createBoard();
    expect(board).toHaveLength(81);
    board.forEach(grid => {
      expect(grid.ship).toEqual(null);
      expect(grid.hit).toBe(false);
    });
  });
});
