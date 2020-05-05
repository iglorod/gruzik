import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { Card } from 'antd';
import { PlusCircleOutlined, AppstoreOutlined, ExportOutlined } from '@ant-design/icons';

import CreateModal from './CreteModal/CreateModal';
import classes from './Playlists.module.css';

const Playlists = (props) => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const { playlists } = props;

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
        className={classes.playlistCard}
        title={<><AppstoreOutlined /> {'Playlists'}</>}
      >
        {
          playlists.map((playlist, index) => (
            <Link key={index} to={{
              pathname: '/playlist',
              state: {
                key: playlist.key,
              }
            }}>
              <Card.Grid className={classes.playlist}>
                <ExportOutlined className={classes.playlistIcon} />
                <div className={classes.playlistInfo}>
                  <div>
                    {playlist.name}
                  </div>
                  <div>
                    {playlist.description}
                  </div>
                </div>
              </Card.Grid>
            </Link>
          ))
        }

        <Card.Grid className={classes.playlist} onClick={openCreateModal}>
          <div className={classes.addPlaylistButton}>
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
