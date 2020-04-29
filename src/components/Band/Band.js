import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import BandInfo from './BandInfo/BandInfo';
import { fetchBandDataActionCreator, clearBandDataActionCreator } from '../../store/actions/band';

const Band = (props) => {
    const { fetchBandData, clearBandData } = props;

    useEffect(() => {
        const band2Email = 'band2@mail.com';

        fetchBandData(band2Email);

        return () => {
            clearBandData();
        }
    }, [fetchBandData, clearBandData])

    return (
        <BandInfo />
    )
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchBandData: (email) => { dispatch(fetchBandDataActionCreator(email)) },
        clearBandData: () => { dispatch(clearBandDataActionCreator()) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Band);
