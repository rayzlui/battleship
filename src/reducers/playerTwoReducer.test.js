import {
  RECEIVE_ATTACK_TWO,
  PLACE_SHIP_TWO,
  PLAYER_TWO_PLACED,
  START_ATTACK_ONE,
  START_ATTACK_TWO,
  BEGIN_ATTACK,
  START_ONE_PLAYER,
  UPDATE_ATTACK_OPTIONS,
} from '../actions/actionTypes';
import { setupPlayers } from '../helperFunctions/playerSetup';
import { createShip } from '../helperFunctions/shipSetup';
import { playerTwoReducer } from './playerTwoReducer';
import { setupComputer } from '../helperFunctions/computerSetup';

describe('playerTwoReducer', () => {
  describe('START_ONE_PLAYER', () => {
    const action = { type: START_ONE_PLAYER };
    const initialState = setupPlayers('2');
    const reducer = playerTwoReducer(initialState, action);
    expect(reducer).not.toEqual(initialState);
    expect(initialState.computer).toEqual(false);
    expect(reducer.computer).toEqual(true);
  });
  describe('RECEIVE_ATTACK_TWO', () => {
    describe('ship at target', () => {
      describe('should handle action', () => {
        const initialState = setupPlayers('2');
        const mockShip = createShip('cruiser');
        initialState.board[14].ship = mockShip;
        initialState.board[15].ship = mockShip;
        initialState.ships.push(mockShip);
        const action = { type: RECEIVE_ATTACK_TWO, target: 14 };
        const reducer = playerTwoReducer(initialState, action);
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
        const initialState = setupPlayers('2');
        const mockShip = createShip('battleship');
        mockShip.shiphits = 3;
        initialState.board[62].ship = mockShip;
        initialState.board[71].ship = mockShip;
        initialState.ships.push(mockShip);
        const action = { type: RECEIVE_ATTACK_TWO, target: 71 };
        const reducer = playerTwoReducer(initialState, action);
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
        const initialState = setupPlayers('2');
        const mockShip = createShip('cruiser');
        mockShip.shiphits = 1;
        initialState.board[62].ship = mockShip;
        initialState.board[71].ship = mockShip;
        initialState.ships.push(mockShip);
        const action = { type: RECEIVE_ATTACK_TWO, target: 1 };
        const reducer = playerTwoReducer(initialState, action);
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

  describe('PLACE_SHIP_TWO', () => {
    describe('should handle action', () => {
      const initialState = setupPlayers('2');
      const mockShip = createShip('cruiser');
      const mockShipPlace = { ship: mockShip, spot: 15, vertical: false };
      const action = { type: PLACE_SHIP_TWO, shipPlace: mockShipPlace };
      const reducer = playerTwoReducer(initialState, action);
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
      const initialState = setupPlayers('2');
      const mockShip = createShip('destroyer');
      const mockShipPlace = { ship: mockShip, spot: 0, vertical: true };
      const action = { type: PLACE_SHIP_TWO, shipPlace: mockShipPlace };
      const reducer = playerTwoReducer(initialState, action);
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
  });

  describe('PLAYER_TWO_PLACED', () => {
    it('should handle action', () => {
      const action = { type: PLAYER_TWO_PLACED };
      const initialState = { ships: [], board: [], shipsPlaced: false };
      const reducer = playerTwoReducer(initialState, action);
      expect(reducer).toEqual({ ships: [], board: [], shipsPlaced: true });
    });
  });

  describe('START_ATTACK_TWO', () => {
    const action = { type: START_ATTACK_TWO };
    const initialState = { ships: [], board: [], turn: false };
    const reducer = playerTwoReducer(initialState, action);
    expect(reducer).toEqual({ ships: [], board: [], turn: true });
  });

  describe('START_ATTACK_ONE', () => {
    const action = { type: START_ATTACK_ONE };
    const initialState = { ships: [], board: [], turn: true };
    const reducer = playerTwoReducer(initialState, action);
    expect(reducer).toEqual({ ships: [], board: [], turn: false });
  });

  describe('UPDATE_ATTACK_OPTIONS', () => {
    const mockComputer = setupComputer();
    let target = 5;
    const action = { type: UPDATE_ATTACK_OPTIONS, target: target };
    const reducer = playerTwoReducer(mockComputer, action);
    expect(mockComputer.attackOptions).toContain(target);
    expect(reducer.attackOptions).not.toContain(target);
  });

  describe('other action', () => {
    const action = { type: BEGIN_ATTACK };
    const initialState = setupPlayers('2');
    const reducer = playerTwoReducer(initialState, action);
    expect(reducer).toEqual(initialState);
  });
});
