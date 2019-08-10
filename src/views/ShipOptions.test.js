import React from 'react';
import { shallow } from 'enzyme';
import { ShipOptionsDisplay } from './ShipOptions';
import { SHIP_OPTIONS, IMAGE_URLS } from '../helperFunctions/shipSetup';

describe('ShipOptionsDisplay', () => {
  it('should return array', () => {
    const mockPlayer = { ships: [] };
    const mockChangeShip = jest.fn();
    const wrapper = shallow(
      <ShipOptionsDisplay player={mockPlayer} changeShip={mockChangeShip} />,
    );
    const imgs = wrapper.find('img');
    expect(imgs).toHaveLength(5);
    imgs.forEach((img, index) => {
      const ship = img.props().className;
      expect(ship).toEqual(SHIP_OPTIONS[index]);
      expect(img.props().src).toEqual(IMAGE_URLS[ship]);
      img.simulate('click');
      expect(mockChangeShip).toHaveBeenCalled();
    });
  });

  it('should return array', () => {
    const mockPlayer = { ships: [{ name: 'battleship' }] };
    const mockChangeShip = jest.fn();
    const wrapper = shallow(
      <ShipOptionsDisplay player={mockPlayer} changeShip={mockChangeShip} />,
    );
    const imgs = wrapper.find('img');
    expect(imgs).toHaveLength(4);
    let copyShipOptions = SHIP_OPTIONS.slice();
    copyShipOptions.splice(SHIP_OPTIONS.indexOf('battleship'), 1);
    imgs.forEach((img, index) => {
      const ship = img.props().className;
      expect(ship).toEqual(copyShipOptions[index]);
      expect(img.props().src).toEqual(IMAGE_URLS[ship]);
      img.simulate('click');
      expect(mockChangeShip).toHaveBeenCalled();
    });
  });

  it('should return array', () => {
    const mockPlayer = {
      ships: [
        { name: 'cruiser' },
        { name: 'destroyer' },
        { name: 'submarine' },
        { name: 'battleship' },
        { name: 'carrier' },
      ],
    };
    const mockChangeShip = jest.fn();
    const wrapper = shallow(
      <ShipOptionsDisplay player={mockPlayer} changeShip={mockChangeShip} />,
    );
    const imgs = wrapper.find('img');
    expect(imgs).toHaveLength(0);
  });
});
