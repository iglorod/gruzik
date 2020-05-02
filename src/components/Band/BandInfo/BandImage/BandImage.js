import React from 'react';
import { connect } from 'react-redux';

import { Upload, Button, Tooltip } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { uploadImageActionCreator, startUpdatingDataActionCreator } from '../../../../store/band/actions';
import { validateImage } from '../../../../utility/file-validation';
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
        <Tooltip title="Upload new image">
          <Button type="dashed" shape="circle" ghost icon={<UploadOutlined />} />
        </Tooltip>
      </Upload>
    </>
  )
  if (props.bandId !== props.userId) uploadButton = null;

  return (
    <>
      <img
        src={`https://firebasestorage.googleapis.com/v0/b/gruzik-787b2.appspot.com/o/band-images%2F${props.image}?alt=media`}
        alt="band poster"
      />
      {uploadButton}
    </>)
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.localId,
    userToken: state.auth.idToken,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    uploadImage: (oldImageName, newImage) => { dispatch(uploadImageActionCreator(oldImageName, newImage)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BandImage);
