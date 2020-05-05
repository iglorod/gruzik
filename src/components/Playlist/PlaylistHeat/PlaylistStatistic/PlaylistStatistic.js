import React from 'react';
import { connect } from 'react-redux';

import { Tooltip } from 'antd';
import { ClockCircleOutlined, PlaySquareOutlined, RedoOutlined } from '@ant-design/icons';

import { getDurationInHumanTime } from '../../../../utility/audio';
import { shuffleSongsActionCreator } from '../../../../store/songs/actions';
import classes from './PlaylistStatistic.module.css';

const PlaylistStatistic = (props) => {
  if (!props.songs.length) return null;

  let playlistDuration = props.songs.reduce((duration, song) => duration + +song.duration, 0).toString();
  console.log(playlistDuration)
  playlistDuration = getDurationInHumanTime(playlistDuration);
  console.log(playlistDuration)

  return (
    <>
      <div>
        <Tooltip placement="bottom" title={'Playlist duration'}>
          <ClockCircleOutlined /> {playlistDuration}
        </Tooltip>
      </div>
      <div>
        <Tooltip placement="bottom" title={'Tracks count'}>
          <PlaySquareOutlined /> {props.songs.length}
        </Tooltip>
      </div>
      <div className={classes.shuffleButton}>
        <Tooltip placement="bottom" title={'Shuffle songs'} onClick={props.shuffleSongs}>
          <RedoOutlined /> {'Shuffle'}
        </Tooltip>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    songs: state.songs.songs,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    shuffleSongs: () => { dispatch(shuffleSongsActionCreator()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistStatistic);
