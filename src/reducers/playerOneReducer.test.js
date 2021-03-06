import {
  RECEIVE_ATTACK_ONE,
  PLACE_SHIP_ONE,
  PLAYER_ONE_PLACED,
  START_ATTACK_ONE,
  START_ATTACK_TWO,
  BEGIN_ATTACK,
} from '../actions/actionTypes';
import { setupPlayers } from '../helperFunctions/playerSetup';
import { createShip } from '../helperFunctions/shipSetup';
import { playerOneReducer } from './playerOneReducer';

describe('playerOneReducer', () => {
  describe('receiveAttackOne', () => {
    describe('ship at target', () => {
      describe('should handle action', () => {
        const initialState = setupPlayers('1');
        const mockShip = createShip('cruiser');
        initialState.board[14].ship = mockShip;
        initialState.board[15].ship = mockShip;
        initialState.ships.push(mockShip);
        const action = { type: RECEIVE_ATTACK_ONE, target: 14 };
        const reducer = playerOneReducer(initialState, action);
        const { board, ships, loser, computer, shipsPlaced, turn } = reducer;
        const gridLocation = board[14];
        const boardShip = gridLocation.ship;
        it('should register board hit', () => {
          expect(gridLocation.hit).toEqual(true);
        });
        it('should register ship hit', () => {
          expect(mockShip.shiphits).toEqual(0);
          expect(boardShip.shiphits).toEqual(1);
          expect(ships).toHaveLength(1);
          expect(ships[0]).toBe(boardShip);
        });
        expect(loser).toEqual(false);
        expect(computer).toEqual(initialState.computer);
        expect(shipsPlaced).toEqual(initialState.shipsPlaced);
        expect(turn).toEqual(initialState.turn);
        expect(initialState).not.toBe(reducer);
      });
    });
    describe('ship at location, sunk all ships', () => {
      describe('should handle action', () => {
        const initialState = setupPlayers('1');
        const mockShip = createShip('battleship');
        mockShip.shiphits = 3;
        initialState.board[62].ship = mockShip;
        initialState.board[71].ship = mockShip;
        initialState.ships.push(mockShip);
        const action = { type: RECEIVE_ATTACK_ONE, target: 71 };
        const reducer = playerOneReducer(initialState, action);
        const { board, ships, loser, computer, shipsPlaced, turn } = reducer;
        const gridLocation = board[71];
        const boardShip = gridLocation.ship;
        it('should register board hit', () => {
          expect(gridLocation.hit).toEqual(true);
        });
        it('should register ship hit', () => {
          expect(boardShip.shiphits).toEqual(4);
          expect(ships).toHaveLength(1);
          expect(ships[0]).toBe(boardShip);
          expect(mockShip).not.toBe(ships[0]);
        });
        it('should sink shit', () => {
          expect(boardShip.sunk).toEqual(true);
        });
        it('should register loser', () => {
          expect(loser).toEqual(true);
        });
        expect(computer).toEqual(initialState.computer);
        expect(shipsPlaced).toEqual(initialState.shipsPlaced);
        expect(turn).toEqual(initialState.turn);
        expect(initialState).not.toBe(reducer);
      });
    });

    describe('no ship at location', () => {
      describe('should handle action', () => {
        const initialState = setupPlayers('1');
        const mockShip = createShip('cruiser');
        mockShip.shiphits = 1;
        initialState.board[62].ship = mockShip;
        initialState.board[71].ship = mockShip;
        initialState.ships.push(mockShip);
        const action = { type: RECEIVE_ATTACK_ONE, target: 1 };
        const reducer = playerOneReducer(initialState, action);
        const { board, ships, loser, computer, shipsPlaced, turn } = reducer;
        const gridLocation = board[1];
        expect(gridLocation.ship).toEqual(null);
        it('should register grid hit', () => {
          expect(gridLocation.hit).toEqual(true);
        });
        it('should make a copy of initial state', () => {
          expect(ships).toHaveLength(1);
          expect(mockShip).not.toBe(ships[0]);
          expect(board[62].ship).toBe(ships[0]);
          expect(ships[0].shiphits).toEqual(initialState.ships[0].shiphits);
          expect(loser).toEqual(initialState.loser);
          expect(computer).toEqual(initialState.computer);
          expect(shipsPlaced).toEqual(initialState.shipsPlaced);
          expect(turn).toEqual(initialState.turn);
          expect(initialState).not.toBe(reducer);
        });
      });
    });
  });

  describe('PLACE_SHIP_ONE', () => {
    describe('should handle action', () => {
      const initialState = setupPlayers('1');
      const mockShip = createShip('cruiser');
      const mockShipPlace = { ship: mockShip, spot: 15, vertical: false };
      const action = { type: PLACE_SHIP_ONE, shipPlace: mockShipPlace };
      const reducer = playerOneReducer(initialState, action);
      it('should place ship correctly', () => {
        expect(initialState.ships).toHaveLength(0);
        expect(reducer.ships).toHaveLength(1);
        expect(reducer.ships[0]).toEqual(mockShip);
        expect(reducer.board[15].ship).toEqual(mockShip);
        expect(reducer.board[16].ship).toEqual(mockShip);
      });
      it('should not place ship anywhere else', () => {
        let nullGrids = reducer.board.filter(x => x.ship === null);
        expect(nullGrids.length).toEqual(
          reducer.board.length - reducer.ships[0].length,
        );
      });
    });

    describe('should handle action', () => {
      const initialState = setupPlayers('1');
      const mockShip = createShip('destroyer');
      const mockShipPlace = { ship: mockShip, spot: 0, vertical: true };
      const action = { type: PLACE_SHIP_ONE, shipPlace: mockShipPlace };
      const reducer = playerOneReducer(initialState, action);
      it('should place ship correctly', () => {
        expect(initialState.ships).toHaveLength(0);
        expect(reducer.ships).toHaveLength(1);
        expect(reducer.ships[0]).toEqual(mockShip);
        expect(reducer.board[0].ship).toEqual(mockShip);
        expect(reducer.board[9].ship).toEqual(mockShip);
        expect(reducer.board[18].ship).toEqual(mockShip);
      });
      it('should not place ship anywhere else', () => {
        let nullGrids = reducer.board.filter(x => x.ship === null);
        expect(nullGrids.length).toEqual(
          reducer.board.length - reducer.ships[0].length,
        );
      });
    });
    describe('should handle action', () => {
      const initialState = setupPlayers('1');
      initialState.ships.push(
        createShip('cruiser'),
        createShip('battleship'),
        createShip('submarine'),
        createShip('carrier'),
      );
      const mockShip = createShip('destroyer');
      const mockShipPlace = { ship: mockShip, spot: 0, vertical: true };
      const action = { type: PLACE_SHIP_ONE, shipPlace: mockShipPlace };
      const reducer = playerOneReducer(initialState, action);
      it('should place ship correctly', () => {
        expect(initialState.ships).toHaveLength(4);
        expect(reducer.ships).toHaveLength(5);
        expect(reducer.ships[4]).toEqual(mockShip);
        expect(reducer.board[0].ship).toEqual(mockShip);
        expect(reducer.board[9].ship).toEqual(mockShip);
        expect(reducer.board[18].ship).toEqual(mockShip);
      });
      it('should not place ship anywhere else', () => {
        let nullGrids = reducer.board.filter(x => x.ship === null);
        expect(nullGrids.length).toEqual(
          reducer.board.length - reducer.ships[4].length,
        );
      });
      it('should handle shipPlaced', () => {
        expect(initialState.shipsPlaced).toBe(false);
        expect(initialState.turn).toBe(false);
        expect(reducer.shipsPlaced).toBe(true);
        expect(reducer.turn).toBe(true);
      });
    });
  });

  describe('START_ATTACK_ONE', () => {
    const action = { type: START_ATTACK_ONE };
    const initialState = { ships: [], board: [], turn: false };
    const reducer = playerOneReducer(initialState, action);
    expect(reducer).toEqual({ ships: [], board: [], turn: true });
  });

  describe('START_ATTACK_TWO', () => {
    const action = { type: START_ATTACK_TWO };
    const initialState = { ships: [], board: [], turn: true };
    const reducer = playerOneReducer(initialState, action);
    expect(reducer).toEqual({ ships: [], board: [], turn: false });
  });

  describe('other action', () => {
    const action = { type: BEGIN_ATTACK };
    const initialState = setupPlayers('1');
    const reducer = playerOneReducer(initialState, action);
    expect(reducer).toEqual(initialState);
  });
});
