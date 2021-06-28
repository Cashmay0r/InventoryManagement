//Displays current page file name, e.g., account.html
document.addEventListener('DOMContentLoaded', (event) => {
	auth();
	getAuth
		.then((user) => {
			console.log('User is Logged in');
			if (document.getElementById('welcomeText') != null) {
				document.getElementById('welcomeText').innerHTML = `Welcome ${user.displayName}!`;
				document.getElementById('accountContent').removeAttribute('hidden');
			}
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
	//Get data and append for welcome string
});

function printUserData(userProfile) {
	console.log(userProfile);
	//document.getElementById('image').innerHTML += ' ' + userProfile.imageUrl;
	//document.getElementById('userid').innerHTML += ' ' + userProfile.userId;
	document.getElementById('authlevel').innerHTML += ' ' + 'Account Type: ' + userProfile.authLevel;
	document.getElementById('displayName').innerHTML += ' ' + userProfile.fName + ' ' + userProfile.lName;
	document.getElementById('email').innerHTML += ' ' + 'Email: ' + userProfile.email;
	document.getElementById('phoneNum').innerHTML += ' ' + 'Phone: ' + userProfile.phone;
	document.getElementById('companyName').innerHTML += ' ' + userProfile.company;
	document.getElementById('companyId').innerHTML += ' ' + userProfile.companyId;
	document.getElementById('bio').innerHTML += ' ' + 'This is my Account Yo wowzas';
}

function writeUserData() {
	auth();
	getAuth.then((user) => {
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
		const displayName = fName + ' ' + lName;

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
		//Updating User profile used in auth with relevant data
		user
			.updateProfile({
				displayName: displayName,
				photoURL: null,
				phoneNumber: phone,
			})
			.then(function () {
				console.log('Update User Profile: ' + user.displayName);
			})
			.catch(function (error) {
				console.log(error);
			});
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
