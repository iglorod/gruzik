import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { RHAP_UI } from 'react-h5-audio-player/es/constants';

import AudioPlayer from 'react-h5-audio-player';
import AddToPlaylist from './AddToPlaylist/AddToPlaylist';
import 'react-h5-audio-player/lib/styles.css';

import {
  playSongActionCreator,
  pauseSongActionCreator,
  songReadyToPlayActionCreator,
  playNextSongActionCreator,
  playPrevSongActionCreator,
  updateSongListenedTimesActionCreator,
} from '../../store/songs/actions';
import SongInfo from './SongInfo/SongInfo';
import './Player.css';

const Player = (props) => {
  const { playSong, playNow } = props;
  const playerRef = useRef(null);

  useEffect(() => {
    if (!playSong) return;

    playNow
      ? playerRef.current.audio.current.play()
      : playerRef.current.audio.current.pause()
  }, [playSong, playNow])

  const SONG_DATA = <SongInfo
    name={playSong.name}
    bandName={playSong.bandName}
    imageName={playSong.imageName}
    localId={playSong.localId} />

  const ADD_TO_PLAYLIST = props.userId ? <AddToPlaylist /> : null;

  return (
    <AudioPlayer
      ref={playerRef}
      layout={'horizontal'}
      showSkipControls
      className={'audio-player'}
      onPlay={props.onPlayHandler}
      onPause={props.onPauseHandler}
      onClickNext={props.playNext}
      onClickPrevious={props.playPrev}
      onCanPlay={props.onReadyToPlayHandler}
      onEnded={() => { props.updateListenedTimes(playSong.fileName); props.playNext(); }}
      customAdditionalControls={[RHAP_UI.LOOP, ADD_TO_PLAYLIST]}
      customProgressBarSection={[SONG_DATA, RHAP_UI.CURRENT_TIME, RHAP_UI.PROGRESS_BAR, RHAP_UI.DURATION]}
      src={`https://firebasestorage.googleapis.com/v0/b/`
        + `${process.env.REACT_APP_FIREBASE_KEY_STORE_BUCKET}/o/songs%2F`
        + `${playSong.fileName}?alt=media`}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    playSong: state.songs.playSong,
    playNow: state.songs.playNow,
    selectedSongCanPlay: state.songs.selectedSongCanPlay,
    userId: state.auth.localId,
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
