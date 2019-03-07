import React from 'react';
import { mount } from 'enzyme';

import { ResponsiveLayer } from '../ResponsiveLayer';

const MOCKED_DIMENSION = {
  width: 300,
  height: 200,
};

jest.mock('../../hooks/useContainerDimension', () => {
  return {
    useContainerDimension: () => MOCKED_DIMENSION,
  };
});

describe('<ResponsiveLayer>', () => {
  it('get dimension info and pass to children', () => {
    const TestComponent = () => {
      return (
        <div className="wrapper">
          <ResponsiveLayer>
            {({ width, height }) => (
              <>
                <div id="width">{width}</div>
                <div id="height">{height}</div>
              </>
            )}
          </ResponsiveLayer>
        </div>
      );
    };

    const wrapper = mount(<TestComponent />);
    expect(wrapper.find('#width').text()).toBe(String(MOCKED_DIMENSION.width));
    expect(wrapper.find('#height').text()).toBe(String(MOCKED_DIMENSION.height));
  });
});
