import React from 'react';
import { Link } from 'react-router-dom';

import { CustomerServiceOutlined } from '@ant-design/icons';

import { HeartIcon } from '../../../utility/icons';
import classes from './ItemResult.module.css';

const ItemResult = ({ song, startPlay }) => {
  return (
    <Link
      onClick={startPlay.bind(this, song)}
      to={{ pathname: '/band', state: { localId: song.localId } }}
    >
      <div className={classes.dataArea}>
        <div className={classes.title}>{song.name}</div>
        <div className={classes.songStatistic}>
          <CustomerServiceOutlined /> {song.listened_times}
          <HeartIcon /> {song.likesCount}
        </div>
      </div>
    </Link>
  )
}

export default ItemResult;
