import React from 'react';

import SongBand from './SongBand/SongBand';
import SongStatistics from './SongStatistics/SongStatistics';
import classes from './SongDescription.module.css';

const SongDescription = (props) => {
  const { song, currentSong } = props;

  const descriptionClasses = [classes.bottomSection];
  if (currentSong) descriptionClasses.push(classes.bottomSectionActive);

  return (
    <div className={descriptionClasses.join(' ')}>
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
  )
}

export default SongDescription;
