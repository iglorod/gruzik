import * as actionTypes from '../actionTypes';
import { message } from 'antd';

const initialState = {
  songs: [],
  genre: 0,
  playSong: null,
  playNow: false,
  percents: 0,
  loading: true,
  creating: false,
  updating: [],                   //array of updating songs
  selectedSongCanPlay: false,     //is selected song enough loaded to start playing
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

    case actionTypes.START_SONG_UPDATING: {
      return {
        ...state,
        updating: [...state.updating, action.fileName]
      }
    }

    case actionTypes.FINISH_SONG_UPDATING: {
      return {
        ...state,
        updating: state.updating.filter(songName => songName !== action.fileName),
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

    case actionTypes.CHANGE_SELECTED_GENRE: {
      return {
        ...state,
        genre: action.key,
      }
    }

    case actionTypes.TOGGLE_SONG_LIKES: {
      const stateSongsClone = [...state.songs];
      const songIndex = stateSongsClone.findIndex(song => song.fileName === action.fileName);
      let song = stateSongsClone[songIndex];

      const newData = {
        userIsLikedSong: false,
        userLikeId: null,
        likesCount: song.likesCount - 1,
      }
      if (action.key) {
        newData.userIsLikedSong = true;
        newData.userLikeId = action.key;
        newData.likesCount = song.likesCount + 1;
      }

      stateSongsClone[songIndex] = { ...song, ...newData };
      return {
        ...state,
        songs: [
          ...stateSongsClone,
        ]
      }
    }

    case actionTypes.SET_SONG_UPDATED_DATA: {
      const stateSongsClone = [...state.songs];
      const songIndex = stateSongsClone.findIndex(song => song.fileName === action.fileName);
      stateSongsClone[songIndex] = {
        ...stateSongsClone[songIndex],
        ...action.data,
      };

      return {
        ...state,
        songs: [
          ...stateSongsClone,
        ]
      }
    }

    case actionTypes.CLEAR_SONGS_LIST: {
      return {
        ...initialState,
        playSong: state.playSong,
        playNow: state.playNow,
        genre: state.genre,
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
