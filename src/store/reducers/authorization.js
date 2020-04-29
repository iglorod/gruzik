import * as actionTypes from '../actions/actionTypes';
import { message } from 'antd';

const initialState = {
    localId: null,
    email: null,
    isBand: false,
    idToken: null,
    refreshToken: null,
    expiresIn: null,
    refreshTimerId: null,
    loading: true,
    authStart: false,
    errorMessage: null,
}

const saveToLocalStorage = (data) => {
    if (data.expiresIn) data.expiresIn = Math.floor((new Date().getTime() / 1000)) + +data.expiresIn;

    for (let key in data) {
        localStorage.setItem(key, data[key]);
    }
}

const getDataFromLocalStorage = () => {
    const userData = {};
    for (let [key, value] of Object.entries(localStorage)) {
        userData[key] = value;
    }

    return userData;
}

const clearLocalStorage = () => {
    localStorage.clear();
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
                authStart: true,
                errorMessage: null,
            }
        }

        case actionTypes.AUTH_ERROR: {
            let errorMessage = 'Service is unavailable. Please, try later...';
            if (action.error.response) errorMessage = action.error.response.data.error.message;

            message.error(errorMessage);
            return {
                ...state,
                errorMessage,
                authStart: false,
            }
        }
        case actionTypes.LOGIN: {
            clearLocalStorage();
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
                idToken: action.userData.idToken,
                refreshToken: action.userData.refreshToken,
                expiresIn: expiresIn,
            }
        }

        case actionTypes.LOGIN_LOCALY: {
            return {
                ...state,
                ...getDataFromLocalStorage(),
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

        case actionTypes.LOGOUT: {
            clearLocalStorage();
            clearTimeout(state.refreshTimerId);
            return { ...initialState, loading: false }
        }

        default: return state;
    }
}

export default reducer;
