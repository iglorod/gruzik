import React from 'react';

import { Avatar } from 'antd';
import { PlayCircleFilled, PauseCircleFilled, LoadingOutlined } from '@ant-design/icons';

import classes from './SongAvatar.module.css';
import { createSrc } from '../../../../utility/user';

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
        src={createSrc(props.imageName, 'pictures-of-songs')} />

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
