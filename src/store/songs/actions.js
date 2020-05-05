import * as actionTypes from '../actionTypes';
import firebase from '../../firebase';
import axios from 'axios';
import { message } from 'antd';
import { genres } from '../../utility/music-genres';

import {
  bandNamesCachingDecorator,
  getSongLikesCount,
  getSong,
  isSongExistInPlaylist,
  getSongs,
} from './utility';
import { getAudioDuration } from '../../utility/audio';

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
  return {
    type: actionTypes.CHANGE_SELECTED_GENRE,
    key,
  }
}

export const toggleSongLikesActionCreator = (fileName, key) => {
  return {
    type: actionTypes.TOGGLE_SONG_LIKES,
    fileName,
    key,
  }
}

export const startUpdatingActionCreator = (fileName) => {
  return {
    type: actionTypes.START_SONG_UPDATING,
    fileName,
  }
}

export const finishUpdatingActionCreator = (fileName) => {
  return {
    type: actionTypes.FINISH_SONG_UPDATING,
    fileName,
  }
}

export const setUpdatedDataToSongActionCreator = (fileName, data) => {
  return {
    type: actionTypes.SET_SONG_UPDATED_DATA,
    fileName,
    data,
  }
}

export const addPlaylistsActionCreator = (playlists) => {
  return {
    type: actionTypes.ADD_PLAYLISTS,
    playlists,
  }
}

export const shuffleSongsActionCreator = () => {
  return {
    type: actionTypes.SHUFFLE_SONGS,
  }
}

export const createSongInfoActionCreator = (songInfo) => {
  return (dispatch, getState) => {
    songInfo.localId = getState().auth.localId;
    songInfo.listened_times = 0;

    axios.post(`${process.env.REACT_APP_FIREBASE_DATABASE}/songs.json/?auth=${getState().auth.idToken}`, songInfo)
      .then(() => {
        songInfo.bandName = getState().band.bandName;
        songInfo.likesCount = 0;
        songInfo.userIsLikedSong = false;
        songInfo.userLikeId = null;

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
    songInfo.duration = await getAudioDuration(song);

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

    dispatch(getSongsLikesCountActionCreator(songs));
  }
}

export const fetchBandSongsActionCreator = (bandId) => {
  return dispatch => {
    let queryParams = `?orderBy="localId"&equalTo="${bandId}"`;
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
    let queryParams = `?orderBy="genre"&equalTo="${selectedGenre}"`;
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

export const getSongsLikesCountActionCreator = (songs) => {
  return (dispatch, getState) => {
    const localId = getState().auth.localId;
    Promise.all(songs.map(song => getSongLikesCount(song, localId)))
      .then(songsLikes => {
        songsLikes.forEach((songLikes, index) => {
          songs[index] = {
            ...songs[index],
            ...songLikes
          }
        })
        dispatch(addSongsToListActionCreator(songs));
      })
  }
}

export const addSongLikeActionCreator = (fileName, key) => {
  return (dispatch, getState) => {
    if (key) return;    // user already liked this song
    dispatch(startUpdatingActionCreator(fileName));

    const like = {
      fileName,
      localId: getState().auth.localId,
    }

    axios.post(`${process.env.REACT_APP_FIREBASE_DATABASE}/song_likes.json/?auth=${getState().auth.idToken}`, like)
      .then((response) => {
        dispatch(toggleSongLikesActionCreator(fileName, response.data.name));
        dispatch(finishUpdatingActionCreator(fileName));
      })
      .catch(error => {
        dispatch(songsErrorActionCreator(error));
        dispatch(finishCreatingSongActionCreator());
      })
  }
}

export const removeSongLikeActionCreator = (fileName, key) => {
  return (dispatch, getState) => {
    if (!key) return;     //user has not liked this song
    dispatch(startUpdatingActionCreator(fileName));

    axios.delete(`${process.env.REACT_APP_FIREBASE_DATABASE}/song_likes/${key}.json/?auth=${getState().auth.idToken}`)
      .then(() => {
        dispatch(toggleSongLikesActionCreator(fileName));
        dispatch(finishUpdatingActionCreator(fileName));
      })
      .catch(error => {
        dispatch(songsErrorActionCreator(error));
      })
  }
}

export const updateSongListenedTimesActionCreator = (fileName) => {
  return dispatch => {
    getSong(fileName)
      .then(response => {
        const song = Object.entries(response)[0];
        const data = {
          listened_times: song[1].listened_times + 1,
        }

        axios.patch(`${process.env.REACT_APP_FIREBASE_DATABASE}/songs/${song[0]}.json`, data)
          .then(() => {
            const updatedData = {
              listened_times: data.listened_times,
            }
            dispatch(setUpdatedDataToSongActionCreator(fileName, updatedData));
          })
          .catch(error => {
            dispatch(songsErrorActionCreator(error));
          })
      })
  }
}

export const createPlaylistActionCreator = (data) => {
  return (dispatch, getState) => {
    axios.post(`${process.env.REACT_APP_FIREBASE_DATABASE}/playlists.json/?auth=${getState().auth.idToken}`, data)
      .then(() => {
        dispatch(addPlaylistsActionCreator([data]));
        message.success('New playlist was created successfully');
      })
      .catch(error => {
        dispatch(songsErrorActionCreator(error));
        dispatch(finishCreatingSongActionCreator());
      })
  }
}

export const addSongToPlaylistActionCreator = (data) => {
  return (dispatch, getState) => {
    isSongExistInPlaylist(data)
      .then(isSongExist => {
        if (isSongExist) {
          message.warn('Song is alredy in this playlist');
          return;
        }

        axios.post(`${process.env.REACT_APP_FIREBASE_DATABASE}/playlists-songs.json/?auth=${getState().auth.idToken}`, data)
          .then(() => message.success('Song was added to playlist'))
          .catch(error => {
            dispatch(songsErrorActionCreator(error));
            dispatch(finishCreatingSongActionCreator());
          })
      })
  }
}

export const fetchPlaylistsActionCreator = (userId) => {
  return dispatch => {
    let queryParams = `?orderBy="userId"&equalTo="${userId}"`;
    axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE}/playlists.json/${queryParams}`)
      .then((response) => {
        const playlists = Object.values(response.data);
        dispatch(addPlaylistsActionCreator(playlists));
      })
      .catch(error => {
        dispatch(songsErrorActionCreator(error));
      })
  }
}

export const fetchPlaylistRecordsActionCreator = (playlistId) => {
  return dispatch => {
    let queryParams = `?orderBy="playlistId"&equalTo="${playlistId}"`;
    axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE}/playlists-songs.json/${queryParams}`)
      .then(response => {
        if (response.data) return Object.values(response.data).reverse();
        else dispatch(finishSongsLoadingActionCreator())
      })
      .then(records => getSongs(records))
      .then(songsItems => songsItems.map(songItem => songItem[Object.keys(songItem)[0]]))
      .then(songs => dispatch(fetchSongsBandNameActionCreator(songs)))
      .catch(error => dispatch(songsErrorActionCreator(error)))
  }
}
