import React from 'react';

import { Skeleton, Spin } from 'antd';

import Statistics from './Statistics/Statistics';
import BandsList from './BandsList/BandsList';
import Tags from './Tags/Tags';
import { likedSongs } from '../../../utility/music-genres';
import classes from './PlaylistHeat.module.css';

const PlaylistHeat = ({ playlist, playlistKey, songs }) => {
  if (playlistKey === 'liked') {
    playlist = likedSongs;
  }
  else if (!playlist) return <Skeleton active />;

  let additionalData = <Spin size='small' />
  if (songs.length > 0) {
    additionalData = (
      <>
        <div className={classes.bands}>{<BandsList songs={songs} />}</div>
        <div className={classes.tags}>{<Tags songs={songs} />}</div>
        <div className={classes.statistic}><Statistics /></div>
      </>
    )
  }

  return (
    <div className={classes.heat}>
      <div className={classes.title}>{playlist.name}</div>
      <div className={classes.description}>{playlist.description}</div>
      {additionalData}
    </div>
  )
}

export default React.memo(PlaylistHeat);
