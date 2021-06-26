//Displays current page file name, e.g., account.html
const currentPage = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);

document.addEventListener("DOMContentLoaded", (event) => {
  if (currentPage == "account.html") {
    getUserData
      .then((user) => {
        printUserData(user.uid);
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

function readUserProfile(userId) {
  const dbRef = firebase.database().ref();
  dbRef
    .child("users")
    .child(userId)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        const snap = snapshot.val();
        return snapshot.val();
      }
    });
}

async function printUserData(userId) {
  const userProfile = await readUserProfile(userId);
  if (userProfile != null) {
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
  } else {
    console.log("Error!");
  }
}

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
function updateDetails() {
  var user = firebase.auth().currentUser;

  const userId = user.uid;
  const img = document.getElementById("imageUpdate").value;
  const fName = document.getElementById("fNameUpdate").value;
  const lName = document.getElementById("lNameUpdate").value;
  const phone = document.getElementById("phoneUpdate").value;
  const company = document.getElementById("companyUpdate").value;
  const companyId = document.getElementById("companyIdUpdate").value;

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

  window.location = "../html/account.html";
}
