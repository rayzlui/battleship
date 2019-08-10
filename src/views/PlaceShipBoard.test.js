import React from 'react';
import { shallow } from 'enzyme';
import { PlaceShipBoard } from './PlaceShipBoard';

describe('PlaceShipBoard', () => {
  describe('should render correctly', () => {
    const mockBoard = new Array(81);
    const mockselectGridForShip = jest.fn();
    const wrapper = shallow(
      <PlaceShipBoard
        board={mockBoard}
        selectGridForShip={mockselectGridForShip}
      />,
    );
    it('should have same number grids as array', () => {
      const grids = wrapper.find('PlaceShipGrid');
      expect(grids).toHaveLength(mockBoard.length);
      grids.forEach((gridComp, index) => {
        const { grid, selectGridForShip } = gridComp.props();
        expect(grid).toEqual(mockBoard[index]);
        expect(selectGridForShip()).toEqual(mockselectGridForShip());
      });
    });
    describe('should have 9 rows', () => {
      const rows = wrapper.find('li');
      expect(rows).toHaveLength(9);

      it('should have 9 elements in each row', () => {
        rows.forEach(row => {
          const elements = row.find('PlaceShipGrid');
          expect(elements).toHaveLength(9);
        });
      });
    });
  });
});
