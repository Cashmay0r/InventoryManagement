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
	checkAuth();
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
			if (window.location.pathname == '../html/account.html') {
				//writeUserData();
				readUserData(user.uid);
				updateUserInfo();
			}
		} else {
			console.log('Not Logged In, Redirecting...');
			window.location = '../html/index.html';
		}
	});
}
function logout() {
	firebase
		.auth()
		.signOut()
		.then(() => {
			window.location = '../html/index.html';
			console.log('User Logged Out');
		})
		.catch((error) => {
			console.log(error);
		});
}

function writeUserData() {
	var user = firebase.auth().currentUser;
	let imageUrl = 'piss';
	let userId = user.uid;
	let authLevel = 'pog';
	let fName = 'pee';
	let lName = 'pig';
	let email = user.email;
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
			console.error('Unable to read user data');
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
}

function updateUserInfo() {
	var user = firebase.auth().currentUser;
	console.log(user.uid);

	user
		.updateProfile({
			displayName: 'Aidaaan',
			photoURL: 'https://example.com/jane-q-user/profile.jpg',
		})
		.then(function () {
			console.log('User updated ' + user.displayName);
		})
		.catch(function (error) {
			console.log(error);
		});
}
function updateDetails() {
	var user = firebase.auth().currentUser;

	const userId = user.uid;
	const img = document.getElementById('imageUpdate').value;
	const fName = document.getElementById('fNameUpdate').value;
	const lName = document.getElementById('lNameUpdate').value;
	const phone = document.getElementById('phoneUpdate').value;
	const company = document.getElementById('companyUpdate').value;
	const companyId = document.getElementById('companyIdUpdate').value;

	if (img.trim() != '') {
		firebase
			.database()
			.ref('users/' + userId)
			.update({
				imageUrl: img,
			});
	}
	if (fName.trim() != '') {
		firebase
			.database()
			.ref('users/' + userId)
			.update({
				fName: fName,
			});
	}
	if (lName.trim() != '') {
		firebase
			.database()
			.ref('users/' + userId)
			.update({
				lName: lName,
			});
	}
	if (phone.trim() != '') {
		firebase
			.database()
			.ref('users/' + userId)
			.update({
				phone: phone,
			});
	}
	if (company.trim() != '') {
		firebase
			.database()
			.ref('users/' + userId)
			.update({
				company: company,
			});
	}
	if (companyId.trim() != '') {
		firebase
			.database()
			.ref('users/' + userId)
			.update({
				companyId: companyId,
			});
	}
}
