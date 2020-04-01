import firebase from 'firebase/app'
import 'firebase/storage'

var firebaseConfig = {
  apiKey: "AIzaSyAsqKnX9S3TRVqGYW9Rm5W_V4jVfChzKTU",
  authDomain: "images-fd267.firebaseapp.com",
  databaseURL: "https://images-fd267.firebaseio.com",
  projectId: "images-fd267",
  storageBucket: "images-fd267.appspot.com",
  messagingSenderId: "898960074336",
  appId: "1:898960074336:web:1ac385c2187fe672760505",
  measurementId: "G-EYP54WKC99"
};
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage, firebase as default };
