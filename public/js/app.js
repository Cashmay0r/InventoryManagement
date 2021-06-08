//import firebase from 'firebase';
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

document.addEventListener('DOMContentLoaded', (event) => {
	const app = firebase.app();
	if (document.getElementById('loginBtn') != null) {
		console.log('Login Button Event Listener Attached');
		document.getElementById('loginBtn').addEventListener('click', login);
	}
});

firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		console.log('Logged In');
		window.location.href = '../html/home.html';
	} else {
		console.log('Not Logged In');
	}
});

function register() {
	const email = document.getElementById('emailReg').value;
	const pass = document.getElementById('passwordReg').value;
	const passConfirm = document.getElementById('passwordRegConfirm').value;

	console.log(email, pass, passConfirm);

	if (pass.trim() === passConfirm.trim()) {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, pass)
			.then((userCredential) => {
				// Signed i
				var user = userCredential.user;
				window.location = '../html/home.html';
				console.log(user);
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log(errorMessage);
				// ..
			});
	} else {
		alert("Passwords don't match");
	}
}

function login() {
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;

	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then((userCredential) => {
			console.log('User Logged In');
			window.location = '../html/home.html';
			var user = userCredential.user;
			// ...
		})
		.catch((error) => {
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(error);
			alert(errorMessage);
		});
}
