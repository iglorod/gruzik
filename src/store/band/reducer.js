import * as actionTypes from '../actionTypes';
import { message } from 'antd';

const initialState = {
  key: null,
  bandName: null,
  localId: null,
  genres: null,
  description: null,
  image: 'no-image.jpg',
  loading: true,      //first fetching
  updating: false,    //updating band data
  error: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_BAND_DATA: {
      return {
        ...state,
        ...action.bandData,
      }
    }

    case actionTypes.FINISH_BAND_LOADING: {
      return {
        ...state,
        loading: false,
      }
    }

    case actionTypes.START_BAND_UPDATING: {
      return {
        ...state,
        updating: true,
      }
    }

    case actionTypes.FINISH_BAND_UPDATING: {
      return {
        ...state,
        updating: false,
      }
    }

    case actionTypes.BAND_ERROR: {
      message.error(action.error.message);

      return {
        ...state,
        error: true,
      }
    }

    case actionTypes.CLEAR_BAND_DATA: {
      return {
        ...initialState,
      }
    }

    default: return state;
  }
}

export default reducer;
