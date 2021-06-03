document.addEventListener('DOMContentLoaded', (event) => {
	const app = firebase.app();
	checkAuthLogin();
});
function checkAuthLogin() {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			console.log('Logged In', user);
			window.location = 'html/home.html';
		} else {
			console.log('Not Logged In');
		}
	});
}

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
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;

	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then((userCredential) => {
			console.log('User Logged In');
			window.location = 'html/home.html';
			var user = userCredential.user;
			// ...
		})
		.catch((error) => {
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(error);
		});
}
