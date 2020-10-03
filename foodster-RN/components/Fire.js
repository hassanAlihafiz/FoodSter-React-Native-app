import firebaseConfig from './Firebase';
import firebase from 'firebase';

class Fire {
  constructor() {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
  }

  AddPost = async ({ text, localUrl }) => {
    const remoteUrl = await this.uploadPhoto(localUrl);

    return new Promise((res, reject) => {
      this.firestore
        .collection('posts')
        .add({
          text,
          uid: this.uid,
          timestamp: this.timestamp,
          image: remoteUrl,
        })
        .then((ref) => {
          res(ref);
          console.log(ref);
        })
        .catch((error) => {
          reject(error);
          console(error);
        });
    });
  };

  uploadPhoto = async (url) => {
    const path = 'photos' + '/' + this.uid + '/' + Date.now() + '.jpg';
    return new Promise(async (res, reject) => {
      const response = await fetch(url);
      const file = await response.blob();
      let upload = firebase.storage().ref(path).put(file);

      upload.on(
        'state_change',
        (snapshot) => {},
        (err) => {
          reject(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
        }
      );
    });
  };
  get firestore() {
    return firebase.firestore();
  }
  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
  get timestamp() {
    return Date.now();
  }
}
Fire.shared = new Fire();
export default Fire;
