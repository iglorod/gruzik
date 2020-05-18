import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// import { cloneDeep } from 'lodash';

import { Modal, Form, Divider, Space, Button } from 'antd';

import FormPicture from '../UI/FormPicture/FormPicture';
import DataInputs from '../UI/DataInputs/DataInputs';
import { uploadUserImageActionCreator } from '../../store/authorization/actions';
import classes from './Profile.module.css';

const Profile = (props) => {
  const { submitting } = props;
  const [userImage, setUserImage] = useState(props.image);
  const [fileWasChecked, setFileWasChecked] = useState(false);
  const [userInputs, setUserInputs] = useState({
    username: {
      config: {
        name: 'username',
        label: 'Username',
        placeholder: 'Come up with the username'
      },
      validationRules: {
        type: 'string',
        min: 4,
        max: 10,
      },
      value: props.username,
    },
  })

  useEffect(() => {
    if (submitting === false) {
      handleCancel();
    }
  }, [submitting])

  const onChangeHandler = (inputName, event) => {
    let newValue = event.target.value;
    setUserInputs(prevState => ({
      ...prevState,
      [inputName]: {
        ...prevState[inputName],
        value: newValue,
      }
    }));
  }

  const handleOk = () => {
    const newUsername = userInputs.username.value;
    if (!fileWasChecked && newUsername === props.username) return;

    const userData = {};

    if (fileWasChecked) {
      userData.image = userImage;
      userData.oldImage = props.image;
    }

    if (newUsername !== props.username) {
      userData.username = newUsername;
    }

    props.updateUserData(userData);
  }

  const handleCancel = () => {
    setUserImage(props.image);
    setFileWasChecked(false);

    props.closeModal();
  }

  const chooseNewImage = (newImage) => {
    setUserImage(newImage);
    setFileWasChecked(true);
  }

  return (
    <Modal
      title='Profile'
      visible={props.open}
      confirmLoading={submitting}
      footer={false}
      onCancel={submitting ? null : handleCancel}
    >
      <div className={'modal-note'}>{'PLEASE FILL ALL FIELDS'}</div>
      <Form name='nest-messages' onFinish={handleOk}>
        <div className={classes.userInfo}>
          <div>
            <FormPicture picture={userImage} name='User Image' pictureSize={2} setPicture={chooseNewImage} />
          </div>

          <div className={classes.userInputs}>
            <DataInputs stateInputs={userInputs} onChangeHandler={onChangeHandler} />
          </div>
        </div>
        <Divider orientation='right'>
          <Space>
            <Button type='default' disabled={submitting} onClick={handleCancel}>Cancel</Button>
            <Button type='primary' disabled={submitting} loading={submitting} htmlType={'submit'}>Ok</Button>
          </Space>
        </Divider>
      </Form>
    </Modal>
  )
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.username,
    image: state.auth.image,
    submitting: state.auth.submitting,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserData: (userData) => { dispatch(uploadUserImageActionCreator(userData)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
