import * as actionTypes from '../actionTypes';
import { message } from 'antd';

const initialState = {
  songs: [],
  playSong: null,
  playNow: false,
  percents: 0,
  loading: true,
  creating: false,
  selectedSongCanPlay: false,    //is selected song enough loaded to start playing
  error: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_SONG_CREATION: {
      return {
        ...state,
        creating: true,
        error: false,
      }
    }

    case actionTypes.FINISH_SONG_CREATION: {
      return {
        ...state,
        creating: false,
        percents: 0,
      }
    }

    case actionTypes.FINISH_SONGS_LOADING: {
      return {
        ...state,
        loading: false,
      }
    }

    case actionTypes.SET_LOAD_PERCENTS: {
      return {
        ...state,
        percents: action.percents,
      }
    }

    case actionTypes.ADD_SONGS_TO_LIST: {
      return {
        ...state,
        songs: [
          ...state.songs,
          ...action.songs,
        ],
        loading: false,
      }
    }

    case actionTypes.UNSHIFT_SONG_TO_LIST: {
      return {
        ...state,
        songs: [
          action.song,
          ...state.songs,
        ],
      }
    }

    case actionTypes.SELECT_SONG: {
      if (state.playSong && state.playSong.fileName === action.fileName) {
        return {
          ...state,
          playNow: !state.playNow,
        }
      }

      return {
        ...state,
        playSong: { ...state.songs.find(song => song.fileName === action.fileName) },
        playNow: true,
        selectedSongCanPlay: false,
      }
    }

    case actionTypes.SELECT_NEXT_SONG: {
      let currentPlaySongIndex = state.songs.findIndex(song => song.fileName === state.playSong.fileName);

      if (++currentPlaySongIndex === state.songs.length) currentPlaySongIndex = 0;
      return {
        ...state,
        playSong: { ...state.songs[currentPlaySongIndex] },
        playNow: true,
        selectedSongCanPlay: false,
      }
    }

    case actionTypes.SELECT_PREV_SONG: {
      let currentPlaySongIndex = state.songs.findIndex(song => song.fileName === state.playSong.fileName);

      if (--currentPlaySongIndex === -1) currentPlaySongIndex = state.songs.length - 1;
      return {
        ...state,
        playSong: { ...state.songs[currentPlaySongIndex] },
        playNow: true,
        selectedSongCanPlay: false,
      }
    }

    case actionTypes.SELECTED_SONG_READY_TO_PLAY: {
      return {
        ...state,
        selectedSongCanPlay: true,
      }
    }

    case actionTypes.PLAY_SONG: {
      return {
        ...state,
        playNow: true,
      }
    }

    case actionTypes.PAUSE_SONG: {
      return {
        ...state,
        playNow: false,
      }
    }

    case actionTypes.CLEAR_SONGS_LIST: {
      return {
        playSong: state.playSong,
        ...initialState,
      }
    }

    case actionTypes.SONGS_ERROR: {
      message.error(action.error.message);

      return {
        ...state,
        error: true,
      }
    }

    default: return state;
  }
}

export default reducer;
