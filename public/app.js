document.addEventListener('DOMContentLoaded', (event) => {
	const app = firebase.app();
});
function checkAuthLogin() {
	var user = firebase.auth().currentUser;

	if (user) {
		window.location = 'html/home.html';
	} else {
	}
}
firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		// User is signed in.
	} else {
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
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;

	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then((userCredential) => {
			console.log('User Logged In');
			window.location = 'home.html';
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
