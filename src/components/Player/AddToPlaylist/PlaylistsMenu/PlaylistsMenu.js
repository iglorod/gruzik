import React from 'react';
import { connect } from 'react-redux';

import { Menu } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';


import { addSongToPlaylistActionCreator } from '../../../../store/songs/actions';
import classes from './PlaylistMenu.module.css';

const PlaylistsMenu = (props) => {
  const addSongToPlaylist = (playlistId, songName) => {
    const data = {
      playlistId,
      songName,
    }

    props.addToPlaylist(data);
  }

  return (
    <Menu className={classes.menu}>
      {
        props.playlists.map((playlist, index) => (
          <Menu.Item
            key={index}
            onClick={addSongToPlaylist.bind(this, playlist.key, props.playSong.fileName)}
          >
            <AppstoreOutlined /> {playlist.name}
          </Menu.Item>
        ))
      }
    </Menu>
  )
}

const mapStateToProps = (state) => {
  return {
    playlists: state.songs.playlists,
    playSong: state.songs.playSong,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToPlaylist: (data) => { dispatch(addSongToPlaylistActionCreator(data)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistsMenu);
