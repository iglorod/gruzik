import React from 'react';
import { connect } from 'react-redux';

import { updateBandDataActionCreator } from '../../../../store/band/actions';
import EditableInput from '../../../UI/EditableInput/EditableInput';

const BandDescription = (props) => {
  const style = {
    maxHeight: '100px',
    overflow: 'auto',
    fontSize: '13px',
    color: 'dimgrey',
    textAlign: 'justify',
    maxWidth: 'fit-content',
  }

  return (
    <EditableInput
      editKey='description'
      value={props.description}
      udateBandData={props.udateBandData}
      minLength={10}
      maxLength={150}
      style={style}
      editable={props.bandId === props.userId}
      confirmMessage={'Change description to'} />
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

export default connect(mapStateToProps, mapDispatchToProps)(BandDescription);
