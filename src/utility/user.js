import axios from 'axios';

export const createSrc = (name, folder) => (
  'https://firebasestorage.googleapis.com/v0/b/'
  + `${process.env.REACT_APP_FIREBASE_KEY_STORE_BUCKET}/o/${folder}%2F`
  + `${name}?alt=media`
)

export const fetchBandData = (localId) => {
  return new Promise((resolve, reject) => {
    let queryParams = `?orderBy="localId"&equalTo="${localId}"&limitToFirst=1`;
    axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE}/bands.json/${queryParams}`)
      .then(response => {
        if (response.data) {
          resolve(Object.values(response.data)[0]);
        }
      })
      .catch(error => reject(error))
  })
}
