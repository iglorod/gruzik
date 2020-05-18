import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Row, Col } from 'antd';

import Comments from '../Comments/Comments';
import CurrentSong from '../CurrentSong/CurrentSong';
import Songs from '../Songs/Songs';
import {
  fetchSongsByTagActionCreator,
  clearSongListActionCreator,
  startSongsLoadingActionCreator,
  startPlayRecivedSongActionCreator,
} from '../../store/songs/actions';

const Filter = (props) => {
  const { getSongsByTag, startLoading, clearSongsList } = props;

  useEffect(() => {
    const tag = props.location.state.tag;

    startLoading();
    setTimeout(() => getSongsByTag(tag), 1000);
    
    return () => {
      clearSongsList();
    }
  }, [getSongsByTag, startLoading, clearSongsList, props.location.state])

  useEffect(() => {
    if (!props.playSong && props.songs.length > 0) {
      props.startPlay(props.songs[0]);
    }
  }, [props.playSong, props.songs])

  return (
    <Row>
      <Col xs={{ span: 24 }} sm={{ span: 10 }} md={{ span: 6 }} lg={{ span: 6, offset: 2 }} >
        <CurrentSong />
        <Comments />
      </Col>
      <Col xs={{ span: 24 }} sm={{ span: 12, offset: 2 }} md={{ span: 16, offset: 2 }} lg={{ span: 14, offset: 2 }} >
        <Songs />
      </Col>
    </Row>
  )
}

const mapStateToProps = (state) => {
  return {
    songs: state.songs.songs,
    playSong: state.songs.playSong,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startLoading: () => { dispatch(startSongsLoadingActionCreator()) },
    startPlay: (song) => { dispatch(startPlayRecivedSongActionCreator(song)) },
    getSongsByTag: (tag) => { dispatch(fetchSongsByTagActionCreator(tag)) },
    clearSongsList: () => { dispatch(clearSongListActionCreator()) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
