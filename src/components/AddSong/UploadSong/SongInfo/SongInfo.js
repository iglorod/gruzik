import React, { useState } from 'react';

import { Modal, Form, Button, Space, Divider } from 'antd';

import DataInputs from '../../../UI/DataInputs/DataInputs';
import SongPicture from './SongPicture/SongPicture';

const SongInfo = (props) => {
  const [songPicture, setSongPicture] = useState(null);
  const [songInputs, setSongInputs] = useState({
    name: {
      config: {
        name: 'name',
        label: 'Name',
      },
      validationRules: {
        required: true,
        type: 'string',
        min: 2,
      },
      value: '',
    },
    genres: {
      config: {
        type: 'text',
        name: 'genres',
        label: 'Genres',
      },
      validationRules: {
        required: true,
      },
      value: '',
    }
  })

  const onChangeHandler = (inputName, event) => {
    const newValue = (inputName === 'genres') ? event : event.target.value;
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
      title="Create new song"
      footer={null}
      visible
      onCancel={props.closeSongInfo}
    >
      <Form name="nest-messages" onFinish={createSongHandler}>
        <DataInputs stateInputs={songInputs} onChangeHandler={onChangeHandler} />

       <SongPicture songPicture={songPicture} setPicture={setSongPicture} />

        <Divider orientation="right">
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
