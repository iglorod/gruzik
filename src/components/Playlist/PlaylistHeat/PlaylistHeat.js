import React from 'react';

import { Skeleton } from 'antd';

import PlaylistStatistic from './PlaylistStatistic/PlaylistStatistic';
import classes from './PlaylistHeat.module.css';

const PlaylistHeat = ({ playlist }) => {
  if (!playlist) return <Skeleton active />;

  return (
    <div className={classes.heat}>
      <div className={classes.title}>{playlist.name}</div>
      <div className={classes.description}>{playlist.description}</div>
      <div className={classes.statistic}><PlaylistStatistic /></div>
    </div>
  )
}

export default PlaylistHeat;
