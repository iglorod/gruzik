import React from 'react';
import { Link } from 'react-router-dom';

import { Avatar } from 'antd';

import classes from './SongInfo.module.css';

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
          src={'https://firebasestorage.googleapis.com/v0/b/'
            + `${process.env.REACT_APP_FIREBASE_KEY_STORE_BUCKET}/o/pictures-of-songs%2F`
            + `${props.imageName}?alt=media`} alt={'song'} />
      </div>
      <div className={classes.textInfo}>
        <div>{props.name}</div>
        <div>{linkToBand}</div>
      </div>
    </div>)
}

export default SongInfo;
