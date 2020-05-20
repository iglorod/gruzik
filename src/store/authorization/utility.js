import firebase from '../../firebase';
import axios from 'axios';

export const saveToLocalStorage = (data) => {
  if (data.expiresIn) {
    const currentDateTimestamp = Math.floor(new Date().getTime() / 1000);
    data.expiresIn = currentDateTimestamp + (+data.expiresIn);
  }

  for (let key in data) {
    localStorage.setItem(key, data[key]);
  }
}

export const getDataFromLocalStorage = (keys) => {
  const userData = {};
  for (let [key, value] of Object.entries(localStorage)) {
    if (keys.includes(key)) {
      userData[key] = value;
    }
  }

  return userData;
}

export const clearLocalStorage = (keys) => {
  for (let key of keys) {
    localStorage.removeItem(key);
  }
}

export const storeUserImage = (file) => {
  const fileName = new Date().getTime() + file.name;
  return firebase.storage().ref('user-images/').child(fileName).put(file);
}

export const removeUserImage = (imageName) => {
  return () => {
    if (!imageName) return;

    firebase.storage().ref(`user-images/${imageName}`).delete()
      .catch(error => console.log(error.message));
  }
}

export const getUserKey = (localId) => {
  return new Promise((resolve, reject) => {
    let queryParams = `?orderBy="localId"&equalTo="${localId}"`;
    axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE}/users.json/${queryParams}`)
      .then(response => Object.keys(response.data)[0])
      .then(key => resolve(key))
      .catch(error => reject(error))
  })
}

export const getUserData = (localId, isAdmin) => {
  return new Promise((resolve, reject) => {
    let queryParams = `?orderBy="localId"&equalTo="${localId}"`;
    axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE}/users.json/${queryParams}`)
      .then(response => Object.values(response.data)[0])
      .then(data => isAdmin ? { ...data, isAdmin } : data)
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
}

export const updateUserData = (data, key, token) => {
  return new Promise((resolve, reject) => {
    let queryParams = `?auth=${token}`;
    axios.patch(`${process.env.REACT_APP_FIREBASE_DATABASE}/users/${key}/.json/${queryParams}`, data)
      .then(() => resolve())
      .catch(error => reject(error));
  })
}

export const userIsAdmin = (localId) => {
  return new Promise((resolve, reject) => {
    let queryParams = `?orderBy="localId"&equalTo="${localId}"`;
    axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE}/admins.json/${queryParams}`)
      .then(response => Object.keys(response.data).length > 0)
      .then(isAdmin => resolve(isAdmin))
      .catch(error => reject(error))
  })
}

