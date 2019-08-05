import React from 'react';
import { shallow } from 'enzyme';
import SearchField from './SearchField';

const onSearchInputChange = jest.fn();

describe('SearchField', () => {
  const compoentProps = {
    searchText: 'blah',
    onSearchInputChange
  }

  test('should render SerachField component', () => {
    const wrapper = shallow(<SearchField {...compoentProps} />);
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should call onSearchInputChange when some text is typed into the search box', () => {
    const wrapper = shallow(<SearchField {...compoentProps} />);
    wrapper.find('input').simulate('change', { target: { value: 'Hello' } })
    expect(onSearchInputChange.mock.calls.length).toBe(1);
  })

  test('should have a place holder text on search box', () => {
    const wrapper = shallow(<SearchField {...compoentProps} />);
    expect(wrapper.find('input').prop('placeholder')).toBe('Search images here');
  })
});