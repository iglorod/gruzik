import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Card, message } from 'antd';
import { PlusCircleOutlined, AppstoreOutlined } from '@ant-design/icons';

import CreateModal from './CreteModal/CreateModal';
import PlaylistPoster from './PlaylistPoster/PlaylistPoster';
import { likedSongs } from '../../utility/music-genres';
import { fetchLikedSongsCount } from '../../utility/song-queries';

import './Playlists.css';

const Playlists = (props) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [likedSongsCount, setLikedSongsCount] = useState(0);
  const { playlists } = props;

  useEffect(() => {
    fetchLikedSongsCount(props.localId)
      .then(likedSongsCount => setLikedSongsCount(likedSongsCount))
      .catch(error => message.error(error.message))
  })

  if (!props.localId) {
    return <Redirect to={'/'} />;
  }

  const openCreateModal = () => {
    setShowCreateModal(true);
  }

  const closeCreateModal = () => {
    setShowCreateModal(false);
  }

  let createModal = null;
  if (showCreateModal) {
    createModal = (
      <CreateModal
        localId={props.localId}
        onCancel={closeCreateModal} />
    )
  }

  return (
    <>
      {createModal}
      <Card
        className={'playlist-card'}
        title={<><AppstoreOutlined /> {'Playlists'}</>}
      >
        {likedSongsCount > 0 ? <PlaylistPoster playlist={likedSongs} /> : null}
        {
          playlists.map((playlist, index) => (
            <PlaylistPoster key={index} playlist={playlist} />
          ))
        }

        <Card.Grid className={'playlist'} onClick={openCreateModal}>
          <div className={'add-playlist-button'}>
            <PlusCircleOutlined />
          </div>
        </Card.Grid>
      </Card>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    localId: state.auth.localId,
    playlists: state.songs.playlists,
  }
}

export default connect(mapStateToProps)(Playlists);
