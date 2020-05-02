import { message } from 'antd';

export const validateImage = (maxSize = 2, image) => {  // maxSize(Mb)
  const isJpgOrPng = image.type === 'image/jpeg' || image.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }

  const isLt2M = image.size / 1024 / 1024 < maxSize;
  if (!isLt2M) {
    message.error(`Image must be smaller than ${maxSize}MB!`);
  }

  return isJpgOrPng && isLt2M;
}

export const validateSong = (song) => {
  const isMpeg = song.type === 'audio/mpeg';
  if (!isMpeg) {
    message.error('You can only upload MP3/PNG file!');
  }

  const isLt2M = song.size / 1024 / 1024 < 30;
  if (!isLt2M) {
    message.error(`Image must be smaller than 30MB!`);
  }

  return isMpeg && isLt2M;
}

