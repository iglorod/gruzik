import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Upload, Progress } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import { uploadSongActionCreator } from '../../../store/songs/actions';
import { validateSong } from '../../../utility/file-validation';
import classes from './UploadSong.module.css';
import SongInfo from './SongInfo/SongInfo';

const UploadSong = (props) => {
  const [song, setSong] = useState(null);
  const [openSongModal, setOpenSongModal] = useState(false);

  const openSongInfoModal = (file) => {
    setSong(file);
    setOpenSongModal(true);
  }

  const closeSongInfoModal = () => {
    setOpenSongModal(false);
  }

  const createSong = (songPicture, songInfo) => {
    props.uploadSong(song, songPicture, songInfo);
  }

  const songInfo = (
    <SongInfo
      closeSongInfo={closeSongInfoModal}
      createSong={createSong} />
  )

  return (
    <>
      {openSongModal ? songInfo : null}

      <Upload
        listType='picture-card'
        className={classes.uploadArea}
        showUploadList={false}
        action={openSongInfoModal}
        beforeUpload={validateSong}
        disabled={props.creating}
      >
        <div className={classes.uploadLabel}>
          <div>
            {props.creating ? <LoadingOutlined /> : <PlusOutlined />}
          </div>
          <div className='ant-upload-text'>Upload new song</div>
        </div>
      </Upload >

      {props.creating
        ? <Progress
          strokeLinecap='square'
          strokeColor='#ff7875'
          percent={props.percentLoaded}
          status={props.error ? 'exception' : 'active'} />
        : null}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    creating: state.songs.creating,
    error: state.songs.error,
    percentLoaded: state.songs.percents,
  }
}

const mapDispathToProps = (dispatch) => {
  return {
    uploadSong: (song, songPicture, songInfo) => { dispatch(uploadSongActionCreator(song, songPicture, songInfo)) }
  }
}

export default connect(mapStateToProps, mapDispathToProps)(UploadSong);
