import {
  horizontalCheck,
  verticalCheck,
  tryAndPlaceShip,
} from './placeShipChecks';
import { createBoard } from '../classes/boardObject';
import { setupPlayers } from '../helperFunctions/playerSetup';
import { createShip } from './shipSetup';

describe('horizontalCheck', () => {
  describe('not ship at location', () => {
    it('should return true', () => {
      const mockPlayer = { board: createBoard() };
      const mockShip = { name: 'cruiser', length: 2 };
      const check = horizontalCheck({
        spot: 3,
        ship: mockShip,
        player: mockPlayer,
      });
      expect(check).toBe(true);
    });
    describe('falls off edge', () => {
      it('should return false', () => {
        const mockPlayer = { board: createBoard() };
        const mockShip = { name: 'cruiser', length: 2 };
        const check = horizontalCheck({
          spot: 8,
          ship: mockShip,
          player: mockPlayer,
        });
        expect(check).toBe(false);
      });
    });
  });
  describe('ship at target location', () => {
    it('should return false', () => {
      let mockBoard = createBoard();
      mockBoard[5].ship = { name: 'destroyer', length: 3 };
      mockBoard[6].ship = { name: 'destroyer', length: 3 };
      mockBoard[7].ship = { name: 'destroyer', length: 3 };
      const mockPlayer = { board: mockBoard };
      const mockShip = { name: 'cruiser', length: 2 };
      const check = horizontalCheck({
        spot: 5,
        ship: mockShip,
        player: mockPlayer,
      });
      expect(check).toBe(false);
    });
  });
});

describe('verticalCheck', () => {
  describe('not ship at location', () => {
    it('should return true', () => {
      const mockPlayer = { board: createBoard() };
      const mockShip = { name: 'cruiser', length: 2 };
      const check = verticalCheck({
        spot: 3,
        ship: mockShip,
        player: mockPlayer,
      });
      expect(check).toBe(true);
    });
    describe('falls off edge', () => {
      it('should return false', () => {
        const mockPlayer = { board: createBoard() };
        const mockShip = { name: 'cruiser', length: 2 };
        const check = verticalCheck({
          spot: 77,
          ship: mockShip,
          player: mockPlayer,
        });
        expect(check).toBe(false);
      });
    });
  });
  describe('ship at target location', () => {
    it('should return false', () => {
      let mockBoard = createBoard();
      mockBoard[5].ship = { name: 'destroyer', length: 3 };
      mockBoard[14].ship = { name: 'destroyer', length: 3 };
      mockBoard[23].ship = { name: 'destroyer', length: 3 };
      const mockPlayer = { board: mockBoard };
      const mockShip = { name: 'cruiser', length: 2 };
      const check = verticalCheck({
        spot: 5,
        ship: mockShip,
        player: mockPlayer,
      });
      expect(check).toBe(false);
    });
  });
});

describe('tryAndPlaceShip', () => {
  describe('legal place', () => {
    const mockPlacementFunction = jest.fn(options => {
      return options;
    });
    const mockPlayer = setupPlayers('1');
    const mockChangeShip = jest.fn(value => {
      return value;
    });
    const mockSelectedShip = createShip('battleship');
    tryAndPlaceShip({
      changeShip: mockChangeShip,
      player: mockPlayer,
      placementFunction: mockPlacementFunction,
      isVertical: true,
      target: 4,
      selectedShip: mockSelectedShip,
    });
    expect(mockPlacementFunction).toHaveBeenCalledWith({
      spot: 4,
      vertical: true,
      ship: mockSelectedShip,
    });
    expect(mockChangeShip).toHaveBeenCalledWith(null);
  });
  describe('illegal place', () => {
    const mockPlacementFunction = jest.fn(options => {
      return options;
    });
    const mockPlayer = setupPlayers('1');
    mockPlayer.board[2].ship = createShip('cruiser');
    const mockChangeShip = jest.fn(value => {
      return value;
    });
    const mockSelectedShip = createShip('battleship');
    tryAndPlaceShip({
      changeShip: mockChangeShip,
      player: mockPlayer,
      placementFunction: mockPlacementFunction,
      isVertical: false,
      target: 1,
      selectedShip: mockSelectedShip,
    });
    expect(mockPlacementFunction).not.toHaveBeenCalled();
    expect(mockChangeShip).toHaveBeenCalledWith(null);
  });
});
