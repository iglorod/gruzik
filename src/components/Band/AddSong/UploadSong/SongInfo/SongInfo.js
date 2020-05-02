import React, { useState } from 'react';

import { Modal, Form, Button, Space, Divider } from 'antd';

import DataInputs from '../../../../UI/DataInputs/DataInputs';

const SongInfo = (props) => {
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

    props.createSong(songInfo);
    props.closeSongInfo();
  }

  return (
    <Modal
      title="Create new song"
      footer={null}
      visible
    >
      <Form name="nest-messages" onFinish={createSongHandler}>
        <DataInputs stateInputs={songInputs} onChangeHandler={onChangeHandler} />
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
