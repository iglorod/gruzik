import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Row, Col, Space } from 'antd';

import BandInfo from './BandInfo/BandInfo';
import AddSong from './AddSong/CreateSong';
import { fetchBandDataActionCreator, clearBandDataActionCreator } from '../../store/band/actions';

const Band = (props) => {
  const { fetchBandData, clearBandData } = props;

  useEffect(() => {
    const localId = 'j3Jn3VZYnhbuz4cDiTKJHXq7Z4j1';

    fetchBandData(localId);

    return () => {
      clearBandData();
    }
  }, [fetchBandData, clearBandData])

  return (
    <Row>
      <Col xs={{ span: 24 }} md={{ offset: 3, span: 18 }} lg={{ offset: 6, span: 12 }} >
        <Space direction="vertical">
          <BandInfo />
          <AddSong />
        </Space>
      </Col>
    </Row>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBandData: (localId) => { dispatch(fetchBandDataActionCreator(localId)) },
    clearBandData: () => { dispatch(clearBandDataActionCreator()) },
  }
}

export default connect(null, mapDispatchToProps)(Band);
