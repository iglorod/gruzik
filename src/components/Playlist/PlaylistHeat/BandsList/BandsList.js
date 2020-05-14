import React from 'react';
import { Link } from 'react-router-dom';
import { uniqBy } from 'lodash';

import { SelectOutlined } from '@ant-design/icons';

import classes from './BandsList.module.css';

const BandsList = ({ songs }) => {
  const linkToBand = (songBand) => (
    <Link
      key={songBand.localId}
      to={{
        pathname: '/band',
        state: {
          localId: songBand.localId,
        }
      }}
      className={classes.bandLink}
    >
      <SelectOutlined /> {songBand.bandName}
    </Link>
  )

  let songsBands = songs.map(song => (
    {
      bandName: song.bandName,
      localId: song.localId,
    }
  ))

  songsBands = uniqBy(songsBands, 'localId');

  return songsBands.map(songBand => linkToBand(songBand));
}

export default BandsList;
