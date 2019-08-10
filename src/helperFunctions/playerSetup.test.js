import { setupPlayers } from './playerSetup';

describe('playerSetup', () => {
  it('should returm object', () => {
    const player = setupPlayers(1);
    expect(player.name).toEqual('Player 1');
    expect(player.computer).toEqual(false);
    expect(player.board).toHaveLength(81);
  });
});
