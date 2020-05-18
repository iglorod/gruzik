import React from 'react';

import { Form, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { validateImage } from '../../../utility/file-validation';
import classes from './FormPicture.module.css';
import { createSrc } from '../../../utility/user';

const FormPicture = (props) => {
  let picture = (
    <div className={classes.pictureAlt}>
      <UploadOutlined /> {'Picture'}
    </div>
  )

  if (props.picture) {
    let src = null;
    try {
      src = URL.createObjectURL(props.picture);
    } catch (error) {
      src = createSrc(props.picture, 'user-images');
    }

    picture = (
      <img
        src={src}
        className={classes.picture}
        alt={props.name} />
    )
  }

  return (
    <Form.Item
      name={props.name}
      className={classes.formItem}
      rules={props.rules}>
      <Upload
        fileList={null}
        action={props.setPicture}
        showUploadList={false}
        beforeUpload={validateImage.bind(this, props.pictureSize)}>
        {picture}
      </Upload>
    </Form.Item>
  )
}

export default FormPicture;
