import axios from 'axios';
import { countBy, flatten } from 'lodash';

export const getTagsByWord = (word) => {
  return new Promise((resolve, reject) => {
    let queryParams = `?orderBy="tag"&startAt="${word}"`;
    axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE}/song-tag.json/${queryParams}`)
      .then(response => response.data)
      .then(songsTags => songsTags ? Object.values(songsTags) : null)
      .then(tags => tags.map(item => item.tag))
      .then(tags => tags.filter(tag => tag.slice(0, word.length) === word))
      .then(tags => new Set(tags))
      .then(tags => resolve(tags))
      .catch(error => reject(error))
  })
}

export const getTagsWithCountByWord = (word) => {
  return new Promise((resolve, reject) => {
    let queryParams = `?orderBy="tag"&startAt="${word}"`;
    axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE}/song-tag.json/${queryParams}`)
      .then(response => response.data)
      .then(songsTags => songsTags ? Object.values(songsTags) : null)
      .then(tags => tags.filter(item => item.tag.slice(0, word.length) === word))
      .then(tags => countBy(tags, 'tag'))
      .then(tagsUsedTimes => resolve(tagsUsedTimes))
      .catch(error => reject(error))
  })
}

export const getBandsByWord = (word) => {
  return new Promise((resolve, reject) => {
    let queryParams = `?orderBy="bandName"&startAt="${word}"`;
    axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE}/bands.json/${queryParams}`)
      .then(response => response.data)
      .then(bands => bands ? Object.values(bands) : null)
      .then(bands => bands.filter(band => band.bandName.slice(0, word.length) === word))
      .then(bands => resolve(bands))
      .catch(error => reject(error))
  })
}

export const getSongTags = (songName) => {
  return new Promise((resolve, reject) => {
    let queryParams = `?orderBy="songName"&equalTo="${songName}"`;
    axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE}/song-tag.json/${queryParams}`)
      .then(response => Object.values(response.data))
      .then(songsTags => songsTags.map(songTag => songTag.tag))
      .then(tags => resolve(tags))
      .catch(error => reject(error))
  })
}

export const getBandTags = (localId) => {
  return new Promise((resolve, reject) => {
    let queryParams = `?orderBy="localId"&equalTo="${localId}"`;
    axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE}/songs.json/${queryParams}`)
      .then(response => response.data)
      .then(songs => songs ? Object.values(songs) : null)
      .then(songs => songs.map(song => song.fileName))
      .then(songsNames => songsNames.map(songName => getSongTags(songName)))
      .then(tagQueries => Promise.all(tagQueries))
      .then(tags => flatten(tags))
      .then(tags => countBy(tags))
      .then(tags => resolve(tags))
      .catch(error => reject(error))
  })
}

export const getBandById = (localId) => {
  return new Promise((resolve, reject) => {
    let queryParams = `?orderBy="localId"&equalTo="${localId}"`;
    axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE}/bands.json/${queryParams}`)
      .then(response => response.data)
      .then(band => band ? Object.values(band)[0] : null)
      .then(band => resolve(band))
      .catch(error => reject(error))
  })
}

export const getBandBySongName = (fileName) => {
  return new Promise((resolve, reject) => {
    let queryParams = `?orderBy="fileName"&equalTo="${fileName}"`;
    axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE}/songs.json/${queryParams}`)
      .then(response => response.data)
      .then(song => song ? Object.values(song)[0] : null)
      .then(song => getBandById(song.localId))
      .then(band => resolve(band))
      .catch(error => reject(error))
  })
}

export const getTagInfo = (tag) => {
  return new Promise((resolve, reject) => {
    let queryParams = `?orderBy="tag"&equalTo="${tag}"`;
    axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE}/song-tag.json/${queryParams}`)
      .then(response => response.data)
      .then(songsTags => songsTags ? Object.values(songsTags) : null)
      .then(songsTags => songsTags.map(songTag => songTag.songName))      
      .then(songsNames => songsNames.map(songName => getBandBySongName(songName)))
      .then(songsQueries => Promise.all(songsQueries))
      .then(bands => countBy(bands, 'bandName'))
      .then(bands => resolve(bands))
      .catch(error => reject(error))
  })
}

