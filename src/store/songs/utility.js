import axios from 'axios';

export const getAudioDuration = (song) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContext.decodeAudioData(event.target.result, buffer => {
        resolve(buffer.duration);
      })
    }
    reader.onerror = (error) => reject(error);

    reader.readAsArrayBuffer(song);
  })
}

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

