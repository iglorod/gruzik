import axios from 'axios';

export const saveSongTagsToLocalStorage = (tags, userId) => {
  let tagsHistory = JSON.parse(localStorage.getItem(userId));
  if (!tagsHistory) tagsHistory = {};

  for (let tag of tags) {
    tagsHistory[tag] = {
      count: tagsHistory[tag] ? tagsHistory[tag].count + 1 : 1,
      time: new Date().getTime(),
    }
  }

  localStorage.setItem(userId, JSON.stringify(tagsHistory));
}

export const sortTags = (tagsHistory, sortFunc) => {
  const history = [];
  for (let [tag, data] of Object.entries(tagsHistory)) {
    history.push([tag, data]);
  }

  return history.sort(sortFunc);
}

const splitTagsByTime = (history) => {
  const tagsSplitByTime = [];

  while (history.length > 0) {
    const tagsWithEqualTime = [];

    for (let [tag, data] of history) {
      if (tagsWithEqualTime.length === 0) tagsWithEqualTime.push([tag, data]);
      else if (data.time === tagsWithEqualTime[0][1].time) tagsWithEqualTime.push([tag, data]);
      else break;
    }

    tagsSplitByTime.push(tagsWithEqualTime);
    history.splice(0, tagsWithEqualTime.length);
  }

  return tagsSplitByTime;
}

export const cleanUpTags = (history) => {
  const splitedTags = splitTagsByTime(history);

  const searchTags = [];
  for (let tags of splitedTags) {
    tags.sort((a, b) => b[1].count - a[1].count);
    searchTags.push(...tags.slice(0, 3));
  }

  return searchTags;
}

export const getTagNames = (tags) => {
  return tags.map(tag => tag[0]);
}

export const getRecentTagsFromLocalStorage = (userId) => {
  let tagsHistory = { ...JSON.parse(localStorage.getItem(userId)) };
  if (!tagsHistory) return;

  const sortFunc = (a, b) => b[1].time - a[1].time;

  let history = sortTags(tagsHistory, sortFunc);
  const tags = cleanUpTags(history).slice(0, 12);
  return getTagNames(tags);
}

export const getOftenTagsFromLocalStorage = (userId) => {
  let tagsHistory = { ...JSON.parse(localStorage.getItem(userId)) };
  if (!tagsHistory) return;

  const sortFunc = (a, b) => b[1].count - a[1].count;

  const tags = sortTags(tagsHistory, sortFunc).slice(0, 12);
  return getTagNames(tags);
}

export const fetchAdminCollections = () => {
  return new Promise((resolve, reject) => {
    axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE}/admin-collections.json/`)
      .then(response => response.data)
      .then(collections => collections ? Object.values(collections) : null)
      .then(collections => collections.sort((a, b) => a.position - b.position))
      .then(collections => resolve(collections))
      .catch(error => reject(error))
  })
}
