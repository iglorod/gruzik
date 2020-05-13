import React from 'react';
import { Link } from 'react-router-dom';

import classes from './SongData.module.css';

const SongData = ({ song }) => {
  const linkToBand = (
    <Link to={{
      pathname: '/band',
      state: {
        localId: song.localId,
      }
    }}>{song.bandName}</Link>
  )

  const linkToCollection = (tag) => (
    <Link
      key={tag}
      className={classes.tag}
      to={{
        pathname: '/collection',
        state: { tag, }
      }}>{`#${tag} `}</Link>
  )

  return (
    <div className={classes.container}>
      <div className={classes.songName}>{song.name}</div>
      <div className={classes.songBand}>{linkToBand}</div>

      <div>
        {
          song.tags.map(tag => linkToCollection(tag))
        }
      </div>
    </div>
  )
}

export default SongData;
