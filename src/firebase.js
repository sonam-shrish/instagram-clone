import firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: 'AIzaSyCsJO9u2AnaPs1HQ03u2qTnDcoR-WWsYqo',
	authDomain: 'instagram-clone-react-76be4.firebaseapp.com',
	projectId: 'instagram-clone-react-76be4',
	storageBucket: 'instagram-clone-react-76be4.appspot.com',
	messagingSenderId: '606509346483',
	appId: '1:606509346483:web:84391febabcaabc8d50ac6',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
