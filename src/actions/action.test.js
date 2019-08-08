import {
  startOnePlayer,
  startTwoPlayer,
  receiveAttackOne,
  receiveAttackTwo,
  placeShipOne,
  placeShipTwo,
  completeShipPlacement,
  playerOnePlaced,
  playerTwoPlaced,
  beginAttack,
  startAttackOne,
  startAttackTwo,
  endHoldScreen,
  updateAttackOptions,
} from './actions';
import {
  START_ONE_PLAYER,
  START_TWO_PLAYER,
  RECEIVE_ATTACK_ONE,
  RECEIVE_ATTACK_TWO,
  PLACE_SHIP_ONE,
  PLACE_SHIP_TWO,
  PLACED_SHIPS_COMPLETED,
  PLAYER_ONE_PLACED,
  PLAYER_TWO_PLACED,
  START_ATTACK_ONE,
  START_ATTACK_TWO,
  BEGIN_ATTACK,
  END_HOLD_SCREEN,
  UPDATE_ATTACK_OPTIONS,
} from './actionTypes';

describe('startOnePlayer', () => {
  it('should return object', () => {
    const startObject = startOnePlayer();
    expect(startObject).toEqual({ type: START_ONE_PLAYER });
  });
});

describe('startTwoPlayer', () => {
  it('should return object', () => {
    const startObject = startTwoPlayer();
    expect(startObject).toEqual({ type: START_TWO_PLAYER });
  });
});

describe('receiveAttackOne', () => {
  it('should return object', () => {
    const target = 14;
    const receiveAttack = receiveAttackOne(target);
    expect(receiveAttack).toEqual({ type: RECEIVE_ATTACK_ONE, target: target });
  });
});

describe('receiveAttackTwo', () => {
  it('should return object', () => {
    const target = 33;
    const receiveAttack = receiveAttackTwo(target);
    expect(receiveAttack).toEqual({ type: RECEIVE_ATTACK_TWO, target: target });
  });
});

describe('placeShipOne', () => {
  it('should return object', () => {
    const options = {
      vertical: false,
      spot: 15,
      ship: { name: 'cruiser', length: 2, image: 'image_ur' },
    };
    const placeShip = placeShipOne(options);
    expect(placeShip).toEqual({ type: PLACE_SHIP_ONE, shipPlace: options });
  });
});

describe('placeShipTwo', () => {
  it('should return object', () => {
    const options = {
      vertical: true,
      spot: 10,
      ship: { name: 'destoryer', length: 5, image: 'image_url' },
    };
    const placeShip = placeShipTwo(options);
    expect(placeShip).toEqual({ type: PLACE_SHIP_TWO, shipPlace: options });
  });
});

describe('completeShipPlacement', () => {
  it('should return object', () => {
    const completePlace = completeShipPlacement();
    expect(completePlace).toEqual({ type: PLACED_SHIPS_COMPLETED });
  });
});

describe('playerOnePlaced', () => {
  it('should return object', () => {
    const onePlaced = playerOnePlaced();
    expect(onePlaced).toEqual({ type: PLAYER_ONE_PLACED });
  });
});

describe('playerTwoPlaced', () => {
  it('should return object', () => {
    const twoPlaced = playerTwoPlaced();
    expect(twoPlaced).toEqual({ type: PLAYER_TWO_PLACED });
  });
});

describe('startAttackOne', () => {
  it('should return object', () => {
    const startOne = startAttackOne();
    expect(startOne).toEqual({ type: START_ATTACK_ONE });
  });
});

describe('startAttackTwo', () => {
  it('should return object', () => {
    const startTwo = startAttackTwo();
    expect(startTwo).toEqual({ type: START_ATTACK_TWO });
  });
});

describe('startAttack', () => {
  it('should return object', () => {
    const startAttack = beginAttack();
    expect(startAttack).toEqual({ type: BEGIN_ATTACK });
  });
});

describe('endHoldScreen', () => {
  it('should return object', () => {
    const endHold = endHoldScreen();
    expect(endHold).toEqual({ type: END_HOLD_SCREEN });
  });
});

describe('updateAttackOptions', () => {
  it('should return object', () => {
    const target = 19;
    const updateAttack = updateAttackOptions(target);
    expect(updateAttack).toEqual({
      type: UPDATE_ATTACK_OPTIONS,
      target: target,
    });
  });
});
