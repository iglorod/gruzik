import * as actionTypes from '../actionTypes';
import { message } from 'antd';
import { saveToLocalStorage, getDataFromLocalStorage, clearLocalStorage } from './utility';

const initialState = {
  localId: null,
  email: null,
  isBand: false,
  username: '',
  image: '',
  idToken: null,
  refreshToken: null,
  expiresIn: null,
  refreshTimerId: null,
  loading: true,
  submitting: false,
  errorMessage: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_LOADING: {
      return {
        ...state,
        errorMessage: null,
        loading: true,
      }
    }

    case actionTypes.FINISH_LOADING: {
      return {
        ...state,
        loading: false,
      }
    }

    case actionTypes.AUTH_START: {
      return {
        ...state,
        submitting: true,
        errorMessage: null,
      }
    }

    case actionTypes.AUTH_FINISH: {
      return {
        ...state,
        submitting: false,
      }
    }

    case actionTypes.AUTH_ERROR: {
      let errorMessage = 'Service is unavailable. Please, try later...';
      if (action.error.response) errorMessage = action.error.response.data.error.message;

      message.error(errorMessage);
      return {
        ...state,
        errorMessage,
        submitting: false,
      }
    }
    case actionTypes.LOGIN: {
      clearLocalStorage([...Object.keys(initialState)]);
      if (action.rememberMe) {
        saveToLocalStorage(action.userData);
      }

      const expiresIn = Math.floor((new Date().getTime() / 1000)) + +action.userData.expiresIn;

      return {
        ...initialState,
        loading: false,
        localId: action.userData.localId,
        email: action.userData.email,
        isBand: action.userData.isBand || false,
        username: action.userData.username || '',
        image: action.userData.image || '',
        idToken: action.userData.idToken,
        refreshToken: action.userData.refreshToken,
        expiresIn: expiresIn,
        submitting: false,
      }
    }

    case actionTypes.LOGIN_LOCALY: {
      return {
        ...state,
        loading: false,
        ...getDataFromLocalStorage([...Object.keys(initialState)]),
      }
    }

    case actionTypes.RESET_TIMEOUT_ID: {
      return {
        ...state,
        refreshTimerId: action.timerId,
      }
    }

    case actionTypes.SET_TOKEN: {
      if (localStorage.length > 1) {
        saveToLocalStorage(action.tokens);
      }

      return {
        ...state,
        idToken: action.tokens.idToken,
        refreshToken: action.tokens.refreshToken,
        expiresIn: action.tokens.expiresIn,
      }
    }

    case actionTypes.SET_USER_DATA: {
      message.success('Profile data was updated');
      saveToLocalStorage(action.data)
      return {
        ...state,
        ...action.data,
      }
    }

    case actionTypes.LOGOUT: {
      clearLocalStorage([...Object.keys(initialState)]);
      clearTimeout(state.refreshTimerId);
      return { ...initialState, loading: false }
    }

    default: return state;
  }
}

export default reducer;
