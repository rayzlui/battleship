import React from 'react';
import { shallow } from 'enzyme';
import { GameOverHeader } from './GameOverHeader';

describe('GameOverHeader', () => {
  it('should render correctly', () => {
    const mockName = 'Player 1';
    const wrapper = shallow(<GameOverHeader name={mockName} />);
    const header = wrapper.find('h1');
    expect(header.text()).toEqual(`Game Over! ${mockName} Wins!`);
  });
});
