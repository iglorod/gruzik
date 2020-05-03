import React from 'react';
import { connect } from 'react-redux';

import Player from '../../Player/Player';
import classes from './Footer.module.css';

const Footer = ({ playSong }) => {
  if (!playSong) return null;

  return (
    <>
      <div className={classes.footerMargin}></div>
      <Player />
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    playSong: state.songs.playSong,
  }
}

export default connect(mapStateToProps)(Footer);
