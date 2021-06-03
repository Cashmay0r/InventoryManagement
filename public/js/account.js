document.addEventListener('DOMContentLoaded', (event) => {
	const app = firebase.app();
	checkAuth();
});

function checkAuth() {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			console.log('Logged In', user);
			console.log('Access Granted');
			document.getElementById('welcomeText').innerHTML = 'Welcome ' + user.email + '!';
			document.getElementById('accountContent').removeAttribute('hidden');
		} else {
			console.log('Not Logged In, Redirecting...');
			window.location = '../index.html';
		}
	});
}
function logout() {
	firebase
		.auth()
		.signOut()
		.then(() => {
			window.location = '../index.html';
			console.log('User Logged Out');
		})
		.catch((error) => {
			console.log(error);
		});
}
