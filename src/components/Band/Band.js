import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Row, Col, Space } from 'antd';

import BandInfo from '../BandInfo/BandInfo';
import AddSong from '../AddSong/CreateSong';
import Songs from '../Songs/Songs';
import { fetchBandDataActionCreator, clearBandDataActionCreator } from '../../store/band/actions';
import { fetchBandSongsActionCreator, clearSongListActionCreator } from '../../store/songs/actions';

const Band = (props) => {
  const { fetchBandSongs, fetchBandData, clearSongsList, clearBandData } = props;

  useEffect(() => {
    const bandId = 'j3Jn3VZYnhbuz4cDiTKJHXq7Z4j1';

    fetchBandData(bandId);
    fetchBandSongs(bandId)

    return () => {
      clearSongsList();
      clearBandData();
    }
  }, [fetchBandData, fetchBandSongs, clearSongsList, clearBandData])

  return (
    <Row>
      <Col xs={{ span: 24 }} md={{ offset: 3, span: 18 }} lg={{ offset: 6, span: 12 }} >
        <Space direction="vertical">
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
