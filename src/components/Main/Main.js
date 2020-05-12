import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Row, Col } from 'antd';

import Suggestion from '../Suggestion/Suggestion';
import { getRecentTagsFromLocalStorage, getPopularTagsFromLocalStorage } from '../../utility/suggest-collection';
import { clearSongListActionCreator } from '../../store/songs/actions';

const Music = (props) => {
  const { clearSongsList } = props;

  useEffect(() => {
    const popular = getPopularTagsFromLocalStorage(props.localId);
    const recent = getRecentTagsFromLocalStorage(props.localId);

    return () => {
      clearSongsList();
    }
  }, [clearSongsList])

  return (
    <>
      <div>#tags</div>
      {/*<Row>
        <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }} >
          <Suggestion />
        </Col>
      </Row>*/}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    localId: state.auth.localId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearSongsList: () => { dispatch(clearSongListActionCreator()) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Music);
