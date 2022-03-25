import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAzYWHNwNhSuLeIF7jOkki0hzj5txsV9B0',
  authDomain: 'hw-react-528bb.firebaseapp.com',
  projectId: 'hw-react-528bb',
  storageBucket: 'hw-react-528bb.appspot.com',
  messagingSenderId: '258084077526',
  appId: '1:258084077526:web:f6939e6ae831dd89336e77'
};

const firebase = initializeApp(firebaseConfig);

export const auth = getAuth(firebase);

export const signUp = async (email, password) =>
  await createUserWithEmailAndPassword(auth, email, password);

export const logIn = async (email, password) =>
  await signInWithEmailAndPassword(auth, email, password);

export const logOut = async () => await signOut(auth);
