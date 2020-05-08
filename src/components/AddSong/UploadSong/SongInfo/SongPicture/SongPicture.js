import React from 'react';

import { Form, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { validateImage } from '../../../../../utility/file-validation';
import classes from './SongPicture.module.css';

const SongPicture = (props) => {
  return (
    <Form.Item
      name={'Song picture'}
      className={classes.formItem}
      rules={[{ required: true, }]}>
      <Upload
        fileList={null}
        action={props.setPicture}
        showUploadList={false}
        beforeUpload={validateImage.bind(this, 5)}>
        {
          props.songPicture
            ? <img src={URL.createObjectURL(props.songPicture)} className={classes.songPicture} alt={'song'} />
            : <div className={classes.songPictureAlt}><UploadOutlined /> {'Picture'}</div>
        }
      </Upload>
    </Form.Item>
  )
}

export default SongPicture;
