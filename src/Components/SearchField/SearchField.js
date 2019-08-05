import React from 'react';
import './SearchField.scss';

const SearchField = ({ searchText, onSearchInputChange }) => (
  <input
    type="text"
    className="search-input"
    value={searchText}
    onChange={onSearchInputChange}
    placeholder="Search images here"
  />
);

export default SearchField;