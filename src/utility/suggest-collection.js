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

export const getRecentTagsFromLocalStorage = (userId) => {
  let tagsHistory = { ...JSON.parse(localStorage.getItem(userId)) };
  if (!tagsHistory) return;

  const sortFunc = (a, b) => b[1].time - a[1].time;

  let history = sortTags(tagsHistory, sortFunc);
  return cleanUpTags(history).slice(0, 12);
}

export const getPopularTagsFromLocalStorage = (userId) => {
  let tagsHistory = { ...JSON.parse(localStorage.getItem(userId)) };
  if (!tagsHistory) return;

  const sortFunc = (a, b) => b[1].count - a[1].count;

  return sortTags(tagsHistory, sortFunc).slice(0, 12);
}

