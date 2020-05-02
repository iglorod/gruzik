import * as actionTypes from '../actionTypes';
import firebase from '../../firebase';
import axios from 'axios';

export const addSongActionCreator = (song) => {
  return {
    type: actionTypes.ADD_SONG,
    song,
  }
}

export const finishSongsLoadingActionCreator = () => {
  return {
    type: actionTypes.FINISH_SONGS_LOADING,
  }
}

export const startCreatingSongActionCreator = () => {
  return {
    type: actionTypes.START_SONG_CREATION,
  }
}

export const finishCreatingSongActionCreator = () => {
  return {
    type: actionTypes.FINISH_SONG_CREATION,
  }
}

export const setLoadedPercentActionCreator = (percents) => {
  return {
    type: actionTypes.SET_LOAD_PERCENTS,
    percents,
  }
}

export const songsErrorActionCreator = (error) => {
  return {
    type: actionTypes.SONGS_ERROR,
    error,
  }
}

export const createSongInfoActionCreator = (songInfo) => {
  return (dispatch, getState) => {
    songInfo.localId = getState().auth.localId;

    axios.post(`https://gruzik-787b2.firebaseio.com/songs.json/?auth=` + getState().auth.idToken, songInfo)
      .then(() => {
        dispatch(addSongActionCreator(songInfo));
        dispatch(finishCreatingSongActionCreator());
      })
      .catch(error => {
        dispatch(songsErrorActionCreator(error));
        dispatch(finishCreatingSongActionCreator());
      })
  }
}

export const uploadSongActionCreator = (file, songInfo) => {
  return dispatch => {
    dispatch(startCreatingSongActionCreator());

    const fileName = new Date().getTime() + file.name;
    songInfo.fileName = fileName;

    const storeRef = firebase.storage().ref('songs/').child(fileName).put(file);

    storeRef.on('state_changed', function (snapshot) {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes).toFixed(2) * 100;
      dispatch(setLoadedPercentActionCreator(progress));
    })

    storeRef.then(() => {
      console.log('then')
      dispatch(createSongInfoActionCreator(songInfo))
    })
      .catch(error => {
        dispatch(songsErrorActionCreator(error))
        dispatch(finishCreatingSongActionCreator());
      })
  }
}

