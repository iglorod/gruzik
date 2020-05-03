import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Row, Col } from 'antd';

import Songs from '../Songs/Songs';
import { clearSongListActionCreator } from '../../store/songs/actions';

const Music = (props) => {
  const { clearSongsList } = props

  useEffect(() => {
    return () => {
      clearSongsList();
    }
  }, [clearSongsList])

  return (
    <Row>
      <Col xs={{ span: 24 }} md={{ offset: 3, span: 18 }} lg={{ offset: 6, span: 12 }} >
        <Songs />
      </Col>
    </Row>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearSongsList: () => { dispatch(clearSongListActionCreator()) },
  }
}

export default connect(null, mapDispatchToProps)(Music);
