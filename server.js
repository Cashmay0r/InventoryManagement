import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import firebase from 'firebase';
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import '@firebase/analytics';
// Add the Firebase products that you want to use
import '@firebase/auth';
import '@firebase/firestore';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;
app.use(express.static(__dirname + '/public/'));
app.use(express.static(__dirname + '/public/css/'));
app.use(express.static(__dirname + '/public/js/'));

const firebaseConfig = {
	apiKey: 'AIzaSyD4uQyMGJ0aQqg8oBWnbWRfZyUoIMaYl3U',
	authDomain: 'profile-management-8a61b.firebaseapp.com',
	databaseURL: 'https://profile-management-8a61b-default-rtdb.firebaseio.com',
	projectId: 'profile-management-8a61b',
	storageBucket: 'profile-management-8a61b.appspot.com',
	messagingSenderId: '557995874959',
	appId: '1:557995874959:web:850cd8358500b9ba0b2efa',
	measurementId: 'G-65F0XWDRD6',
};

firebase.initializeApp(firebaseConfig);

function checkAuthLogin() {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			console.log('Logged In', user);
			return true;
		} else {
			console.log('Not Logged In');
			return false;
		}
	});
}

app.get('/', (req, res) => {
	if (checkAuthLogin()) {
		console.log('Logged In');
	} else {
		res.sendFile(__dirname + '/public/index.html');
	}
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
