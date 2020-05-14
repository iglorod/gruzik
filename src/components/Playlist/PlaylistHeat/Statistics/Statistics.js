import React from 'react';
import { connect } from 'react-redux';

import { Tooltip, Button } from 'antd';
import { ClockCircleOutlined, PlaySquareOutlined, RedoOutlined } from '@ant-design/icons';

import { getDurationInHumanTime } from '../../../../utility/audio';
import { shuffleSongsActionCreator } from '../../../../store/songs/actions';
import classes from './Statistics.module.css';

const Statistics = (props) => {
  if (!props.songs.length) return null;

  let playlistDuration = props.songs.reduce((duration, song) => duration + +song.duration, 0).toString();
  playlistDuration = getDurationInHumanTime(playlistDuration);

  return (
    <>
      <div className={classes.statistics}>
        <Tooltip placement='bottom' title={'Playlist duration'}>
          <ClockCircleOutlined /> {playlistDuration}
        </Tooltip>
        <Tooltip placement='bottom' title={'Tracks count'}>
          <PlaySquareOutlined /> {props.songs.length}
        </Tooltip>
      </div>
      <div>
        <Tooltip placement='bottom' title={'Shuffle songs'}>
          <Button type='dashed' onClick={props.shuffleSongs}>
            <RedoOutlined /> {'Shuffle'}
          </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
