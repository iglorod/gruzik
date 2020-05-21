import React, { useState, useEffect, useRef } from 'react';
import { debounce } from 'lodash';

import { message, Radio } from 'antd';

import SearchInput from './SearchInput/SearchInput';
import InfoResults from './InfoResults/InfoResults';
import { getTagsWithCountByWord, getBandsByWord, getBandTags, getTagInfo } from '../../../utility/admin';
import classes from './InfoPanel.module.css';

const InfoPanel = () => {
  const [searchWord, setSearchWord] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showTagsInfo, setShowTagsInfo] = useState(true);
  const [infoBySearchWord, setInfoBySearchWord] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (searchWord.length < 2) return;

    if (showTagsInfo) debounceTagsSearch.current(searchWord);
    else debounceBandsSearch.current(searchWord);

    setInfoBySearchWord([]);
  }, [showTagsInfo])

  const debounceTagsSearch = useRef(debounce((word) => {
    getTagsWithCountByWord(word)
      .then(response => Array.from(Object.entries(response)))
      .then(tags => tags.map(([tag, count]) => (
        {
          label: `#${tag}: ${count} ${count > 1 ? 'songs' : 'song'}`,
          value: tag,
        }
      )))
      .then(tags => setSearchResults(tags))
      .catch(error => message.error(error.message))
  }, 800));

  const debounceBandsSearch = useRef(debounce((word) => {
    getBandsByWord(word)
      .then(bands => bands.map(band => ({ value: band.localId, label: band.bandName })))
      .then(bands => setSearchResults(bands))
      .catch(error => message.error(error.message))
  }, 800));

  const onSearchWordChangeHandler = (word) => {
    if (word.length < 2) {
      setSearchResults([]);
      setSearchWord(word);
      return;
    }

    if (showTagsInfo) debounceTagsSearch.current(word);
    else debounceBandsSearch.current(word);

    setSearchWord(word);
  }

  const onOptionSelected = (word, selectedItem) => {
    setFetching(true);

    if (showTagsInfo) {
      setSearchWord(selectedItem.value);
      
      getTagInfo(word)
        .then(bands => Object.entries(bands))
        .then(bands => setInfoBySearchWord(bands))
        .then(() => setFetching(false))
        .catch(error => message.error(error.message))
    } else {
      setSearchWord(selectedItem.label);

      getBandTags(word)
        .then(tags => Object.entries(tags))
        .then(tags => setInfoBySearchWord(tags))
        .then(() => setFetching(false))
        .catch(error => message.error(error.message))
    }
  }

  const onModeChange = (event) => {
    setShowTagsInfo(event.target.value)
  }

  return (
    <div className={classes.infoPanel}>
      <SearchInput
        value={searchWord}
        options={searchResults}
        onSelect={onOptionSelected}
        onChange={onSearchWordChangeHandler} />
      <Radio.Group onChange={onModeChange} value={showTagsInfo}>
        <Radio value={true}>Tags</Radio>
        <Radio value={false}>Bands</Radio>
      </Radio.Group>
      <InfoResults 
      label={showTagsInfo ? 'Bands' : 'Tags'} 
      data={infoBySearchWord}
      loading={fetching} />
    </div>
  )
}

export default InfoPanel;
