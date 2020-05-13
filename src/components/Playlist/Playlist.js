import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Row, Col, Space } from 'antd';

import PlaylistHeat from './PlaylistHeat/PlaylistHeat';
import CurrentSong from '../CurrentSong/CurrentSong';
import Songs from '../Songs/Songs';
import { clearSongListActionCreator, fetchPlaylistRecordsActionCreator } from '../../store/songs/actions';

const Music = (props) => {
  const { key: playlistKey } = props.location.state;
  const { playlists, clearSongsList, fetchPlaylistSongs } = props;

  useEffect(() => {
    clearSongsList();
    fetchPlaylistSongs(playlistKey);

    return () => {
      clearSongsList();
    }
  }, [playlistKey, fetchPlaylistSongs, clearSongsList]);

  if (!props.localId) {
    return <Redirect to={'/'} />;
  }

  const playlist = playlists.find(item => item.key === playlistKey);

  return (
    <Row>
      <Col xs={{ span: 24 }} sm={{ span: 10 }} md={{ span: 6 }} lg={{ span: 6, offset: 2 }} >
        <CurrentSong />
      </Col>
      <Col xs={{ span: 24 }} sm={{ span: 12, offset: 2 }} md={{ span: 16, offset: 2 }} lg={{ span: 14, offset: 2 }} >
        <Space direction='vertical' style={{ width: '100%' }}>
          <PlaylistHeat playlist={playlist} />
          <Songs />
        </Space>
      </Col>
    </Row>
  )
}

const mapStateToProps = (state) => {
  return {
    playlists: state.songs.playlists,
    localId: state.auth.localId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearSongsList: () => { dispatch(clearSongListActionCreator()) },
    fetchPlaylistSongs: (key) => { dispatch(fetchPlaylistRecordsActionCreator(key)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Music);
