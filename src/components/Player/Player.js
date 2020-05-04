import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import {
  playSongActionCreator,
  pauseSongActionCreator,
  songReadyToPlayActionCreator,
  playNextSongActionCreator,
  playPrevSongActionCreator,
  updateSongListenedTimesActionCreator,
} from '../../store/songs/actions';
import classes from './Player.module.css';

const Player = (props) => {
  const { playSong, playNow } = props;
  useEffect(() => {
    if (!playSong) return;

    playNow
      ? document.getElementsByTagName('audio')[0].play()
      : document.getElementsByTagName('audio')[0].pause()
  }, [playSong, playNow])

  return (
    <>
      <AudioPlayer
        layout={'horizontal'}
        showSkipControls
        className={classes.audioPlayer}
        onPlay={props.onPlayHandler}
        onPause={props.onPauseHandler}
        onClickNext={props.playNext}
        onClickPrevious={props.playPrev}
        onCanPlay={props.onReadyToPlayHandler}
        onEnded={() => { props.updateListenedTimes(playSong.fileName); props.playNext(); }}
        src={`https://firebasestorage.googleapis.com/v0/b/`
          + `${process.env.REACT_APP_FIREBASE_KEY_STORE_BUCKET}/o/songs%2F`
          + `${playSong.fileName}?alt=media`}
      />
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    playSong: state.songs.playSong,
    playNow: state.songs.playNow,
    selectedSongCanPlay: state.songs.selectedSongCanPlay,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPlayHandler: () => { dispatch(playSongActionCreator()) },
    onPauseHandler: () => { dispatch(pauseSongActionCreator()) },
    onReadyToPlayHandler: () => { dispatch(songReadyToPlayActionCreator()) },
    playNext: () => { dispatch(playNextSongActionCreator()) },
    playPrev: () => { dispatch(playPrevSongActionCreator()) },
    updateListenedTimes: (fileName) => { dispatch(updateSongListenedTimesActionCreator(fileName)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
