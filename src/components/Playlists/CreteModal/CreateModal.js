import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Modal, Form, Divider, Space, Button } from 'antd';

import { createPlaylistActionCreator } from '../../../store/songs/actions';
import DataInputs from '../../UI/DataInputs/DataInputs';

const CreateModal = (props) => {
  const [playlistData, setPlaylistData] = useState({
    name: {
      config: {
        name: 'name',
        label: 'Name',
      },
      validationRules: {
        required: true,
        type: 'string',
        min: 2,
        max: 25,
      },
      value: '',
    },
    description: {
      config: {
        type: 'text',
        name: 'description',
        label: 'Description',
      },
      validationRules: {
        type: 'string',
        max: 300,
      },
      value: '',
    }
  })

  const onChangeHandler = (inputName, event) => {
    const newValue = event.target.value;
    setPlaylistData(prevState => ({
      ...prevState,
      [inputName]: {
        ...prevState[inputName],
        value: newValue,
      }
    }));
  }

  const createPlaylist = () => {
    const playlistKey = new Date().getTime() + props.localId;
    const data = {
      key: playlistKey,
      userId: props.localId,
      name: playlistData.name.value,
      description: playlistData.description.value,
    }

    props.createPlaylist(data);
    props.onCancel();
  }

  return (
    <Modal
      title="Create new Playlist"
      footer={null}
      visible
      onCancel={props.onCancel}
    >
      <Form name="nest-messages" onFinish={createPlaylist}>
      <DataInputs stateInputs={playlistData} onChangeHandler={onChangeHandler} />

        <Divider orientation="right">
          <Space>
            <Button type='default' onClick={props.onCancel}>Cancel</Button>
            <Button type='primary' htmlType={'submit'}>Ok</Button>
          </Space>
        </Divider>
      </Form>
    </Modal>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    createPlaylist: (data) => { dispatch(createPlaylistActionCreator(data)) }
  }
}

export default connect(null, mapDispatchToProps)(CreateModal);
