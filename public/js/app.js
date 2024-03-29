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
