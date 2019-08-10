import { createShip } from './shipSetup';

describe('shipSetup', () => {
  it('should return object', () => {
    const ship = createShip('battleship');
    expect(ship.name).toEqual('battleship');
  });
});
