import { createPlayer } from './playerObject';
import { computerAttackOptions } from '../helperFunctions/computerSetup';

describe('createPlayer', () => {
  const mockBoard = [{ grid: 1 }, { grid: 2 }, { grid: 3 }, { grid: 4 }];
  describe('computer false', () => {
    it('should return object', () => {
      const mockName = 'player 1';
      const player = createPlayer({
        name: mockName,
        board: mockBoard,
        computer: false,
      });
      expect(player).toEqual({
        name: mockName,
        ships: [],
        board: mockBoard,
        computer: false,
        shipsPlaced: false,
        turn: false,
        loser: false,
      });
    });
  });

  describe('computer true', () => {
    it('should return object', () => {
      const mockName = 'computer';
      const mockAttackOptions = computerAttackOptions();
      const computer = createPlayer({
        name: mockName,
        board: mockBoard,
        attackOptions: mockAttackOptions,
        computer: true,
      });
      expect(computer).toEqual({
        attackOptions: mockAttackOptions,
        targetHit: null,
        name: 'computer',
        ships: [],
        board: mockBoard,
        computer: true,
        shipsPlaced: true,
        loser: false,
      });
    });
  });
});
