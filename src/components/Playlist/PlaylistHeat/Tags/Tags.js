import React from 'react';
import { Link } from 'react-router-dom';
import { flatten } from 'lodash';

import classes from './Tags.module.css';

const Tags = ({ songs }) => {
  const linkToCollection = (tag) => (
    <Link
      key={tag}
      className={classes.tag}
      to={{
        pathname: '/collection',
        state: { tag, }
      }}
    >
      {`#${tag} `}
    </Link>
  )

  let songsTags = flatten(songs.map(song => song.tags));
  songsTags = new Set(songsTags);
  
  return Array.from(songsTags).map(tag => linkToCollection(tag));
}

export default Tags;
