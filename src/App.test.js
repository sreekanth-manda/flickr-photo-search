import React from 'react';
import { mount } from 'enzyme';
import App from './App';
import flickrServices from './Services/FlickrService';

const photos = {
  body: {
    photos: {
      photo: [
        { id: 'blah1' },
        { id: 'blah2' }
      ]
    }
  }
};

describe('App', () => {
  it('renders without crashing', () => {
    const wrapper = mount(<App />);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render SearchField component', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find('SearchField').length).toBe(1);
  });

  it('should set state with the input search text value ', () => {
    const wrapper = mount(<App />);
    wrapper.find('.search-input').simulate('change', { target: { value: 'Hello' } });
    expect(wrapper.state().searchText).toBe('Hello');
  });

  it('should set state with the images list from the flickr service ', async () => {
    const wrapper = mount(<App />);
    flickrServices.searchFlickrImages = jest.fn().mockResolvedValue(photos);
    await wrapper.find('.search-input').simulate('change', { target: { value: 'Hello' } });
    expect(wrapper.state().imageList).toMatchObject([...photos.body.photos.photo]);
  });
});
