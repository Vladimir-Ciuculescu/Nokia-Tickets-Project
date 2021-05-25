import firebase from 'firebase';

 var firebaseConfig = {
    apiKey: "AIzaSyBQKhu_vs7-atUv4gMBVP1p3dcSr7NuJ3k",
    authDomain: "nokia-39a6b.firebaseapp.com",
    projectId: "nokia-39a6b",
    storageBucket: "nokia-39a6b.appspot.com",
    messagingSenderId: "48690402476",
    appId: "1:48690402476:web:5ae244f94b3a2d8c233b09",
    measurementId: "G-LVP9X3TTN7"
};
  
const database = firebase.initializeApp(firebaseConfig);

export default database;