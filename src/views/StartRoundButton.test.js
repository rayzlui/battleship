import React from 'react';
import { shallow } from 'enzyme';
import { StartRoundButton } from './StartRoundButton';

describe('StartRoundButton', () => {
  it('should render null', () => {
    const wrapper = shallow(<StartRoundButton nextTurn={false} />);
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('should render correctly', () => {
    const mockBeginAttack = jest.fn();
    const mockPlayerOne = { turn: true, name: 'One' };
    const mockPlayerTwo = { turn: false, name: 'Two' };
    const wrapper = shallow(
      <StartRoundButton
        nextTurn={true}
        playerOne={mockPlayerOne}
        playerTwo={mockPlayerTwo}
        beginAttack={mockBeginAttack}
      />,
    );
    const button = wrapper.find('button');
    expect(button.text()).toEqual(
      `Click to Start ${mockPlayerOne.name}'s Turn`,
    );
    button.simulate('click');
    expect(mockBeginAttack).toHaveBeenCalled();
  });

  it('should render correctly', () => {
    const mockBeginAttack = jest.fn();
    const mockPlayerOne = { turn: false, name: 'One' };
    const mockPlayerTwo = { turn: true, name: 'Two' };
    const wrapper = shallow(
      <StartRoundButton
        nextTurn={true}
        playerOne={mockPlayerOne}
        playerTwo={mockPlayerTwo}
        beginAttack={mockBeginAttack}
      />,
    );
    const button = wrapper.find('button');
    expect(button.text()).toEqual(
      `Click to Start ${mockPlayerTwo.name}'s Turn`,
    );
    button.simulate('click');
    expect(mockBeginAttack).toHaveBeenCalled();
  });
});
