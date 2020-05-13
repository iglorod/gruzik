import React from 'react';

import { PauseOutlined, LoadingOutlined, CaretRightOutlined } from '@ant-design/icons';

import classes from './SongPicture.module.css';

const SongPicture = (props) => {
  const { image, playingNow, canPlay } = props;
  
  const imageSrc = 'https://firebasestorage.googleapis.com/v0/b/'
    + `${process.env.REACT_APP_FIREBASE_KEY_STORE_BUCKET}/o/pictures-of-songs%2F`
    + `${image}?alt=media`;

  const songStateIcon = (
    playingNow
      ? canPlay
        ? <PauseOutlined />     //if current song is playing
        : <LoadingOutlined />   //if current song is loading
      : <CaretRightOutlined />  //if current song on pause
  )

  return (
    <div className={classes.songHeat}>
      <div className={classes.mask} onClick={props.onSongChoosed}>{songStateIcon}</div>
      <div>
        <img className={classes.songPicture} src={imageSrc} alt={'current song'} />
      </div>
    </div>
  )
}

export default SongPicture;
