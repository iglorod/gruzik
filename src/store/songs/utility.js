import axios from 'axios';

export const bandNamesCachingDecorator = (src) => {
  const bandNames = new Map();

  return (localId) => {
    return new Promise((resolve, reject) => {
      if (!localId || bandNames.has(localId)) {
        return resolve(bandNames);
      }

      axios.get(src + `"${localId}"`)
        .then(response => {
          if (response.data) {
            const band = Object.values(response.data)[0];
            bandNames.set(localId, band.bandName);
          }

          resolve(bandNames);
        })
        .catch(error => reject(error))
    })
  }
}


export const getSongLikesCount = (song, localId) => {
  return new Promise((resolve, reject) => {
    let queryParams = `?orderBy="fileName"&equalTo="${song.fileName}"`;
    axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE}/song_likes.json/${queryParams}`)
      .then((response) => {
        const likesCount = response.data
          ? Object.keys(response.data).length
          : 0;

        const userLike = Object.entries(response.data).find(like => localId === like[1].localId);
        const userIsLikedSong = !!userLike;
        const userLikeId = userIsLikedSong ? userLike[0] : null;

        resolve({ likesCount, userIsLikedSong, userLikeId })
      })
      .catch(error => reject(error))
  })
}

export const getSongTags = (song) => {
  return new Promise((resolve, reject) => {
    let queryParams = `?orderBy="songName"&equalTo="${song.fileName}"`;
    axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE}/song-tag.json/${queryParams}`)
      .then((response) => {
        const tags = Object.values(response.data).map(songTag => songTag.tag);
        resolve(tags);
      })
      .catch(error => reject(error))
  })
}

export const getSong = (fileName) => {
  return new Promise((resolve, reject) => {
    let queryParams = `?orderBy="fileName"&equalTo="${fileName}"`;
    axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE}/songs.json/${queryParams}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => reject(error))
  })
}

export const getSongs = (data) => {
  return new Promise((resolve, reject) => {
    Promise.all(data.map(item => getSong(item.songName || item.fileName)))
      .then(songs => resolve(songs))
      .catch(error => reject(error))
  })
}

export const isSongExistInPlaylist = ({ playlistId, songName }) => {
  return new Promise((resolve, reject) => {
    let queryParams = `?orderBy="playlistId"&equalTo="${playlistId}"`;
    axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE}/playlists-songs.json/${queryParams}`)
      .then((response) => {
        if (!response.data) resolve(false);
        const playlistSongs = Object.values(response.data);
        const isSongExist = ~playlistSongs.findIndex(item => item.songName === songName);

        resolve(!!isSongExist);
      })
      .catch(error => reject(error))
  })
}

export const saveSongTag = (obj, token) => {
  return new Promise((resolve, reject) => {
    axios.post(`${process.env.REACT_APP_FIREBASE_DATABASE}/song-tag.json/?auth=${token}`, obj)
      .then(() => resolve())
      .catch(error => reject(error))
  })
}
