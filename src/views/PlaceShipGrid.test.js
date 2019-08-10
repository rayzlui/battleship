import React from 'react';
import { shallow } from 'enzyme';
import { PlaceShipGrid } from './PlaceShipGrid';

describe('PlaceShipGrid', () => {
  const mockShip = {
    name: 'battleship',
    length: 4,
    shiphits: 0,
    sunk: false,
    image: 'battleship_image',
  };
  const mockselectGridForShip = jest.fn(() => {
    return 'meow';
  });

  describe('with ship', () => {
    it('should render correctly', () => {
      const mockGrid = { ship: mockShip, hit: false };
      const wrapper = shallow(
        <PlaceShipGrid
          grid={mockGrid}
          selectGridForShip={mockselectGridForShip}
        />,
      );
      const props = wrapper.props();
      expect(props.className).toEqual('grid grey');
      expect(props.onClick).toEqual(undefined);
      const img = wrapper.find('img');
      expect(img).toHaveLength(1);
      const imgProps = img.props();
      expect(imgProps.src).toEqual(mockShip.image);
      expect(imgProps.alt).toEqual(mockShip.name);
    });
  });

  describe('no ship', () => {
    it('should render correctly', () => {
      const mockGrid = { ship: null, hit: false };
      const wrapper = shallow(
        <PlaceShipGrid
          grid={mockGrid}
          selectGridForShip={mockselectGridForShip}
        />,
      );
      const props = wrapper.props();
      expect(props.className).toEqual('grid blue');
      expect(props.onClick()).toEqual(mockselectGridForShip());
      const img = wrapper.find('img');
      expect(img).toHaveLength(0);
    });
  });
});
