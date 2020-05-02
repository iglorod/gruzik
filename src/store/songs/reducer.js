import * as actionTypes from '../actionTypes';
import { message } from 'antd';

const initialState = {
  songs: [],
  loading: true,
  percents: 0,
  crating: false,
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
