import React from 'react';

import { PauseOutlined, LoadingOutlined, CaretRightOutlined } from '@ant-design/icons';

import { createSrc } from '../../../utility/user';
import classes from './SongPicture.module.css';

const SongPicture = (props) => {
  const { image, playingNow, canPlay } = props;
  
  const imageSrc = createSrc(image, 'pictures-of-songs');

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
