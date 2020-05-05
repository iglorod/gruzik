import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Row, Col, Space } from 'antd';

import PlaylistHeat from './PlaylistHeat/PlaylistHeat';
import Songs from '../Songs/Songs';
import { clearSongListActionCreator, fetchPlaylistRecordsActionCreator } from '../../store/songs/actions';

const Music = (props) => {
  const { key: playlistKey } = props.location.state;
  const { playlists, clearSongsList, fetchPlaylistSongs } = props;

  useEffect(() => {
    fetchPlaylistSongs(playlistKey);

    return () => {
      clearSongsList();
    }
  }, [playlistKey, fetchPlaylistSongs, clearSongsList])

  const playlist = playlists.find(item => item.key === playlistKey);

  return (
    <Row>
      <Col xs={{ span: 24 }} md={{ offset: 3, span: 18 }} lg={{ offset: 6, span: 12 }} >
        <Space direction='vertical' style={{ width: '100%' }}>
          <PlaylistHeat playlist={playlist} />
          <Songs uxAtCenter />
        </Space>
      </Col>
    </Row>
  )
}

const mapStateToProps = (state) => {
  return {
    playlists: state.songs.playlists,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearSongsList: () => { dispatch(clearSongListActionCreator()) },
    fetchPlaylistSongs: (key) => { dispatch(fetchPlaylistRecordsActionCreator(key)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Music);
