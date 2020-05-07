import React from 'react';
import { connect } from 'react-redux';

import { Spin, Empty } from 'antd';

import Song from './Song/Song';
import {
  startPlayMusicActionCreator,
  addSongLikeActionCreator,
  removeSongLikeActionCreator
} from '../../store/songs/actions';
import classes from './Song.module.css';

const Songs = (props) => {
  const { songs, loading, playSong, playNow } = props;

  if (loading) return <Spin className={props.uxAtCenter ? classes.UXElement : null} />

  let songsList = <Empty className={props.uxAtCenter ? classes.UXElement : null} image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  if (songs.length > 0) {
    songsList = songs.map((song, index) => (
      <Song
        key={index}
        song={song}
        userIsAuth={!!props.localId}
        updating={props.updating.includes(song.fileName)}
        onSongChoosed={props.startPlayMusic.bind(this, song.fileName)}
        likeSong={props.likeSong.bind(this, song.fileName, song.userLikeId)}
        unlikeSong={props.unlikeSong.bind(this, song.fileName, song.userLikeId)}
        playNow={playNow}
        selectedSongCanPlay={props.selectedSongCanPlay}
        currentSong={(playSong && playSong.fileName === song.fileName) ? true : false} />
    ))
  }

  return songsList;
}

const mapStateToProps = (state) => {
  return {
    songs: state.songs.songs,
    loading: state.songs.loading,
    playSong: state.songs.playSong,
    playNow: state.songs.playNow,
    selectedSongCanPlay: state.songs.selectedSongCanPlay,
    updating: state.songs.updating,
    localId: state.auth.localId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    likeSong:       (fileName, key) => { dispatch(addSongLikeActionCreator(fileName, key)) },
    unlikeSong:     (fileName, key) => { dispatch(removeSongLikeActionCreator(fileName, key)) },
    startPlayMusic: (fileName) => { dispatch(startPlayMusicActionCreator(fileName)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Songs);
