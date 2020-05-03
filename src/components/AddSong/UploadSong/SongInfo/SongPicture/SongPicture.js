import React from 'react';

import { Form, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { validateImage } from '../../../../../utility/file-validation';
import classes from './SongPicture.module.css';

const SongPicture = (props) => {
  return (
    <Form.Item
      name={'Song picture'}
      label={'Song picture'}
      rules={[{ required: true, }]}>
      <Upload
        fileList={null}
        action={props.setPicture}
        showUploadList={false}
        beforeUpload={validateImage.bind(this, 5)}>
        <Button>
          <UploadOutlined />
          {'Upload song picture'}
        </Button>
        {
          props.songPicture
            ? <img src={URL.createObjectURL(props.songPicture)} className={classes.songPicture} alt={'song'} />
            : null
        }
      </Upload>
    </Form.Item>
  )
}

export default SongPicture;
