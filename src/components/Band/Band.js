import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Row, Col, Space } from 'antd';

import BandInfo from '../BandInfo/BandInfo';
import AddSong from '../AddSong/CreateSong';
import CurrentSong from '../CurrentSong/CurrentSong';
import Songs from '../Songs/Songs';
import { fetchBandDataActionCreator, clearBandDataActionCreator } from '../../store/band/actions';
import { fetchBandSongsActionCreator, clearSongListActionCreator } from '../../store/songs/actions';

const Band = (props) => {
  const { fetchBandSongs, fetchBandData, clearSongsList, clearBandData } = props;

  useEffect(() => {
    clearSongsList();

    const bandId = props.location.state.localId;
    fetchBandData(bandId);
    fetchBandSongs(bandId)

    return () => {
      clearSongsList();
      clearBandData();
    }
  }, [fetchBandData, fetchBandSongs, clearSongsList, clearBandData, props.location])

  return (
    <Row>
      <Col xs={{ span: 24 }} sm={{ span: 10 }} md={{ span: 6 }} lg={{ span: 6, offset: 2 }} >
        <CurrentSong />
      </Col>
      <Col xs={{ span: 24 }} sm={{ span: 12, offset: 2 }} md={{ span: 16, offset: 2 }} lg={{ span: 14, offset: 2 }} >
        <Space direction='vertical' style={{ width: '100%' }}>
          <BandInfo />
          <AddSong />
          <Songs />
        </Space>
      </Col>
    </Row>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBandData: (localId) => { dispatch(fetchBandDataActionCreator(localId)) },
    fetchBandSongs: (localId) => { dispatch(fetchBandSongsActionCreator(localId)) },
    clearSongsList: () => { dispatch(clearSongListActionCreator()) },
    clearBandData: () => { dispatch(clearBandDataActionCreator()) },
  }
}

export default connect(null, mapDispatchToProps)(Band);
