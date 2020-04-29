import React from 'react';
import { connect } from 'react-redux';

import EditableInput from '../../../UI/EditableInput/EditableInput';
import { updateBandDataActionCreator } from '../../../../store/actions/band';

const BandName = (props) => {
    const style = {
        fontSize: '18px',
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
            editable={props.bandEmail === props.userEmail}
            confirmMessage={'Change band name to'} />
    )
}

const mapStateToProps = (state) => {
    return {
        userEmail: state.auth.email,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        udateBandData: (data) => { dispatch(updateBandDataActionCreator(data)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BandName);
