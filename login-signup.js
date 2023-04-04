let url = "https://636a91d9c07d8f936da2035c.mockapi.io/users";

let login_div = document.querySelector("#login-div");
let signup_div = document.querySelector("#signup-div");

let login_form = document.querySelector("#login-form");
let signup_form = document.querySelector("#signup-form");

let login_link = document.querySelector("#login-link");
let signup_link = document.querySelector("#signup-link");

let signupBtn = document.querySelector("#signup-btn");

let activeUser = JSON.parse(localStorage.getItem("active-user")) || null;

let usermenu = document.querySelector(".usermenu");

let users;

getUsers();

async function getUsers() {
  let res = await fetch(url);
  let data = await res.json();
  users = data;
}

signupBtn.addEventListener("click", function () {
  openSignupForm();
});

login_link.addEventListener("click", function () {
  openLoginForm();
});

signup_link.addEventListener("click", function () {
  openSignupForm();
});

signup_form.addEventListener("submit", function () {
  signupFromData();
});

async function signupFromData() {
  let signupData = {
    name: signup_form.name.value,
    email: signup_form.email.value,
    password: signup_form.password.value,
    mobile: signup_form.mobile.value,
  };
  let flag = true;
  if (signupData.name == "") {
    alert("Please enter name");
    flag = false;
  } else if (signupData.email == "") {
    alert("Please enter email");
    flag = false;
  } else if (signupData.password == "") {
    alert("Please enter password");
    flag = false;
  } else if (signupData.mobile == "") {
    alert("Please enter mobile no");
    flag = false;
  }

  for (let user of users) {
    if (user.email == signupData.email) {
      alert("Email already in use");
      flag = false;
    }
  }

  if (flag) {
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    });

    alert(`Welcome ${signupData.name} to TravelWaala`);
    location.reload();
    signup_div.style.display = "none";
  }
}

login_form.addEventListener("submit", function () {
  loginUser();
});

async function loginUser() {
  let loginEmail = document.querySelector("#login-email").value;
  let loginPass = document.querySelector("#login-password").value;
  let res = await fetch(url);
  let data = await res.json();
  let userdata;
  for (let user of data) {
    if (user.email == loginEmail) {
      userdata = user;
    }
  }
  if (userdata) {
    if (userdata.password == loginPass) {
      alert(`Welcome Back, ${userdata.name}!`);
      saveDetailsOfActiveUser(userdata);
      login_div.style.display = "none";
    } else {
      alert("Please enter correct password");
    }
  } else {
    alert("Email is not registered");
  }
}

function saveDetailsOfActiveUser(userdata) {
  localStorage.setItem("active-user", JSON.stringify(userdata));
  activeUser = userdata;
  afterLogin();
}

if (activeUser) {
  afterLogin();
}

function openSignupForm() {
  login_div.style.display = "none";
  signup_div.style.display = "block";
}

function openLoginForm() {
  login_div.style.display = "block";
  signup_div.style.display = "none";
}

let login_btn = document.querySelector("#logout-btn");

login_btn.addEventListener("click", function () {
  logOut();
});

function logOut() {
  usermenu.style.display = "none";
  document.querySelector(".signup").style.display = "block";
  document.querySelector("#admin-page-div").style.display = "none";
  localStorage.setItem("active-user", null);
  activeUser = null;
}

function afterLogin() {
  document.querySelector("#user-profile").innerText = activeUser.name || "User";

  document.querySelector(".signup").style.display = "none";

  usermenu.style.display = "block";

  // Check if admin has logged in if yes show admin page tab on navbar

  if (activeUser.email == "admin@travelwaala.com") {
    document.querySelector("#admin-page-div").style.display = "block";
  } else {
    document.querySelector("#admin-page-div").style.display = "none";
  }
}

//Close Form OnClick
function close_form() {
  document.getElementById("signup-div").style.display = "none";
  document.getElementById("login-div").style.display = "none";
}
