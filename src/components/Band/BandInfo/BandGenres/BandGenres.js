import React from 'react';

import { Tag } from 'antd';

import classes from './BandGenres.module.css';

const BandGenres = (props) => {
  return (
    <div className={classes.genresContainer}>
      {
        props.genres.map((genre, index) => (
          <Tag key={index} className={classes.genre} color="purple">{genre}</Tag>
        ))
      }
    </div>
  )
}

export default BandGenres;
