import React from 'react';
import { connect } from 'react-redux';

import { Spin } from 'antd';

import SongPicture from './SongPicture/SongPicture';
import SongData from './SongData/SongData';
import { startPlayMusicActionCreator } from '../../store/songs/actions';
import classes from './CurrentSong.module.css';

const CurrentSong = (props) => {
  const { currentSong } = props;

  if (!currentSong) return <Spin />;

  return (
    <div className={classes.container}>
      <SongPicture
        image={currentSong.imageName}
        playingNow={props.playNow}
        canPlay={props.canPlay}
        onSongChoosed={props.startPlayMusic.bind(this, currentSong.fileName)} />
      <SongData song={currentSong} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentSong: state.songs.playSong,
    playNow: state.songs.playNow,
    canPlay: state.songs.selectedSongCanPlay,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startPlayMusic: (fileName) => { dispatch(startPlayMusicActionCreator(fileName)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentSong);
