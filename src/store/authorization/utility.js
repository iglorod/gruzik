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

