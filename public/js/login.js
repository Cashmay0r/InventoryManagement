document.addEventListener('DOMContentLoaded', (event) => {
	const app = firebase.app();
	if (document.getElementById('loginBtn') != null) {
		console.log('Login Button Event Listener Attached');
		document.getElementById('loginBtn').addEventListener('click', login);
	}
	if (document.getElementById('registerBtn') != null) {
		console.log('Register Button Event Listener Attached');
		document.getElementById('registerBtn').addEventListener('click', () => {
			window.location.replace('../html/register.html');
		});
	}
});

firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		userData();
		getUserData
			.then((profile) => {
				console.log('User Profile Data Found');
				window.location = '../html/home.html';
			})
			.catch((message) => {
				console.log(message);
				if (currentPage != 'createProfile.html') {
					window.location.replace('../html/createProfile.html');
				}
			});
	} else {
	}
});

function register() {
	const email = document.getElementById('emailReg').value;
	const pass = document.getElementById('passwordReg').value;
	const passConfirm = document.getElementById('passwordRegConfirm').value;

	if (pass.trim() === passConfirm.trim()) {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, pass)
			.then((userCredential) => {
				// Signed i
				var user = userCredential.user;
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
		})
		.catch((error) => {
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(error);
			alert(errorMessage);
		});
}
