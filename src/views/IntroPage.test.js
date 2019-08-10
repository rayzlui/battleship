import React from 'react';
import { shallow } from 'enzyme';
import { IntroPage } from './IntroPage';

describe('IntroPage', () => {
  const mockStartOnePlayer = jest.fn(() => {
    return 'Hi I start one player';
  });
  const mockStartTwoPlayer = jest.fn(() => {
    return 'Hi I start two player';
  });

  it('should render null', () => {
    const wrapper = shallow(<IntroPage gameStart={true} />);
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('should render correctly', () => {
    const wrapper = shallow(
      <IntroPage
        startOnePlayer={mockStartOnePlayer}
        startTwoPlayer={mockStartTwoPlayer}
        gameStart={false}
      />,
    );
    const startOne = wrapper.find('.oneplayerstart');
    expect(startOne.props().onClick()).toEqual(mockStartOnePlayer());
    expect(startOne.text()).toEqual('One Player');
    const startTwo = wrapper.find('.twoplayerstart');
    expect(startTwo.props().onClick()).toEqual(mockStartTwoPlayer());
    expect(startTwo.text()).toEqual('Two Player');
  });
});
