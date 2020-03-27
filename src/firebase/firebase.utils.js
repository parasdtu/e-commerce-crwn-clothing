
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config={
  apiKey: "AIzaSyB9RAey8lf8XTz4F8cBFUu3ty87JzVQ4H8",
  authDomain: "crwn-db-7df9d.firebaseapp.com",
  databaseURL: "https://crwn-db-7df9d.firebaseio.com",
  projectId: "crwn-db-7df9d",
  storageBucket: "crwn-db-7df9d.appspot.com",
  messagingSenderId: "35857804262",
  appId: "1:35857804262:web:00567c0dc2471eee4e8427"
};


firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;