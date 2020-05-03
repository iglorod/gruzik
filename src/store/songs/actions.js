import * as actionTypes from '../actionTypes';
import firebase from '../../firebase';
import axios from 'axios';
import { genres } from '../../utility/music-genres';

import { getAudioDuration, bandNamesCachingDecorator } from './utility';

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

export const addSongsToListActionCreator = (songs) => {
  return {
    type: actionTypes.ADD_SONGS_TO_LIST,
    songs,
  }
}

export const unshiftSongToListActionCreator = (song) => {
  return {
    type: actionTypes.UNSHIFT_SONG_TO_LIST,
    song,
  }
}

export const clearSongListActionCreator = () => {
  return {
    type: actionTypes.CLEAR_SONGS_LIST,
  }
}

export const songsErrorActionCreator = (error) => {
  return {
    type: actionTypes.SONGS_ERROR,
    error,
  }
}

export const startPlayMusicActionCreator = (fileName) => {
  return {
    type: actionTypes.SELECT_SONG,
    fileName,
  }
}

export const playNextSongActionCreator = () => {
  return {
    type: actionTypes.SELECT_NEXT_SONG,
  }
}

export const playPrevSongActionCreator = () => {
  return {
    type: actionTypes.SELECT_PREV_SONG,
  }
}

export const playSongActionCreator = () => {
  return {
    type: actionTypes.PLAY_SONG,
  }
}

export const pauseSongActionCreator = () => {
  return {
    type: actionTypes.PAUSE_SONG,
  }
}

export const songReadyToPlayActionCreator = () => {
  return {
    type: actionTypes.SELECTED_SONG_READY_TO_PLAY,
  }
}

export const changeSelectedGenreActionCreator = (key) => {
  console.log('Selected', key)
  return {
    type: actionTypes.CHANGE_SELECTED_GENRE,
    key,
  }
}

export const createSongInfoActionCreator = (songInfo) => {
  return (dispatch, getState) => {
    songInfo.localId = getState().auth.localId;

    axios.post(`${process.env.REACT_APP_FIREBASE_DATABASE}/songs.json/?auth=${getState().auth.idToken}`, songInfo)
      .then(() => {
        songInfo.bandName = getState().band.bandName;
        dispatch(unshiftSongToListActionCreator(songInfo));
        dispatch(finishCreatingSongActionCreator());
      })
      .catch(error => {
        dispatch(songsErrorActionCreator(error));
        dispatch(finishCreatingSongActionCreator());
      })
  }
}

export const uploadSongActionCreator = (song, songPicture, songInfo) => {
  return async dispatch => {
    dispatch(startCreatingSongActionCreator());
    songInfo.fileName = new Date().getTime() + song.name;
    songInfo.duration = (await getAudioDuration(song) / 60).toFixed(2);

    const storeRef = firebase.storage().ref('songs/').child(songInfo.fileName).put(song);

    const totalUploadSize = song.size + songPicture.size;
    storeRef.on('state_changed', function (snapshot) {
      const progress = (snapshot.bytesTransferred / totalUploadSize).toFixed(2) * 100;
      dispatch(setLoadedPercentActionCreator(progress));
    })

    storeRef
      .then(() => {
        dispatch(uploadSongPicture(songPicture, songInfo, totalUploadSize))
      })
      .catch(error => {
        dispatch(songsErrorActionCreator(error))
        dispatch(finishCreatingSongActionCreator());
      })
  }
}

export const uploadSongPicture = (songPicture, songInfo, totalUploadSize) => {
  return dispatch => {
    songInfo.imageName = new Date().getTime() + songPicture.name;

    const storeRef = firebase.storage().ref('pictures-of-songs/').child(songInfo.imageName).put(songPicture);

    const alreadyUploadSize = totalUploadSize - songPicture.size;
    storeRef.on('state_changed', function (snapshot) {
      const progress = ((alreadyUploadSize + snapshot.bytesTransferred) / totalUploadSize).toFixed(2) * 100;
      dispatch(setLoadedPercentActionCreator(progress));
    })

    storeRef
      .then(() => {
        dispatch(createSongInfoActionCreator(songInfo))
      })
      .catch(error => {
        dispatch(songsErrorActionCreator(error))
        dispatch(finishCreatingSongActionCreator());
      })
  }
}

export const fetchSongsBandNameActionCreator = (songs) => {
  return async dispatch => {
    const src = `${process.env.REACT_APP_FIREBASE_DATABASE}/bands.json?orderBy="localId"&equalTo=`;
    const getBandName = bandNamesCachingDecorator(src);

    for (let song of songs) {
      await getBandName(song.localId)
    }

    const namesOfBands = await getBandName();
    for (let song of songs) {
      song.bandName = namesOfBands.get(song.localId);
    }

    dispatch(addSongsToListActionCreator(songs));
  }
}

export const fetchBandSongsActionCreator = (bandId) => {
  return dispatch => {
    let queryParams = `?orderBy="localId"&equalTo="${bandId}"&limitToLast=5`;
    axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE}/songs.json/${queryParams}`)
      .then((response) => {
        response.data
          ? dispatch(fetchSongsBandNameActionCreator(Object.values(response.data).reverse()))
          : dispatch(finishSongsLoadingActionCreator());
      })
      .catch(error => {
        dispatch(songsErrorActionCreator(error));
      })
  }
}

export const filterByGenreActionCreator = (key) => {
  return dispatch => {    
    const selectedGenre = genres[key];
    console.log('fetch', key)
    let queryParams = `?orderBy="genre"&equalTo="${selectedGenre}"&limitToLast=5`;
    axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE}/songs.json/${queryParams}`)
      .then((response) => {
        response.data
          ? dispatch(fetchSongsBandNameActionCreator(Object.values(response.data).reverse()))
          : dispatch(finishSongsLoadingActionCreator());
      })
      .catch(error => {
        dispatch(songsErrorActionCreator(error));
      })
  }
}
