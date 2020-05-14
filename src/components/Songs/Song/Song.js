import React from 'react';

import { Card } from 'antd';

import SongAvatar from './SongAvatar/SongAvatar';
import SongDescription from './SongDescription/SongDescription';
import DragItemWrapper from '../../UI/DragListWrapper/DragItemWrapper/DragItemWrapper';
import { getDurationInHumanTime } from '../../../utility/audio';
import classes from './Song.module.css';

const Song = (props) => {
  const { Meta } = Card;
  const { song, currentSong, playNow, selectedSongCanPlay } = props;

  const songCardClasses = [classes.songCard];
  if (currentSong) songCardClasses.unshift(classes.activeSongCard);

  const songDuration = getDurationInHumanTime(song.duration);

  return (
    <DragItemWrapper index={props.index}>
      <Card className={songCardClasses.join(' ')}>
        <Meta
          className={classes.songContainer}
          avatar={
            <SongAvatar
              imageName={song.imageName}
              isCurrentAndPlay={currentSong && playNow}
              selectedSongCanPlay={selectedSongCanPlay}
              onSongChoosed={props.onSongChoosed} />
          }

          title={
            <div className={classes.topSection}>
              <div className={classes.songName}>{song.name}</div>
              <div className={classes.songDuration}>{songDuration}</div>
            </div>
          }
          description={
            <SongDescription
              song={song}
              currentSong={currentSong}
              userIsAuth={props.userIsAuth}
              likeSong={props.likeSong}
              unlikeSong={props.unlikeSong}
              updating={props.updating} />
          }
        />
      </Card>
    </DragItemWrapper>
  )
}

export default React.memo(Song);
