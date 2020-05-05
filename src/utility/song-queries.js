import axios from 'axios';

export const getSongsByName = (searchWord) => {
  return new Promise((resolve, reject) => {
    let queryParams = `?orderBy="name"&startAt="${searchWord}"`;
    axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE}/songs.json/${queryParams}`)
      .then(response => {
        if (!response.data) resolve();

        const recivedSongs = Object.values(response.data);
        const songs = recivedSongs.filter(song => song.name.slice(0, searchWord.length) === searchWord);
        resolve(songs.slice(0, 5));
      })
      .catch(error => reject(error))
  })
}

export const getSongBandName = (localId) => {
  return new Promise((resolve, reject) => {
    axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE}/bands.json?orderBy="localId"&equalTo="${localId}"`)
      .then(response => {
        if (!response.data) reject(new Error('Can\'t get song author name'))

        const band = Object.values(response.data)[0];
        resolve(band.bandName);
      })
      .catch(error => reject(error))
  })
}

export const getSongLikesCount = (fileName) => {
  return new Promise((resolve, reject) => {
    let queryParams = `?orderBy="fileName"&equalTo="${fileName}"`;
    axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE}/song_likes.json/${queryParams}`)
      .then((response) => {
        const likesCount = response.data
          ? Object.keys(response.data).length
          : 0;

        resolve(likesCount);
      })
      .catch(error => reject(error));
  })
}

export const sortSongsByBandName = (song1, song2) => {
  if (song1.bandName > song2.bandName) return 1; 
  if (song1.bandName === song2.bandName) return 0;
  return -1;
}

export const fetchSongs = (searchWord) => {
  let songsList = [];
  return new Promise((resolve, reject) => {
    getSongsByName(searchWord)
      .then(songs => {
        songsList = songs;
        return Promise.all(songs.map(song => getSongBandName(song.localId)))
      })
      .then(bandsNames => {
        return songsList.map((song, index) => {
          song.bandName = bandsNames[index];
          return song;
        })
      })
      .then(songs => Promise.all(songs.map(song => getSongLikesCount(song.fileName))))
      .then(likesCount => {
        return songsList.map((song, index) => {
          song.likesCount = likesCount[index];
          return song;
        })
      })
      .then(songs => songs.sort(sortSongsByBandName))
      .then(songs => resolve(songs))
      .catch(error => reject(error))
  })
}
