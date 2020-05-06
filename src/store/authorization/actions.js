import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const startLoadingActionCreator = () => {
  return {
    type: actionTypes.START_LOADING,
  }
}

export const finishLoadingActionCreator = () => {
  return {
    type: actionTypes.FINISH_LOADING,
  }
}

export const loginActionCreator = (userData, rememberMe = false) => {
  return {
    type: actionTypes.LOGIN,
    userData,
    rememberMe,
  }
}

export const loginByLocalDataActionCreator = () => {
  return {
    type: actionTypes.LOGIN_LOCALY,
  }
}

export const authStartActionCreator = () => {
  return {
    type: actionTypes.AUTH_START,
  }
}

export const authErrorActionCreator = (error) => {
  return {
    type: actionTypes.AUTH_ERROR,
    error,
  }
}

export const setTimeoutIdActionCreator = (timerId) => {
  return {
    type: actionTypes.RESET_TIMEOUT_ID,
    id: timerId,
  }
}

export const setNewTokenActionCreator = (tokens) => {
  return {
    type: actionTypes.SET_TOKEN,
    tokens,
  }
}

export const logoutActionCreator = () => {
  return {
    type: actionTypes.LOGOUT,
  }
}

//middleware
export const resetTokenTimer = () => { //set token auto-refreshing
  return (dispatch, getState) => {
    clearTimeout(getState().auth.refreshTimerId);

    let delay = (getState().auth.expiresIn - Math.floor((new Date().getTime() / 1000))) * 1000 - 30 * 1000;

    if (delay < 0) delay = 0;

    const timerId = setTimeout(
      () => {
        const refreshData = {
          grant_type: 'refresh_token',
          refresh_token: getState().auth.refreshToken
        };
        try {
          dispatch(refreshTokenActionCreator(refreshData));
        } catch (error) {
          console.log(error)
        }
      }, delay
    );
    dispatch(setTimeoutIdActionCreator(timerId));
  }
}

export const postBandDataActionCreator = (createdUser, newUser) => {
  return dispatch => {
    if (newUser.bandName) {
      const band = {
        localId: createdUser.localId,
        bandName: newUser.bandName,
        genres: newUser.genres,
        description: 'No description yet',
      }

      axios.post(`${process.env.REACT_APP_FIREBASE_DATABASE}/bands.json/?auth=${createdUser.idToken}`, band)
        .then(() => {
          createdUser.isBand = true;
          dispatch(loginActionCreator(createdUser))
          dispatch(resetTokenTimer());
        })
        .catch(error => dispatch(authErrorActionCreator(error)))

    } else {
      dispatch(loginActionCreator(createdUser))
      dispatch(resetTokenTimer());
    }
  }
}

export const setUserTypeActionCreator = (user, rememberMe) => { //band or regular user
  return dispatch => {
    let queryParams = `?orderBy="localId"&equalTo="${user.localId}"&limitToFirst=1`;
    axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE}/bands.json/${queryParams}`)
      .then(response => {
        if (response.data) {
          user.isBand = true;
        }

        dispatch(loginActionCreator(user, rememberMe))
        dispatch(resetTokenTimer());
      })
      .catch(error => console.log(error));
  }
}

export const signUpActionCreator = (newUser) => {
  return dispatch => {
    dispatch(authStartActionCreator());

    const authData = {
      email: newUser.email,
      password: newUser.password,
      returnSecureToken: true
    }

    axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`, authData)
      .then(response => {
        dispatch(postBandDataActionCreator(response.data, newUser));
      })
      .catch(error => dispatch(authErrorActionCreator(error)))
  }
}

export const signInActionCreator = (userData, rememberMe) => {
  return dispatch => {
    dispatch(authStartActionCreator());

    const authData = {
      email: userData.email,
      password: userData.password,
      returnSecureToken: true
    }
    axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`, authData)
      .then(response => {
        dispatch(setUserTypeActionCreator(response.data, rememberMe));
      })
      .catch(error => dispatch(authErrorActionCreator(error)))
  }
}

export const signInLocallyActionCreator = () => {
  return (dispatch) => {
    if (localStorage.getItem('idToken')) {
      dispatch(loginByLocalDataActionCreator());
      dispatch(resetTokenTimer());
    }

    dispatch(finishLoadingActionCreator());
  }
}

export const refreshTokenActionCreator = (token) => {
  return dispatch => {
    axios.post(`https://securetoken.googleapis.com/v1/token?key=${process.env.REACT_APP_FIREBASE_KEY}`, token)
      .then(response => {
        const newTokenData = {
          idToken: response.data.id_token,
          refreshToken: response.data.refresh_token,
          expiresIn: +response.data.expires_in,
        }
        dispatch(setNewTokenActionCreator(newTokenData)); //refreshing token
        dispatch(resetTokenTimer());
      })
      .catch(err => {
        dispatch(authErrorActionCreator(err));
        dispatch(logoutActionCreator());
      });
  }
}

