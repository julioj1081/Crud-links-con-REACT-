import firebase from 'firebase/app'
import 'firebase/firestore'
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDyhPnv0Rvyuw7z52pWxU_u3TXN2i5gy44",
    authDomain: "crud-react-1-dd860.firebaseapp.com",
    databaseURL: "https://crud-react-1-dd860.firebaseio.com",
    projectId: "crud-react-1-dd860",
    storageBucket: "crud-react-1-dd860.appspot.com",
    messagingSenderId: "346353524393",
    appId: "1:346353524393:web:de9c06688d6b1378a693b8"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);
  //exportamos como objeto
  export const db = fb.firestore();