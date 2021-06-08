import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import firebase from 'firebase';
import '@firebase/auth';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname + '/public/'));
app.use(express.static(__dirname + '/public/html/'));
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

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/html/index.html');
});

/*app.get('/html/account.html', (req, res) => {
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			res.sendFile(__dirname + '/public/html/account.html');
			next();
		} else {
			res.redirect(__dirname + '/public/html/index.html');
			next();
		}
	});
});*/

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
