//Displays current page file name, e.g., account.html
let profile = new Promise((resolve, reject) => {});

document.addEventListener("DOMContentLoaded", (event) => {
  if (currentPage == "account.html") {
    getUserData
      .then((user) => {
        readUserProfile(user.uid);
        return profile;
      })
      .then((profile) => {
        printUserData(profile);
      })
      .catch((error) => {
        console.log(error);
      })
      .catch((user) => {
        console.log("No User: ", user);
      });
  }

  //Button Listeners
  //Listener for logout button
  if (document.getElementById("logout") != null) {
    document.getElementById("logout").addEventListener("click", (e) => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("User Logged Out");
          window.location.replace("../index.html");
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }
  //Listener for updateDetails
  if (document.getElementById("updateDetails") != null) {
    document.getElementById("updateDetails").addEventListener("click", function () {
      window.location = "updateDetails.html";
    });
  }
  //Listener for NavAccount
});
//WoW
function readUserProfile(userId) {
  profile = new Promise((resolve, reject) => {
    const dbRef = firebase.database().ref();
    dbRef
      .child("users")
      .child(userId)
      .get()
      .then((snapshot) => {
        console.log(snapshot.val());
        if (snapshot.exists()) {
          console.log(snapshot.val());
          //const snap = snapshot.val();
          resolve(snapshot.val());
        } else {
          reject("No snapshot");
        }
      });
  });
}

function printUserData(userProfile) {
  console.log(userProfile);
  document.getElementById("image").innerHTML += " " + userProfile.imageUrl;
  console.log(userProfile.fName);
  document.getElementById("userid").innerHTML += " " + userProfile.userId;
  document.getElementById("authlevel").innerHTML += " " + userProfile.authLevel;
  document.getElementById("fName").innerHTML += " " + userProfile.fName;
  document.getElementById("lName").innerHTML += " " + userProfile.lName;
  document.getElementById("email").innerHTML += " " + userProfile.email;
  document.getElementById("phone").innerHTML += " " + userProfile.phone;
  document.getElementById("company").innerHTML += " " + userProfile.company;
  document.getElementById("companyid").innerHTML += " " + userProfile.companyId;
}
//TODO: Need to check and potentially fix this feature
function writeUserData() {
  const user = firebase.auth().currentUser;

  let authLevel = "User";
  const email = user.email;
  const userId = user.uid;
  const img = document.getElementById("imageCreate").value;
  const fName = document.getElementById("fNameCreate").value;
  const lName = document.getElementById("lNameCreate").value;
  const phone = document.getElementById("phoneCreate").value;
  const company = document.getElementById("companyCreate").value;
  const companyId = document.getElementById("companyIdCreate").value;

  firebase
    .database()
    .ref("users/" + userId)
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
      console.log("Uploaded");
      window.location = "../html/home.html";
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
      displayName: "Aidaaan",
      photoURL: "https://example.com/jane-q-user/profile.jpg",
    })
    .then(function () {
      console.log("User updated " + user.displayName);
    })
    .catch(function (error) {
      console.log(error);
    });
}
//TODO: Need to fix this so data can be updated
function updateDetails() {
  const img = document.getElementById("imageUpdate").value;
  const fName = document.getElementById("fNameUpdate").value;
  const lName = document.getElementById("lNameUpdate").value;
  const phone = document.getElementById("phoneUpdate").value;
  const company = document.getElementById("companyUpdate").value;
  const companyId = document.getElementById("companyIdUpdate").value;
  getUserData.then((user) => {
    const userId = user.uid;
    if (img.trim() != "") {
      firebase
        .database()
        .ref("users/" + userId)
        .update({
          imageUrl: img,
        });
      console.log(`ImageUrl updated to ${img}`);
    }
    if (fName.trim() != "") {
      firebase
        .database()
        .ref("users/" + userId)
        .update({
          fName: fName,
        });
      console.log(`First Name updated to ${fName}`);
    }
    if (lName.trim() != "") {
      firebase
        .database()
        .ref("users/" + userId)
        .update({
          lName: lName,
        });
      console.log(`Last Name updated to ${lName}`);
    }
    if (phone.trim() != "") {
      firebase
        .database()
        .ref("users/" + userId)
        .update({
          phone: phone,
        });
      console.log(`Phone updated to ${phone}`);
    }
    if (company.trim() != "") {
      firebase
        .database()
        .ref("users/" + userId)
        .update({
          company: company,
        });
      console.log(`Company updated to ${company}`);
    }
    if (companyId.trim() != "") {
      firebase
        .database()
        .ref("users/" + userId)
        .update({
          companyId: companyId,
        });
      console.log(`Company ID updated to ${companyId}`);
    }
  });
  window.location = "../html/account.html";
}
