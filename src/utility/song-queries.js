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

export const fetchSongBandName = (song) => {
  return new Promise((resolve, reject) => {
    axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE}/bands.json?orderBy="localId"&equalTo="${song.localId}"`)
      .then(response => {
        if (!response.data) reject(new Error('Can\'t get song author name'))

        const band = Object.values(response.data)[0];
        song.bandName = band.bandName;

        resolve(song);
      })
      .catch(error => reject(error))
  })
}

export const fetchSongLikesCount = (song) => {
  return new Promise((resolve, reject) => {
    let queryParams = `?orderBy="fileName"&equalTo="${song.fileName}"`;
    axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE}/song_likes.json/${queryParams}`)
      .then((response) => {
        const likesCount = response.data
          ? Object.keys(response.data).length
          : 0;

        song.likesCount = likesCount;
        resolve(song);
      })
      .catch(error => reject(error));
  })
}

export const fetchSongTags = (song) => {
  return new Promise((resolve, reject) => {
    let queryParams = `?orderBy="songName"&equalTo="${song.fileName}"`;
    axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE}/song-tag.json/${queryParams}`)
      .then((response) => {
        song.tags = Object.values(response.data).map(songTag => songTag.tag);
        resolve(song);
      })
      .catch(error => reject(error))
  })
}

export const sortSongsByBandName = (song1, song2) => {
  if (song1.bandName > song2.bandName) return 1;
  if (song1.bandName === song2.bandName) return 0;
  return -1;
}

export const fetchSongs = (searchWord) => {
  return new Promise((resolve, reject) => {
    getSongsByName(searchWord)
      .then(songs => Promise.all(songs.map(song => fetchSongBandName(song))))
      .then(songs => Promise.all(songs.map(song => fetchSongTags(song))))
      .then(songs => Promise.all(songs.map(song => fetchSongLikesCount(song))))
      .then(songs => songs.sort(sortSongsByBandName))
      .then(songs => resolve(songs))
      .catch(error => reject(error))
  })
}
