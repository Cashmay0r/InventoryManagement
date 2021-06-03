document.addEventListener('DOMContentLoaded', (event) => {
	const app = firebase.app();
	checkAuth();

	writeUserData();
	readUserData(1);
});

function checkAuth() {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			console.log('Logged In', user);
			console.log('Access Granted');
			if (window.location.href.indexOf('home.html') > -1) {
				document.getElementById('welcomeText').innerHTML = 'Welcome ' + user.email + '!';
				document.getElementById('accountContent').removeAttribute('hidden');
			}
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

function writeUserData() {
	let imageUrl = 'a';

	let userId = 1;
	let authLevel = 1;
	let fName = 1;
	let lName = 1;
	let email = 1;
	let phone = 1;
	let company = 1;
	let companyId = 1;
	firebase
		.database()
		.ref('users/' + userId)
		.set({
			imageUrl: imageUrl,
			userId: userId,
			authLevel: authLevel,
			fName: fName,
			lName: lName,
			email: email,
			phone: phone,
			company: company,
			companyId: companyId,
		});

	console.log('Uploaded');
}
function readUserData(userId) {
	const dbRef = firebase.database().ref();
	dbRef
		.child('users')
		.child(userId)
		.get()
		.then((snapshot) => {
			if (snapshot.exists()) {
				console.log(snapshot.val());
			} else {
				console.log('No data available');
			}
		})
		.catch((error) => {
			console.error(error);
		});
}
