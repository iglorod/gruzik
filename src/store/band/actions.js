import * as actionTypes from '../actionTypes';
import axios from 'axios'
import firebase from '../../firebase';

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

export const fetchBandDataActionCreator = (localId) => {
  return dispatch => {
    let queryParams = `?orderBy="localId"&equalTo="${localId}"&limitToFirst=1`;
    axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE}/bands.json/${queryParams}`)
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
    axios.patch(`${process.env.REACT_APP_FIREBASE_DATABASE}/bands/${firebaseKey}/.json/${queryParams}`, data)
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

export const uploadImageActionCreator = (oldFileName, file) => {
  return dispatch => {
    dispatch(startUpdatingDataActionCreator());

    const fileName = new Date().getTime() + file.name;

    firebase.storage().ref('band-images/').child(fileName).put(file)
      .then(response => {
        const { name: image } = response.metadata;

        dispatch(removeImageActionCreator(oldFileName))
        dispatch(updateBandDataActionCreator({ image }))
      })
      .catch(error => {
        dispatch(bandErrorActionCreator(error))
        dispatch(finishUpdatingDataActionCreator());
      })
  }
}

export const removeImageActionCreator = (imageName) => {
  return dispatch => {
    firebase.storage().ref(`band-images/${imageName}`).delete()
      .catch(error => console.log(error.message));
  }
}

