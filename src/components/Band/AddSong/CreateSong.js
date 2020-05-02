import React from 'react';
import { connect } from 'react-redux';

import UploadSong from './UploadSong/UploadSong';

const CreateSong = (props) => {
  if (props.bandId === props.userId) {
    return <UploadSong />
  }

  return null;
}

const mapStateToProps = (state) => {
  return {
    bandId: state.band.localId,
    userId: state.auth.localId,
  }
}

export default connect(mapStateToProps)(CreateSong);
