import firebase from 'firebase';

const firebaseConfig = {
    apiKey: 'AIzaSyDjYD2ii3X2lg7nl6_wkXRaiHGvdZBtKm4',
    authDomain: 'lottoweb-c72b5.firebaseapp.com',
    databaseURL: 'https://lottoweb-c72b5-default-rtdb.firebaseio.com',
    projectId: 'lottoweb-c72b5',
    storageBucket: 'lottoweb-c72b5.appspot.com',
    messagingSenderId: '936856549256',
    appId: '1:936856549256:web:337a504c1cb35d2689ac3d'
};

var fdb = firebase.initializeApp(firebaseConfig);

export default fdb.database().ref();