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

//Authentication Observer
function getAuth() {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			//Logged In
			var uid = user.uid;

			console.log('Logged In');
			console.log(uid);
			return uid;
		} else {
			var uid = user.uid;
			console.log('Not Logged In');
			window.location.replace('../index.html');
			return uid;
		}
	});
}
