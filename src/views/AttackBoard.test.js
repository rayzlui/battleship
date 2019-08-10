import React from 'react';
import { shallow } from 'enzyme';
import { AttackBoard } from './AttackBoard';

describe('AttackBoard', () => {
  describe('should render correctly', () => {
    const mockBoard = new Array(81);
    const mockReceiveAttack = jest.fn();
    const wrapper = shallow(
      <AttackBoard board={mockBoard} receiveAttack={mockReceiveAttack} />,
    );
    it('should have same number grids as array', () => {
      const grids = wrapper.find('AttackBoardGrid');
      expect(grids).toHaveLength(mockBoard.length);
      grids.forEach((gridComp, index) => {
        const { grid, receiveAttack } = gridComp.props();
        expect(grid).toEqual(mockBoard[index]);
        expect(receiveAttack()).toEqual(mockReceiveAttack());
      });
    });
    describe('should have 9 rows', () => {
      const rows = wrapper.find('li');
      expect(rows).toHaveLength(9);

      it('should have 9 elements in each row', () => {
        rows.forEach(row => {
          const elements = row.find('AttackBoardGrid');
          expect(elements).toHaveLength(9);
        });
      });
    });
    it('should have header', () => {
      const header = wrapper.find('h3')
      expect(header.text()).toEqual('Attack Board')
    })
  });
});
