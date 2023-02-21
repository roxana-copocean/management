import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyANLS1zeU7NQmCCYEv8Fkp4vkKb56XYpLU',
	authDomain: 'management-4c8b1.firebaseapp.com',
	projectId: 'management-4c8b1',
	storageBucket: 'management-4c8b1.appspot.com',
	messagingSenderId: '912723035905',
	appId: '1:912723035905:web:e030a80428ac879d307d00'
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// Firebase timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp, projectStorage };
