import React from 'react';

import { Card, Avatar } from 'antd';
import { PlayCircleFilled, PauseCircleFilled, LoadingOutlined } from '@ant-design/icons';

import classes from './Song.module.css';

const Song = React.memo((props) => {
  const { Meta } = Card;
  const { song, currentSong, playNow, selectedSongCanPlay } = props;

  const songCardClasses = [classes.songCard];
  if (currentSong) songCardClasses.push(classes.activeSongCard);

  const songImageIcon = (
    (currentSong && playNow)
      ? selectedSongCanPlay
        ? <PauseCircleFilled /> //if current song is playing
        : <LoadingOutlined />   //if current song is loading
      : <PlayCircleFilled />    //if selected song !== current song
  )

  return (
    <Card className={songCardClasses.join(' ')}>
      <Meta
        className={classes.songContainer}
        avatar={
          <>
            <Avatar
              shape="square"
              size='large'
              src={`https://firebasestorage.googleapis.com/v0/b/`
                + `${process.env.REACT_APP_FIREBASE_KEY_STORE_BUCKET}/o/pictures-of-songs%2F`
                + `${song.imageName}?alt=media`} />

            <Avatar
              className={classes.avatarMask}
              shape="square"
              size='large'
              icon={songImageIcon}
              onClick={props.onSongChoosed} />
          </>
        }

        title={
          <div className={classes.topSection}>
            <div className={classes.songName}>{song.name}</div>
            <div className={classes.songDuration}>{song.duration.split('.').join(':')}</div>
          </div>
        }
        description={
          <div className={classes.bottomSection}>{song.bandName}</div>
        }
      />
    </Card>
  )
})

export default Song;
