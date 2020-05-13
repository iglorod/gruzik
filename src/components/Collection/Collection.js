import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Row, Col } from 'antd';

import {
  fetchSongsByTagActionCreator,
  clearSongListActionCreator,
  startSongsLoadingActionCreator,
} from '../../store/songs/actions';
import Songs from '../Songs/Songs';

const Filter = (props) => {
  const { getSongsByTag, startLoading, clearSongsList } = props;

  useEffect(() => {
    const tag = props.location.state.tag;

    clearSongsList();
    startLoading();
    setTimeout(() => getSongsByTag(tag), 1000);
  }, [getSongsByTag, startLoading, clearSongsList])

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
    startLoading: () => { dispatch(startSongsLoadingActionCreator()) },
    getSongsByTag: (tag) => { dispatch(fetchSongsByTagActionCreator(tag)) },
    clearSongsList: () => { dispatch(clearSongListActionCreator()) },
  }
}

export default connect(null, mapDispatchToProps)(Filter);
