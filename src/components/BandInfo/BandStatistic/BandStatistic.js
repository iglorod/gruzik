import React from 'react';
import { connect } from 'react-redux';

import { Tooltip, Skeleton } from 'antd';
import { PlaySquareOutlined, CustomerServiceOutlined } from '@ant-design/icons';

import { HeartIcon } from '../../../utility/icons';
import classes from './BandStatistic.module.css';

const BandStatistic = (props) => {
  if (!props.songs) return <Skeleton title={false} paragraph={{ rows: 1 }} />

  const likesCount = props.songs.reduce((count, song) => count + song.likesCount, 0);
  const listenedTimes = props.songs.reduce((count, song) => count + song.listened_times, 0);;
  const songsCount = props.songs.length;

  return (
    <div className={classes.statistic}>
      <div>
        <Tooltip placement="bottom" title={'Tracks count'}>
          <PlaySquareOutlined /> {songsCount}
        </Tooltip>
      </div>
      <div>
        <CustomerServiceOutlined /> {listenedTimes}
      </div>
      <div>
        <HeartIcon /> {likesCount}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    songs: state.songs.songs,
  }
}

export default connect(mapStateToProps)(BandStatistic);
