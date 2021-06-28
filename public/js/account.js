//Displays current page file name, e.g., account.html
document.addEventListener('DOMContentLoaded', (event) => {
	auth();
	getAuth
		.then((user) => {
			console.log('User Logged in');
		})
		.catch((message) => {
			console.log('User not logged in');
			window.location.replace('../html/index.html');
		});

	if (currentPage == 'account.html') {
		userData();
		getUserData
			.then((profile) => {
				printUserData(profile);
			})
			.catch((user) => {
				alert('No User Data');
			});
	}

	//Button Listeners
	//Listener for logout button
	if (document.getElementById('logout') != null) {
		document.getElementById('logout').addEventListener('click', (e) => {
			firebase
				.auth()
				.signOut()
				.then(() => {
					console.log('User Logged Out');
					window.location.replace('../index.html');
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
	//Listener for NavAccount
});

function printUserData(userProfile) {
	console.log(userProfile);
	document.getElementById('image').innerHTML += ' ' + userProfile.imageUrl;
	document.getElementById('userid').innerHTML += ' ' + userProfile.userId;
	document.getElementById('authlevel').innerHTML += ' ' + userProfile.authLevel;
	document.getElementById('fName').innerHTML += ' ' + userProfile.fName;
	document.getElementById('lName').innerHTML += ' ' + userProfile.lName;
	document.getElementById('email').innerHTML += ' ' + userProfile.email;
	document.getElementById('phone').innerHTML += ' ' + userProfile.phone;
	document.getElementById('company').innerHTML += ' ' + userProfile.company;
	document.getElementById('companyid').innerHTML += ' ' + userProfile.companyId;
}

function writeUserData() {
	const user = firebase.auth().currentUser;
	console.log(user);
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
//TODO: Need to fix this feature and make it useful
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
	let arr = [];
	const img = document.getElementById('imageUpdate').value;
	const fName = document.getElementById('fNameUpdate').value;
	const lName = document.getElementById('lNameUpdate').value;
	const phone = document.getElementById('phoneUpdate').value;
	const company = document.getElementById('companyUpdate').value;
	const companyId = document.getElementById('companyIdUpdate').value;
	arr.push(img, fName, lName, phone, company, companyId);
	arr.forEach((element) => {
		element = element.trim();
	});
	console.log(arr);
	auth();
	getAuth.then((user) => {
		const userId = user.uid;
		{
			firebase
				.database()
				.ref('users/' + userId)
				.update({
					imageUrl: img,
					fName: fName,
					lName: lName,
					phone: phone,
					company: company,
					companyId: companyId,
				})
				.then(() => {
					console.log('Fields Updated');
					window.location.replace('../html/account.html');
				});
		}
	});
}
