import firebase from '../../firebase';

export const storeBandImage = (file) => {
  const fileName = new Date().getTime() + file.name;
  return firebase.storage().ref('band-images/').child(fileName).put(file);
}

export const removeBandImage = (imageName) => {
  return () => {
    if (imageName === 'no-image.jpg') return;

    firebase.storage().ref(`band-images/${imageName}`).delete()
      .catch(error => console.log(error.message));
  }
}
