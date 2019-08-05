import React from 'react';
import { shallow } from 'enzyme';
import Image from './Image';

const mockFlickrGetPhotoInfo = jest.fn();

describe('Image', () => {
  const compoentProps = {
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
    const wrapper = shallow(<Image {...compoentProps} />);
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should call flickrGetPhotoInfo', () => {
    const wrapper = shallow(<Image  {...compoentProps} />);
    wrapper.instance().flickrGetPhotoInfo = mockFlickrGetPhotoInfo;
    wrapper.setProps({ image: { id: '234234' } });
    expect(mockFlickrGetPhotoInfo.mock.calls.length).toBe(1);
  });
});