import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/database'
import 'firebase/auth'
var firebaseConfig = {
  apiKey: "AIzaSyD3msc2iROhAn301lMf2PLMKSM9E4VWRZs",
  authDomain: "thoughtsmaker-8af93.firebaseapp.com",
  databaseURL: "https://thoughtsmaker-8af93.firebaseio.com",
  projectId: "thoughtsmaker-8af93",
  storageBucket: "thoughtsmaker-8af93.appspot.com",
  messagingSenderId: "605166586888",
  appId: "1:605166586888:web:47dc0f58d208b82c9395bd",
  measurementId: "G-CZ70FQLGKW"
};
const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export { fb, db }