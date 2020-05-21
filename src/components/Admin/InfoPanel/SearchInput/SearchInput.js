import React from 'react';

import { AutoComplete } from 'antd';

import classes from './SearchInput.module.css';

const SearchInput = (props) => {
  return (
    <AutoComplete
      className={classes.searchInput}
      value={props.value}
      options={props.options}
      onSelect={props.onSelect}
      onChange={props.onChange}
      placeholder='Type to search here'
    />
  )
}

export default SearchInput;
