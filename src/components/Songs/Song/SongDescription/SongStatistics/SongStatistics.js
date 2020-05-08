import React from 'react';

import { CustomerServiceOutlined } from '@ant-design/icons';

import { HeartIcon } from '../../../../../utility/icons';
import classes from './SongStatistics.module.css';

const SongStatistics = (props) => {
  const onHeartClicked = (props.updating || !props.userIsAuth)
    ? null
    : props.userIsLikedSong
      ? props.unlikeSong
      : props.likeSong;

  return (
    <>
      <div><CustomerServiceOutlined /> {props.listened_times}</div>
      <div>
        <HeartIcon
          className={props.userIsLikedSong ? classes.heartIcon : null}
          onClick={onHeartClicked} />{' '}
        {props.likesCount}
      </div>
    </>
  )
}

export default SongStatistics;
