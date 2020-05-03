import React from 'react';
import { connect } from 'react-redux';

import { Spin, Empty } from 'antd';

import Song from './Song/Song';
import { startPlayMusicActionCreator } from '../../store/songs/actions';
import classes from './Song.module.css';

const Songs = (props) => {
  const { songs, loading, playSong, playNow } = props;

  if (loading) return <Spin className={classes.UXElement} />

  let songsList = <Empty className={classes.UXElement} image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  if (songs.length > 0) {
    songsList = songs.map((song, index) => (
      <Song
        key={index}
        song={song}
        onSongChoosed={props.onSongChoosed.bind(this, song.fileName)}
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSongChoosed: (fileName) => { dispatch(startPlayMusicActionCreator(fileName)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Songs);
