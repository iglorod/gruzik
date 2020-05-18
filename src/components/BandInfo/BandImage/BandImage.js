import React from 'react';
import { connect } from 'react-redux';

import { Upload, Button, Tooltip } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { uploadImageActionCreator } from '../../../store/band/actions';
import { validateImage } from '../../../utility/file-validation';
import { createSrc } from '../../../utility/user';
import classes from './BandImage.module.css';

const BandImage = (props) => {
  let uploadButton = (

    <>
      <Upload
        className={classes.uploadButton}
        showUploadList={false}
        action={props.uploadImage.bind(this, props.image)}
        beforeUpload={validateImage.bind(this, 5)}
      >
        <div className={classes.backgroundMask}></div>
        <Tooltip title='Upload new image'>
          <Button type='dashed' shape='circle' ghost icon={<UploadOutlined />} />
        </Tooltip>
      </Upload>
    </>
  )
  if (props.bandId !== props.userId) uploadButton = null;

  return (
    <>
      <img
        alt='band poster'
        src={createSrc(props.image, 'band-images')}
      />
      {uploadButton}
    </>)
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.localId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    uploadImage: (oldImageName, newImage) => { dispatch(uploadImageActionCreator(oldImageName, newImage)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BandImage);
