import React from 'react';
import { shallow } from 'enzyme';
import { AttackBoardGrid } from './AttackBoardGrid';

describe('AttackBoardGrid', () => {
  const mockShip = {
    name: 'battleship',
    length: 4,
    shiphits: 0,
    sunk: false,
    image: 'battleship_image',
  };
  const mockReceiveAttack = jest.fn(x => {
    return 'meow';
  });

  describe('grid hit, with ship', () => {
    it('should render correctly', () => {
      const mockGrid = { ship: mockShip, hit: true };
      const wrapper = shallow(
        <AttackBoardGrid grid={mockGrid} receiveAttack={mockReceiveAttack} />,
      );
      const props = wrapper.props();
      expect(props.className).toEqual('grid red');
      expect(props.onClick()).not.toEqual(mockReceiveAttack());
    });
  });

  describe('grid hit, no ship', () => {
    it('should render correctly', () => {
      const mockGrid = { ship: null, hit: true };
      const wrapper = shallow(
        <AttackBoardGrid grid={mockGrid} receiveAttack={mockReceiveAttack} />,
      );
      const props = wrapper.props();
      expect(props.className).toEqual('grid green');
      expect(props.onClick()).not.toEqual(mockReceiveAttack());
    });
  });

  describe('grid not hit', () => {
    it('should render correctly', () => {
      const mockGrid = { ship: mockShip, hit: false };
      const wrapper = shallow(
        <AttackBoardGrid grid={mockGrid} receiveAttack={mockReceiveAttack} />,
      );
      const props = wrapper.props();
      expect(props.className).toEqual('grid blue');
      expect(props.onClick()).toEqual(mockReceiveAttack());
    });
  });
});
