import React from 'react';
import { mount } from 'enzyme';
import ImageList from './ImageList';

describe('ImageList', () => {
  const compoentProps = {
    images: [
      {
        farm: 66,
        id: "48458406181",
        isfamily: 0,
        isfriend: 0,
        ispublic: 1,
        owner: "46922592@N00",
        secret: "23a99e54c0",
        server: "65535",
        title: "blah title 1",
      },
      {
        farm: 68,
        id: "232323123",
        isfamily: 0,
        isfriend: 0,
        ispublic: 1,
        owner: "46922592@N00",
        secret: "23a99e54c0",
        server: "65535",
        title: "blah title 2",
      }
    ]
  }

  test('should render ImageList component', () => {
    const wrapper = mount(<ImageList {...compoentProps} />);
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should render 2 Image component', () => {
    const wrapper = mount(<ImageList {...compoentProps} />);
    expect(wrapper.find('Image').length).toBe(2);
  });
});