document.addEventListener('DOMContentLoaded', (event) => {
	const app = firebase.app();
});

firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		console.log(user, 'Successfully Logged in');
		window.location = '/html/home.html';
	} else {
		console.log('No user logged in');
		window.location = 'index.html';
	}
});

function register() {
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;
	console.log(email, password);
	firebase
		.auth()
		.createUserWithEmailAndPassword(email, password)
		.then((userCredential) => {
			// Signed in
			var user = userCredential.user;
			// ...
			console.log(user);
		})
		.catch((error) => {
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(errorMessage);
			// ..
		});
}

function login() {
	const email = document.getElementById('email');
	const password = document.getElementById('password');

	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then((userCredential) => {
			console.log('User Logged In');
			window.location.href('home.html');
			var user = userCredential.user;
			// ...
		})
		.catch((error) => {
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(error);
		});
}

function logout() {
	firebase
		.auth()
		.signOut()
		.then(() => {
			console.log('User Logged Out');
			window.location.replace('index.html');
		})
		.catch((error) => {
			console.log(error);
		});
}
