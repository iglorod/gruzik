import React from 'react';

import { Avatar } from 'antd';
import { PlayCircleFilled, PauseCircleFilled, LoadingOutlined } from '@ant-design/icons';

import classes from './SongAvatar.module.css';

const SongAvatar = (props) => {
  const { isCurrentAndPlay, selectedSongCanPlay } = props;

  const songImageIcon = (
    isCurrentAndPlay
      ? selectedSongCanPlay
        ? <PauseCircleFilled /> //if current song is playing
        : <LoadingOutlined />   //if current song is loading
      : <PlayCircleFilled />    //if selected song !== current song
  )

  return (
    <>
      <Avatar
        shape='square'
        size='large'
        src={'https://firebasestorage.googleapis.com/v0/b/'
          + `${process.env.REACT_APP_FIREBASE_KEY_STORE_BUCKET}/o/pictures-of-songs%2F`
          + `${props.imageName}?alt=media`} />

      <Avatar
        className={classes.avatarMask}
        shape='square'
        size='large'
        icon={songImageIcon}
        onClick={props.onSongChoosed} />
    </>
  )
}

export default SongAvatar;
