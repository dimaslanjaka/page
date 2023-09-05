// Import the functions you need from the SDKs you need

import Bluebird from 'bluebird';
import * as firebase from 'firebase/app';
import { Auth, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithPopup } from 'firebase/auth';
import { md5 } from '../utils/md5';
import { GOOGLE_SCOPES, getLocalCredential } from './constants';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export const firebaseConfig = {
  apiKey: 'AIzaSyAgqIgI7JIDqnB7mI05Q1E1CzgWqwnzX5M',
  authDomain: 'android-008.firebaseapp.com',
  projectId: 'android-008',
  storageBucket: 'android-008.appspot.com',
  messagingSenderId: '435643304043',
  appId: '1:435643304043:web:e712ff091810ace72bc92e',
  measurementId: 'G-EJKJMM8ZQB',
  //prjectKey: 'project-435643304043'
};

// Initialize Firebase

export const firebaseApp = !firebase.getApps().length ? firebase.initializeApp(firebaseConfig) : firebase.getApp();

// Initialize Firebase Authentication and get a reference to the service
let auth: Auth;

export function firebaseRegister(email: string, password: null | string = null) {
  if (!auth) auth = getAuth(firebaseApp);
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

/**
 * auth firebase using google
 * @param force force change account
 */
export function firebaseAuthGoogle(force = false) {
  return new Bluebird((resolve, reject) => {
    const provider = new GoogleAuthProvider();
    provider.addScope(GOOGLE_SCOPES.join(' '));
    const credential = getLocalCredential().credential;
    if (typeof credential !== 'string' && 'email' in credential) {
      if (credential.email && String(credential?.email).includes('@') && !force) {
        // login existing user
        provider.setCustomParameters({
          login_hint: credential.email,
        });
        auth = getAuth(firebaseApp);
      }
    }
    if (!auth) auth = getAuth(firebaseApp);

    signInWithPopup(auth, provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        //console.log({ token, user });

        resolve({ token, ...user, credential });
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        reject({ errorCode, errorMessage, email, credential });
      });
  });
}
