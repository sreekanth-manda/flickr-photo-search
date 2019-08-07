import React from 'react';
import { shallow } from 'enzyme';
import Image from './Image';

describe('Image', () => {
  const componentProps = {
    image: {
      farm: 66,
      id: "48458406181",
      isfamily: 0,
      isfriend: 0,
      ispublic: 1,
      owner: "46922592@N00",
      secret: "23a99e54c0",
      server: "65535",
      title: "blah title 1"
    }
  }

  test('should render Image component', () => {
    const wrapper = shallow(<Image {...componentProps} />);
    expect(wrapper.html()).toMatchSnapshot();
  });
});