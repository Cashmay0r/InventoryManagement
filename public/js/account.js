document.addEventListener('DOMContentLoaded', (event) => {
	const app = firebase.app();
	checkAuth();
	//writeUserData();
	readUserData('pot');
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
	let imageUrl = 'piss';
	let userId = 'pot';
	let authLevel = 'pog';
	let fName = 'pee';
	let lName = 'pig';
	let email = 'pip';
	let phone = 'pit';
	let company = 'pet';
	let companyId = 'pat';
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
				//console.log(snapshot.val());
				printUserData(snapshot);
			} else {
				console.log('No data available');
			}
		})
		.catch((error) => {
			console.error(error);
		});
}

function printUserData(data) {
	let snap = data.val();
	document.getElementById('image').innerHTML += ' ' + snap.imageUrl;
	document.getElementById('userid').innerHTML += ' ' + snap.userId;
	document.getElementById('authlevel').innerHTML += ' ' + snap.authLevel;
	document.getElementById('fName').innerHTML += ' ' + snap.fName;
	document.getElementById('lName').innerHTML += ' ' + snap.lName;
	document.getElementById('email').innerHTML += ' ' + snap.email;
	document.getElementById('phone').innerHTML += ' ' + snap.phone;
	document.getElementById('company').innerHTML += ' ' + snap.company;
	document.getElementById('companyid').innerHTML += ' ' + snap.companyId;
	console.log(snap.company);
}
