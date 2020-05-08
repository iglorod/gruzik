import React from 'react';
import { connect } from 'react-redux';

import EditableInput from '../../UI/EditableInput/EditableInput';
import { updateBandDataActionCreator } from '../../../store/band/actions';

const BandName = (props) => {
  const style = {
    fontSize: '20px',
    fontWeight: '500',
    margin: 'auto'
  }

  return (
    <EditableInput
      editKey='bandName'
      value={props.bandName}
      udateBandData={props.udateBandData}
      minLength={2}
      maxLength={15}
      style={style}
      editable={props.bandId === props.userId}
      confirmMessage={'Change band name to'} />
  )
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.localId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    udateBandData: (data) => { dispatch(updateBandDataActionCreator(data)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BandName);
