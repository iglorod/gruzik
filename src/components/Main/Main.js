import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { message } from 'antd';

import Suggestions from '../Suggestions/Suggestions';
import {
  getRecentTagsFromLocalStorage,
  getOftenTagsFromLocalStorage,
  fetchAdminCollections,
} from '../../utility/suggest-collection';
import { clearSongListActionCreator } from '../../store/songs/actions';
const Music = (props) => {
  const { clearSongsList } = props;

  const [oftenSuggestion, setOthenSuggestion] = useState(null);
  const [recentSuggestion, setRecentSuggestion] = useState(null);
  const [adminSuggestions, setAdminSuggestions] = useState([]);

  useEffect(() => {
    if (!props.localId) return;

    setOthenSuggestion(getOftenTagsFromLocalStorage(props.localId));
    setRecentSuggestion(getRecentTagsFromLocalStorage(props.localId));

    fetchAdminCollections()
      .then(collections => setAdminSuggestions(collections))
      .catch(error => message.error(error.message))

    return () => {
      clearSongsList();
    }
  }, [clearSongsList, props.localId])

  if (!oftenSuggestion || !recentSuggestion) return null;

  return (
    <>
      <Suggestions
        title={'recent'}
        suggestions={recentSuggestion} />
      <Suggestions
        title={'often'}
        suggestions={oftenSuggestion} />
      {
        adminSuggestions.map((collection, index) => (
          <Suggestions
            key={index}
            title={collection.name}
            suggestions={collection.tags} />
        ))
      }
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
