import React, { useState } from 'react';

import { Modal, Form, Button, Space, Divider } from 'antd';

import DataInputs from '../../../UI/DataInputs/DataInputs';
import SongPicture from './SongPicture/SongPicture';
import classes from './SongInfo.module.css';

const SongInfo = (props) => {
  const [songPicture, setSongPicture] = useState(null);
  const [songInputs, setSongInputs] = useState({
    name: {
      config: {
        name: 'name',
        label: 'Name',
        placeholder: 'Come up with the track name'
      },
      validationRules: {
        required: true,
        type: 'string',
        min: 2,
        max: 25,
      },
      value: '',
    },
    tags: {
      config: {
        type: 'text',
        name: 'tags',
        label: 'Tags',
        placeholder: 'Spread tags with <#> <,> <.>'
      },
      validationRules: {
        required: true,
      },
      value: '',
    }
  })

  const onChangeHandler = (inputName, event) => {
    const newValue = (inputName === 'tags') ? event : event.target.value;
    setSongInputs(prevState => ({
      ...prevState,
      [inputName]: {
        ...prevState[inputName],
        value: newValue,
      }
    }));
  }

  const createSongHandler = () => {
    const songInfo = {}
    for (let key in songInputs) {
      songInfo[key] = songInputs[key].value;
    }

    props.createSong(songPicture, songInfo);
    props.closeSongInfo();
  }

  return (
    <Modal
      title='Create new song'
      footer={null}
      visible
      width={620}
      onCancel={props.closeSongInfo}
    >
      <div className={'modal-note'}>{'PLEASE FILL ALL FIELDS AND SELECT IMAGE FOR SONG'}</div>
      <Form name='nest-messages' onFinish={createSongHandler}>
        <div className={classes.songInfo}>
          <div>
            <SongPicture songPicture={songPicture} setPicture={setSongPicture} />
          </div>

          <div className={classes.songInputs}>
            <DataInputs stateInputs={songInputs} onChangeHandler={onChangeHandler} />
          </div>
        </div>

        <Divider orientation='right'>
          <Space>
            <Button type='default' onClick={props.closeSongInfo}>Cancel</Button>
            <Button type='primary' htmlType={'submit'}>Ok</Button>
          </Space>
        </Divider>
      </Form>
    </Modal>
  )
}

export default SongInfo;
