import React from 'react';
import { shallow } from 'enzyme';
import Link from './Link';

describe('Link', () => {
  const componentProps = {
    hrefText: 'blah href text',
    linkText: 'blah link text'
  }
  test('should render the Link component', () => {
    const wrapper = shallow(<Link { ...componentProps } />);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
