// Import the functions you need from the SDKs you need

import * as firebase from 'firebase/app';
import { Auth, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithPopup } from 'firebase/auth';
import { md5 } from 'sbg-utility/dist/utils/hash';
import { GOOGLE_SCOPES, getLocalCredential } from './constants';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyAgqIgI7JIDqnB7mI05Q1E1CzgWqwnzX5M',
  authDomain: 'android-008.firebaseapp.com',
  projectId: 'android-008',
  storageBucket: 'android-008.appspot.com',
  messagingSenderId: '435643304043',
  appId: '1:435643304043:web:e712ff091810ace72bc92e',
  measurementId: 'G-EJKJMM8ZQB',
};

// Initialize Firebase

const app = !firebase.getApps().length ? firebase.initializeApp(firebaseConfig) : firebase.getApp();

// Initialize Firebase Authentication and get a reference to the service
let auth: Auth;

export function firebaseRegister(email: string, password: null | string = null) {
  if (!auth) auth = getAuth(app);
  createUserWithEmailAndPassword(auth, email, password || md5(email).substring(0, 8))
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      console.log('firebase signup success', user);
    })
    .catch(error => {
      console.error('firebase signup failed', error);
    });
}

export function firebaseAuthGoogle() {
  const provider = new GoogleAuthProvider();
  GOOGLE_SCOPES.forEach(provider.addScope);
  if (String(getLocalCredential()?.credential?.email).includes('@')) {
    // login existing user
    provider.setCustomParameters({
      login_hint: getLocalCredential().credential.email,
    });
    auth = getAuth(app);
  } else {
    if (!auth) auth = getAuth(app);
    signInWithPopup(auth, provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        console.log({ token, user });
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log({ errorCode, errorMessage, email, credential });
      });
  }
}
