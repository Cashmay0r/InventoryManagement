const currentPage = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
let getUserData = null;
let profile = null;
let getAuth = null;
//Firebase Credentials + Initilization
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

//Promise to fetch auth data
function auth() {
	getAuth = new Promise((resolve, reject) => {
		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				//User is logged in
				console.log('Logged In');
				resolve(user);
			} else {
				//User is not logged in
				console.log('Not Logged In');
				let redirect = true;
				if (currentPage == 'index.html') {
					redirect = false;
				}
				if (currentPage == 'register.html') {
					redirect = false;
				}
				if (redirect) {
					window.location.replace('../index.html');
					console.log('Redirected to Index.');
				}
				reject('No User Found');
			}
		});
	});
}

//Promise to get user profile data
function userData() {
	getUserData = new Promise((resolve, reject) => {
		auth();
		getAuth
			.then((user) => {
				//User logged in
				console.log('Made it');
				readUserProfile(user.uid);
				profile
					.then((profile) => {
						//Have profile data
						resolve(profile);
					})
					.catch((message) => {
						//Does not have profile data
						reject(message);
					});
			})
			.catch((message) => {
				//User Not logged in
				console.log('Not Logged In');
			});
	});
}

function readUserProfile(userId) {
	profile = new Promise((resolve, reject) => {
		const dbRef = firebase.database().ref();
		dbRef
			.child('users')
			.child(userId)
			.get()
			.then((snapshot) => {
				if (snapshot.exists()) {
					resolve(snapshot.val());
				} else {
					reject('No snapshot data available for this user');
				}
			});
	});
}
