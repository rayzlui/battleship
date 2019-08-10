import React from 'react';
import { shallow } from 'enzyme';
import { OwnBoard } from './OwnBoard';

describe('OwnBoard', () => {
  describe('should render correctly', () => {
    const mockBoard = new Array(81);
    const wrapper = shallow(<OwnBoard board={mockBoard} />);
    it('should have same number grids as array', () => {
      const grids = wrapper.find('OwnBoardGrid');
      expect(grids).toHaveLength(mockBoard.length);
      grids.forEach((gridComp, index) => {
        const { grid } = gridComp.props();
        expect(grid).toEqual(mockBoard[index]);
      });
    });
    describe('should have 9 rows', () => {
      const rows = wrapper.find('li');
      expect(rows).toHaveLength(9);

      it('should have 9 elements in each row', () => {
        rows.forEach(row => {
          const elements = row.find('OwnBoardGrid');
          expect(elements).toHaveLength(9);
        });
      });
    });
    it('should have header', () => {
      const header = wrapper.find('h3')
      expect(header.text()).toEqual('Your Board')
    })
  });
});
