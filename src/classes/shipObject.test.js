import { shipObject } from './shipObject';

describe('shipObject', () => {
  it('should return object', () => {
    const mockName = 'battleship';
    const mockLength = 4;
    const mockImage = 'mock_url';
    const ship = shipObject({
      name: mockName,
      length: mockLength,
      image: mockImage,
    });
    expect(ship).toEqual({
      name: mockName,
      length: mockLength,
      shiphits: 0,
      sunk: false,
      image: mockImage,
    });
  });
});
