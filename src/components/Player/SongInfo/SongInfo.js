import React from 'react';
import { Link } from 'react-router-dom';

import { Avatar } from 'antd';

import classes from './SongInfo.module.css';
import { createSrc } from '../../../utility/user';

const SongInfo = (props) => {
  const linkToBand = (
    <Link to={{
      pathname: '/band',
      state: {
        localId: props.localId,
      }
    }}>{props.bandName}</Link>
  )

  return (
    <div className={classes.songInfoArea}>
      <div>
        <Avatar
          shape='square'
          className={classes.avatar}
          src={createSrc(props.imageName, 'pictures-of-songs')} />
      </div>
      <div className={classes.textInfo}>
        <div>{props.name}</div>
        <div>{linkToBand}</div>
      </div>
    </div>)
}

export default SongInfo;
