import React from 'react';
import { Link } from 'react-router-dom';

const SongBand = (props) => {
  return (
    <Link to={{
      pathname: '/band',
      state: {
        localId: props.localId,
      }
    }}>
      {props.bandName}
    </Link>
  )
}

export default SongBand;
