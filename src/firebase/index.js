import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCZ7ztb_MuiDhpk3RBhaKozPRkXDqz-fe8",
  authDomain: "testtaskorca.firebaseapp.com",
  databaseURL: "https://testtaskorca.firebaseio.com",
  projectId: "testtaskorca",
  storageBucket: "testtaskorca.appspot.com",
  messagingSenderId: "7896209913",
  appId: "1:7896209913:web:5cb74e06deb7398ba30528"
}

firebase.initializeApp(firebaseConfig)

export default firebase
