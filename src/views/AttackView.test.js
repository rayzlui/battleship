import React from 'react';
import { shallow } from 'enzyme';
import { AttackView } from './AttackView';

describe('AttackView', () => {
  const mockAttackPlayerOne = jest.fn(() => {
    return 'player 1 attacked';
  });
  const mockAttackPlayerTwo = jest.fn(() => {
    return 'player 2 attacked';
  });
  describe('gameStart is false', () => {
    it('should render null', () => {
      const wrapper = shallow(<AttackView gameStart={false} />);
      expect(wrapper.isEmptyRender()).toBe(true);
    });
    describe('placeShips is false', () => {
      it('should render null', () => {
        const wrapper = shallow(<AttackView placeShips={false} />);
        expect(wrapper.isEmptyRender()).toBe(true);
      });
    });
    describe('nextTurn is true', () => {
      it('should render null', () => {
        const wrapper = shallow(<AttackView nextTurn={true} />);
        expect(wrapper.isEmptyRender()).toBe(true);
      });
    });
    describe('postAttack is true', () => {
      it('should render null', () => {
        const wrapper = shallow(<AttackView postAttack={true} />);
        expect(wrapper.isEmptyRender()).toBe(true);
      });
    });
  });

  describe('player one turn', () => {
    const mockPlayerOne = {
      name: 'Player One',
      board: [
        null,
        { ship: 'battleship' },
        { ship: 'cruiser' },
        { ship: 'destroyer' },
        null,
      ],
      ships: [],
      turn: true,
    };
    const mockPlayerTwo = {
      name: 'Player Two',
      board: [
        { ship: 'battleship' },
        null,
        { ship: 'cruiser' },
        { ship: 'destroyer' },
        null,
      ],
      ships: [],
      turn: false,
    };
    const wrapper = shallow(
      <AttackView
        gameStart={true}
        placedShips={true}
        nextTurn={false}
        postAttack={false}
        playerOne={mockPlayerOne}
        playerTwo={mockPlayerTwo}
        attackPlayerOne={mockAttackPlayerOne}
        attackPlayerTwo={mockAttackPlayerTwo}
      />,
    );
    it('should display correct header', () => {
      const header = wrapper.find('.header');
      expect(header.text()).toEqual(`${mockPlayerOne.name} Turn`);
    });

    it('should have AttackBoard', () => {
      const attackBoard = wrapper.find('AttackBoard');
      const { board, receiveAttack } = attackBoard.props();
      expect(board).toBe(mockPlayerTwo.board);
      expect(receiveAttack()).toEqual(mockAttackPlayerTwo());
    });
    it('should have OwnBoard', () => {
      const ownBoard = wrapper.find('OwnBoard');
      expect(ownBoard.props().board).toEqual(mockPlayerOne.board);
    });
  });
  describe('player two turn', () => {
    const mockPlayerOne = {
      name: 'Player One',
      board: [
        null,
        { ship: 'battleship' },
        { ship: 'cruiser' },
        { ship: 'destroyer' },
        null,
      ],
      ships: [],
      turn: false,
    };
    const mockPlayerTwo = {
      name: 'Player Two',
      board: [
        { ship: 'battleship' },
        null,
        { ship: 'cruiser' },
        { ship: 'destroyer' },
        null,
      ],
      ships: [],
      turn: true,
    };
    const wrapper = shallow(
      <AttackView
        gameStart={true}
        placedShips={true}
        nextTurn={false}
        postAttack={false}
        playerOne={mockPlayerOne}
        playerTwo={mockPlayerTwo}
        attackPlayerOne={mockAttackPlayerOne}
        attackPlayerTwo={mockAttackPlayerTwo}
      />,
    );
    it('should display correct header', () => {
      const header = wrapper.find('.header');
      expect(header.text()).toEqual(`${mockPlayerTwo.name} Turn`);
    });

    it('should have AttackBoard', () => {
      const attackBoard = wrapper.find('AttackBoard');
      const { board, receiveAttack } = attackBoard.props();
      expect(board).toBe(mockPlayerOne.board);
      expect(receiveAttack()).toEqual(mockAttackPlayerOne());
    });
    it('should have OwnBoard', () => {
      const ownBoard = wrapper.find('OwnBoard');
      expect(ownBoard.props().board).toEqual(mockPlayerTwo.board);
    });
  });
});
