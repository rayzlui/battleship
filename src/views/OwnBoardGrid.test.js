import React from 'react';
import { shallow } from 'enzyme';
import { OwnBoardGrid } from './OwnBoardGrid';

describe('OwnBoardGrid', () => {
  const mockShip = {
    name: 'battleship',
    length: 4,
    shiphits: 0,
    sunk: false,
    image: 'battleship_image',
  };

  describe('grid hit, with ship', () => {
    it('should render correctly', () => {
      const mockGrid = { ship: mockShip, hit: true };
      const wrapper = shallow(<OwnBoardGrid grid={mockGrid} />);
      const props = wrapper.props();
      expect(props.className).toEqual('grid red');
      const img = wrapper.find('img');
      expect(img).toHaveLength(0);
    });
  });
  describe('grid not hit, with ship', () => {
    it('should render correctly', () => {
      const mockGrid = { ship: mockShip, hit: false };
      const wrapper = shallow(<OwnBoardGrid grid={mockGrid} />);
      const props = wrapper.props();
      expect(props.className).toEqual('grid grey');
      const img = wrapper.find('img');
      expect(img).toHaveLength(1);
      const imgProps = img.props();
      expect(imgProps.src).toEqual(mockShip.image);
      expect(imgProps.alt).toEqual(mockShip.name);
    });
  });

  describe('grid hit, no ship', () => {
    it('should render correctly', () => {
      const mockGrid = { ship: null, hit: true };
      const wrapper = shallow(<OwnBoardGrid grid={mockGrid} />);
      const props = wrapper.props();
      expect(props.className).toEqual('grid white');
      const img = wrapper.find('img');
      expect(img).toHaveLength(0);
    });
  });

  describe('grid not hit, no ship', () => {
    it('should render correctly', () => {
      const mockGrid = { ship: null, hit: false };
      const wrapper = shallow(<OwnBoardGrid grid={mockGrid} />);
      const props = wrapper.props();
      expect(props.className).toEqual('grid blue');
      const img = wrapper.find('img');
      expect(img).toHaveLength(0);
    });
  });
});
