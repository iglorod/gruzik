import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { trim } from 'lodash';
import { connect } from 'react-redux';

import { Alert } from 'antd';

import AddComment from './AddComment/AddComment';
import CommentsList from './CommentsList/CommentsList';
import { fetchBandData } from '../../utility/user';
import { createSrc } from '../../utility/user';
import { addComment, fetchComments } from '../../utility/comments';
import './Comments.css';

const Comments = (props) => {
  const [comments, setComments] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [bandUser, setBandUser] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!props.localId || !props.isBand) return;
    fetchBandData(props.localId)
      .then(bandData => setBandUser(bandData))
      .catch(error => setError(error))
  }, [props.localId, props.isBand])

  useEffect(() => {
    if (!props.playSong) return;

    setComments([]);
    setFetching(true);

    fetchComments(props.playSong.fileName)
      .then(comments => setComments(comments))
      .then(() => setFetching(false))
      .catch(error => setError(error))
  }, [props.playSong])

  if (!props.playSong) return null;

  let currentUserData = {
    name: props.username,
    imageSrc: createSrc(props.userImage || 'profile.png', 'user-images'),
  }
  if (props.isBand.toString() === 'true') {
    currentUserData = {
      name: bandUser.bandName,
      imageSrc: createSrc(bandUser.image, 'band-images'),
    }
  }

  const handleSubmit = () => {
    if (!trim(newComment)) return;
    const userInfoIsFull = Object.values(currentUserData).reduce((fill, item) => item && fill, true);
    if (!userInfoIsFull) {
      setError({ message: 'Please config your profile' })
    }
    setError(null);
    setSubmitting(true);

    const commentData = {
      songName: props.playSong.fileName,
      localId: props.localId,
      content: newComment,
    }

    addComment(commentData, props.idToken)
      .then(() => {
        const comment = {
          author: currentUserData.name,
          avatar: currentUserData.imageSrc,
          content: <p>{newComment}</p>,
          datetime: moment().fromNow(),
        }

        setComments(prevState => ([
          comment,
          ...prevState,
        ]))
        setNewComment('');
        setSubmitting(false);
      })
      .catch(error => setError(error))
  }

  const handleChange = (event) => {
    setNewComment(event.target.value);
  };

  return (
    <div>
      <CommentsList comments={comments} loading={fetching} />
      {error ? <Alert message={error.message} type='error' showIcon /> : null}
      <AddComment
        localId={props.localId}
        newComment={newComment}
        submitting={submitting}
        userData={currentUserData}
        disabled={fetching || submitting}
        handleSubmit={handleSubmit}
        handleChange={handleChange} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    idToken: state.auth.idToken,
    localId: state.auth.localId,
    username: state.auth.username,
    userImage: state.auth.image,
    isBand: state.auth.isBand,
    playSong: state.songs.playSong,
  }
}

export default connect(mapStateToProps)(Comments);
