import * as actionTypes from './actionTypes';
import axios from 'axios';

export const setBandDataActionCreator = (bandData) => {
    return {
        type: actionTypes.SET_BAND_DATA,
        bandData,
    }
}

export const finishFetchingDataActionCreator = () => {
    return {
        type: actionTypes.FINISH_BAND_LOADING,
    }
}

export const startUpdatingDataActionCreator = () => {
    return {
        type: actionTypes.START_BAND_UPDATING,
    }
}

export const finishUpdatingDataActionCreator = () => {
    return {
        type: actionTypes.FINISH_BAND_UPDATING,
    }
}

export const bandErrorActionCreator = (error) => {
    return {
        type: actionTypes.BAND_ERROR,
        error,
    }
}

export const clearBandDataActionCreator = () => {
    return {
        type: actionTypes.CLEAR_BAND_DATA,
    }
}

//middleware

export const fetchBandDataActionCreator = (email) => {
    return dispatch => {
        let queryParams = `?orderBy="email"&equalTo="${email}"&limitToFirst=1`;
        axios.get('https://gruzik-787b2.firebaseio.com/bands.json/' + queryParams)
            .then(response => {
                if (response.data) {
                    const bandKey = Object.keys(response.data)[0];
                    dispatch(setBandDataActionCreator({ ...response.data[bandKey], key: bandKey }));
                    dispatch(finishFetchingDataActionCreator());
                }
                else throw Error('Band does not exist!');
            })
            .catch(error => dispatch(bandErrorActionCreator(error)));
    }
}

export const updateBandDataActionCreator = (data) => {
    return (dispatch, getState) => {
        dispatch(startUpdatingDataActionCreator());
        const token = getState().auth.idToken;
        const firebaseKey = getState().band.key;

        let queryParams = `?auth=${token}`;
        axios.patch(`https://gruzik-787b2.firebaseio.com/bands/${firebaseKey}/.json/` + queryParams, data)
            .then(response => {
                dispatch(setBandDataActionCreator(response.data));
                dispatch(finishUpdatingDataActionCreator());
            })
            .catch(error => {
                dispatch(bandErrorActionCreator(error))
                dispatch(finishUpdatingDataActionCreator());
            });
    }
}

