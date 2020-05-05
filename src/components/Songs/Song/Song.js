import React from 'react';

import { Card, Avatar } from 'antd';
import { PlayCircleFilled, PauseCircleFilled, LoadingOutlined } from '@ant-design/icons';

import SongBand from './SongBand/SongBand';
import SongStatistics from './SongStatistics/SongStatistics';
import { getDurationInHumanTime } from '../../../utility/audio';
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

  const songDuration = getDurationInHumanTime(song.duration);

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
            <div className={classes.songDuration}>{songDuration}</div>
          </div>
        }
        description={
          <div className={classes.bottomSection}>
            <div className={classes.bandName}>
              <SongBand localId={song.localId} bandName={song.bandName} />
            </div>
            <div className={classes.songStatistics}>
              <SongStatistics
                userIsAuth={props.userIsAuth}
                listened_times={song.listened_times}
                userIsLikedSong={song.userIsLikedSong}
                likesCount={song.likesCount}
                likeSong={props.likeSong}
                unlikeSong={props.unlikeSong}
                updating={props.updating} />
            </div>
          </div>
        }
      />
    </Card>
  )
})

export default Song;
