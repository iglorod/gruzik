import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { AutoComplete, message } from 'antd';

import { startPlayRecivedSongActionCreator } from '../../store/songs/actions';
import { fetchSongs } from '../../utility/song-queries';
import ItemResult from './ItemResult/ItemResult';
import './SearchBar.css';

const SearchBar = (props) => {
  const [searchWord, setSearchWord] = useState('');
  const [timerId, setTimerId] = useState(null);
  const [recivedSongs, setRecivedSongs] = useState([]);

  useEffect(() => {
    if (searchWord.length < 3) return;

    clearTimeout(timerId);

    const timer = setTimeout(() => {
      fetchSongs(searchWord)
        .then(songs => handleResultRecive(songs))
        .catch(error => message.error(error.message))
    }, 800)

    setTimerId(timer);
  }, [searchWord])

  const handleResultRecive = (songs) => {
    setRecivedSongs(songs);
  }

  const handleChange = (event) => {
    const word = event.target.value;
    setSearchWord(word);
  }


  const renderTitle = title => (
    <span>{title}</span>
  );

  const renderItem = (song) => ({
    value: song.name,
    label: <ItemResult song={song} startPlay={props.startPlay} />,
  });

  return (
    <div className={'search_bar-container'}>
      <AutoComplete
        value={searchWord}
        placeholder="Type to search songs here..."
        onInput={handleChange}
        options={
          recivedSongs.map((song, index) => {
            let bandName = song.bandName;
            if (index > 0 && recivedSongs[index - 1].bandName === song.bandName) {
              bandName = null;
            }

            if (bandName) {
              return {
                label: renderTitle(bandName),
                options: [renderItem(song)],
              }
            } else {
              return renderItem(song);
            }
          })
        }
      />
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    startPlay: (song) => { dispatch(startPlayRecivedSongActionCreator(song)) },
  }
}

export default connect(null, mapDispatchToProps)(SearchBar);
