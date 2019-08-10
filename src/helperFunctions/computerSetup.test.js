import {
  setupComputer,
  computerAttackOptions,
  placeAllCompShips,
  placeShips,
  findGridForCompShipPlacement,
} from './computerSetup';
import { createBoard } from '../classes/boardObject';

describe('setupComputer', () => {
  //we will test all the functions inside it, we just need to make sure it returns an object.
  it('should return object', () => {
    const computerObj = setupComputer();
    const { name, computer, board, attackOptions } = computerObj;
    expect(name).toEqual('computer');
    expect(computer).toBe(true);
    expect(board).toHaveLength(81);
    expect(attackOptions).toHaveLength(81);
  });
});

describe('computerAttackOptions', () => {
  it('should return array', () => {
    const options = computerAttackOptions();
    expect(options).toHaveLength(81);
  });
});

describe('placeAllCompShips', () => {
  //we'll test to make sure it returns the same object we placed. we're testing the other functions to make sure it does the job.
  const mockBoard = createBoard();
  const mockComputer = {
    ships: [{ battleship: { name: 'battleship', length: 5, sunk: false } }],
    board: mockBoard,
  };
  const compShipPlace = placeAllCompShips(mockComputer);
  expect(compShipPlace).toEqual(mockComputer);
});

describe('placeShips', () => {
  it('should handle vertical placement', () => {
    const mockShip = {
      name: 'battleship',
      length: 5,
      sunk: false,
      shiphits: 0,
    };
    const mockBoard = createBoard();
    const mockComputer = { name: 'computer', board: mockBoard, ships: [] };
    const shipsPlaced = placeShips({
      player: mockComputer,
      target: 8,
      ship: mockShip,
      vertical: true,
    });
    const { board, ships } = shipsPlaced;
    const expectedShipLocations = [8, 17, 26, 35, 44];
    expectedShipLocations.forEach(location => {
      expect(board[location]).toEqual({ hit: false, ship: mockShip });
    });
    expect(ships).toContain(mockShip);
  });
  it('should handle horizontal placement', () => {
    const mockShip = {
      name: 'cruiser',
      length: 4,
      sunk: false,
      shiphits: 0,
    };
    const mockBoard = createBoard();
    const mockComputer = { name: 'computer', board: mockBoard, ships: [] };
    const shipsPlaced = placeShips({
      player: mockComputer,
      target: 8,
      ship: mockShip,
      vertical: false,
    });
    const { board, ships } = shipsPlaced;
    const expectedShipLocations = [8, 9, 10, 11];
    expectedShipLocations.forEach(location => {
      expect(board[location]).toEqual({ hit: false, ship: mockShip });
    });
    expect(ships).toContain(mockShip);
  });
});

describe('findGridFromCompShipPlacement', () => {
  let counter = 0;
  const mockCheckLegalMove = jest.fn(() => {
    if (counter === 4) {
      return true;
    }
    counter++;
    return false;
  });
  const mockShip = { name: 'battleship', length: 5, shiphits: 0, sunk: false };
  const mockComputer = { name: 'computer', board: createBoard() };
  const spot = findGridForCompShipPlacement(
    { vertical: false, ship: mockShip, computer: mockComputer },
    mockCheckLegalMove,
  );
  expect(spot).toBeLessThan(80);
  expect(mockCheckLegalMove).toHaveBeenCalledTimes(5);
});
