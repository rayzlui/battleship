import {
  randomAdjacentValues,
  getComputerAttackLocation,
} from './computerAttack';

describe('randomAdjacentValues', () => {
  const mockAttackOptions = [
    1,
    2,
    3,
    4,
    5,
    6,
    11,
    12,
    13,
    14,
    23,
    45,
    67,
    33,
    34,
    35,
  ];

  describe('target is null', () => {
    it('should return empty array', () => {
      const adjacentValues = randomAdjacentValues(null, mockAttackOptions);
      expect(adjacentValues).toHaveLength(0);
    });
  });

  describe('target has adjacent values in attackOptions', () => {
    it('should return array', () => {
      const adjacentValues = randomAdjacentValues(5, mockAttackOptions);
      const expectedArray = [6, 4, 14];
      expect(adjacentValues).toHaveLength(3);
      adjacentValues.forEach((value, index) => {
        expect(value).toEqual(expectedArray[index]);
      });
    });
  });

  describe('target does not have adjacent values in attackOptions', () => {
    it('should return empty', () => {
      const adjacentValues = randomAdjacentValues(50, mockAttackOptions);
      expect(adjacentValues).toHaveLength(0);
    });
  });
});

describe('getComputerAttackLocation', () => {
  const mockPlayer = {
    board: [
      null,
      null,
      { ship: 'battleship' },
      { ship: 'battleship' },
      { ship: 'battleship' },
      { ship: 'battleship' },
      { ship: 'destroyer' },
      { ship: 'destroyer' },
      { ship: 'destroyer' },
      { ship: 'destroyer' },
      null,
      null,
      { ship: 'cruiser' },
      { ship: 'cruiser' },
    ],
  };

  describe('targetHit location has ship', () => {
    describe('there are adjacent values', () => {
      it('should return an adjacent value', () => {
        const mockComputer = {
          attackOptions: [1, 2, 3, 5, 6, 8, 10, 11, 17, 18, 19],
          targetHit: 9,
        };
        const spot = getComputerAttackLocation(mockComputer, mockPlayer);
        expect(spot === 0 || spot === 18 || spot === 8 || spot === 10).toBe(
          true,
        );
      });
    });

    describe('there are adjacent values', () => {
      it('should return an adjacent value', () => {
        const mockComputer = {
          attackOptions: [1, 2, 3, 5, 6, 8, 16],
          targetHit: 7,
        };
        const spot = getComputerAttackLocation(mockComputer, mockPlayer);
        expect(spot === 6 || spot === 8 || spot === 16).toBe(true);
      });
    });

    describe('there are no adjacent values', () => {
      it('should return random value', () => {
        const mockAttackOptions = [1, 5, 8];
        const mockComputer = { attackOptions: mockAttackOptions, targetHit: 3 };
        const spot = getComputerAttackLocation(mockComputer, mockPlayer);
        expect(mockAttackOptions.includes(spot)).toBe(true);
      });
    });
  });

  describe('targetHit location is null', () => {
    it('should return a random value', () => {
      const mockAttackOptions = [1, 2, 3, 5, 6, 8];
      const mockComputer = { attackOptions: mockAttackOptions, targetHit: 0 };
      const spot = getComputerAttackLocation(mockComputer, mockPlayer);
      expect(mockAttackOptions.includes(spot)).toBe(true);
    });
  });
});
