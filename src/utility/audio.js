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

export const getDurationInHumanTime = (duration) => {
  duration = (duration / 60).toFixed(2);

  if (duration > 60) {
    let [hours, restMinutes] = (duration / 60).toFixed(2).toString().split('.');
    let [minutes, restSeconds] = (60 * restMinutes / 100).toString().split('.');
    const seconds = Math.round(60 * restSeconds / 100).toString();

    return humanTime(seconds, minutes, hours);
  }

  const [minutes, rest] = duration.toString().split('.');
  const seconds = Math.round(60 * rest / 100).toString();
  return humanTime(seconds, minutes);
}

export const humanTime = (...time) => {
  const [seconds, minutes, hours] = time.map((item, index) => index < 2 && item.length < 2 ? `0${item}` : item);
  let humanTime = hours ? `${hours}:` : '';
  humanTime += minutes ? `${minutes}:` : '00';
  humanTime += seconds ? `${seconds}` : '00';
  return humanTime;
}
