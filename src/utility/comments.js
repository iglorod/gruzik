import axios from 'axios';
import moment from 'moment';
import { createSrc } from '../utility/user';

export const addComment = (commentData, token) => {
  return new Promise((resolve, reject) => {
    const datetime = new Date().getTime();
    commentData.datetime = datetime;

    axios.post(`${process.env.REACT_APP_FIREBASE_DATABASE}/song-comment.json/?auth=${token}`, commentData)
      .then(() => resolve())
      .catch(error => reject(error))
  })
}

export const fetchComments = (songName) => {
  return new Promise((resolve, reject) => {
    let queryParams = `?orderBy="songName"&equalTo="${songName}"`;
    axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE}/song-comment.json/${queryParams}`)
      .then(response => {
        if (Object.keys(response.data).length === 0) resolve([]);

        const fetchCommentOwner = commentsOwnersCachingDecorator();
        const comments = Object.values(response.data);

        Promise.all(comments.map(comment => fetchCommentOwner(comment.localId)))
          .then(owners => comments.map((comment, index) => ({ ...comment, ...owners[index] })))
          .then(comments => comments.sort((a, b) => b.datetime - a.datetime))
          .then(comments => comments.map(comment => {
            comment.datetime = moment(comment.datetime).fromNow()
            
            delete comment.localId;
            delete comment.songName;
            return comment;
          }))
          .then(comments => resolve(comments))
      })
      .catch(error => reject(error))
  })
}

export const commentsOwnersCachingDecorator = () => {
  const users = new Map();

  return (localId) => {
    return new Promise((resolve, reject) => {
      if (users.has(localId)) resolve(users.get(localId));

      let queryParams = `?orderBy="localId"&equalTo="${localId}"`;
      axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE}/users.json/${queryParams}`)             //fetching user
        .then(response => {
          if (Object.keys(response.data).length > 0) {
            let { username: author, image: avatar = 'profile.png' } = Object.values(response.data)[0];
            avatar = createSrc(avatar, 'user-images');

            users.set(localId, { author, avatar });
            resolve({ author, avatar });
          }
          return axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE}/bands.json/${queryParams}`)  //fetching band
        })
        .then(response => {
          let { bandName: author, image: avatar = 'no-image.jpg' } = Object.values(response.data)[0];
          avatar = createSrc(avatar, 'band-images');

          users.set(localId, { author, avatar });
          resolve({ author, avatar });
        })
        .catch(error => reject(error))
    })
  }
}
