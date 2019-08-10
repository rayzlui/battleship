import React from 'react';
import { shallow } from 'enzyme';
import { TogglePlacement } from './TogglePlacementButton';

describe('TogglePlacement', () => {
  const mockFlip = jest.fn();
  it('should render', () => {
    const wrapper = shallow(
      <TogglePlacement isVertical={false} flipDirection={mockFlip} />,
    );
    expect(wrapper.text()).toEqual('Verticalize Placement');
    wrapper.simulate('click');
    expect(mockFlip).toHaveBeenCalled();
  });
  it('should render', () => {
    const wrapper = shallow(
      <TogglePlacement isVertical={true} flipDirection={mockFlip} />,
    );
    expect(wrapper.text()).toEqual('Horizontalize Placement');
    wrapper.simulate('click');
    expect(mockFlip).toHaveBeenCalledTimes(2);
  });
});
