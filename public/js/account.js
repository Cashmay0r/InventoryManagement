const currentPage = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
let userProfile = {};
let loggedIn = true;
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
const app = firebase.app();

document.addEventListener('DOMContentLoaded', (event) => {
	//Button Listeners
	//Listener for logout button
	if (document.getElementById('logout') != null) {
		document.getElementById('logout').addEventListener('click', (e) => {
			firebase
				.auth()
				.signOut()
				.then(() => {
					console.log('User Logged Out');
				})
				.catch((error) => {
					console.log(error);
				});
		});
	}
	//Listener for updateDetails
	if (document.getElementById('updateDetails') != null) {
		document.getElementById('updateDetails').addEventListener('click', function () {
			window.location = 'updateDetails.html';
		});
	}
});

firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		//Logged In
		userProfile = user;
		loggedIn = true;
		console.log('Logged In');
		console.log(userProfile);
	} else {
		loggedIn = false;
		userProfile = user;
		console.log('Not Logged In');

		console.log(userProfile);
	}
});

function writeUserData() {
	const user = firebase.auth().currentUser;

	let authLevel = 'User';
	const email = user.email;
	const userId = user.uid;
	const img = document.getElementById('imageCreate').value;
	const fName = document.getElementById('fNameCreate').value;
	const lName = document.getElementById('lNameCreate').value;
	const phone = document.getElementById('phoneCreate').value;
	const company = document.getElementById('companyCreate').value;
	const companyId = document.getElementById('companyIdCreate').value;

	firebase
		.database()
		.ref('users/' + userId)
		.set({
			imageUrl: img,
			userId: userId,
			authLevel: authLevel,
			fName: fName,
			lName: lName,
			email: email,
			phone: phone,
			company: company,
			companyId: companyId,
		})
		.then((result) => {
			console.log('Uploaded');
			window.location = '../html/home.html';
		})
		.catch((err) => {
			console.log(err);
		});
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
		console.log(`ImageUrl updated to ${img}`);
	}
	if (fName.trim() != '') {
		firebase
			.database()
			.ref('users/' + userId)
			.update({
				fName: fName,
			});
		console.log(`First Name updated to ${fName}`);
	}
	if (lName.trim() != '') {
		firebase
			.database()
			.ref('users/' + userId)
			.update({
				lName: lName,
			});
		console.log(`Last Name updated to ${lName}`);
	}
	if (phone.trim() != '') {
		firebase
			.database()
			.ref('users/' + userId)
			.update({
				phone: phone,
			});
		console.log(`Phone updated to ${phone}`);
	}
	if (company.trim() != '') {
		firebase
			.database()
			.ref('users/' + userId)
			.update({
				company: company,
			});
		console.log(`Company updated to ${company}`);
	}
	if (companyId.trim() != '') {
		firebase
			.database()
			.ref('users/' + userId)
			.update({
				companyId: companyId,
			});
		console.log(`Company ID updated to ${companyId}`);
	}

	window.location = '../html/account.html';
}
