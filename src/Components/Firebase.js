import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCckR5ogijWopWiQLCgUH9wA5aCH5K4RW8",
    authDomain: "sponsroar.firebaseapp.com",
    projectId: "sponsroar",
    storageBucket: "sponsroar.appspot.com",
    messagingSenderId: "50661349201",
    appId: "1:50661349201:web:169bc32f08b1bcfa4de570",
    measurementId: "G-LKHZB7E5RN"
};

const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;

export const db = firebase.database();