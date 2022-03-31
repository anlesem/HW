import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { getDatabase, ref } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBvOjU7R7n9ELD5j1V7F_KlcxHzosxfY70',
  authDomain: 'hw-react-gb.firebaseapp.com',
  databaseURL: 'https://hw-react-gb-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'hw-react-gb',
  storageBucket: 'hw-react-gb.appspot.com',
  messagingSenderId: '465517471628',
  appId: '1:465517471628:web:a070a2ca874a0ce11818a9'
};

const firebase = initializeApp(firebaseConfig);

export const auth = getAuth(firebase);

export const signUp = async (email, password) =>
  await createUserWithEmailAndPassword(auth, email, password);

export const logIn = async (email, password) =>
  await signInWithEmailAndPassword(auth, email, password);

export const logOut = async () => await signOut(auth);

export const db = getDatabase(firebase);

export const userRef = ref(db, 'user');
export const chatsRef = ref(db, 'chats');
export const messagesRef = ref(db, 'messages');

export const getChatListById = (id) => ref(db, `chats/${id}`);

export const getMessagesById = (chatId) => ref(db, `messages/${chatId}`);

export const getMessagesListById = (chatId, msgId) => ref(db, `messages/${chatId}/${msgId}`);
