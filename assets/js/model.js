import { openDB, deleteDB, wrap, unwrap } from "https://unpkg.com/idb?module";
//   Username Validating Function

//   Function to add new user to DB
async function addUserToDB(userName, password, accountType) {
  try {
    let db = await openDB("Jobber", 1, {
      upgrade(db) {
        db.createObjectStore("Users", { keyPath: "userName" });
        db.createObjectStore("UserDetails", { keyPath: "userName" });
      },
    });

    await db.add("Users", {
      userName: userName,
      password: hashPassword(password),
      accountType: accountType,
    });

    db.close();

    // clear input labels
    // setInput(userNameInput);
    // setInput(passwordInput);
    // setInput(confirmPasswordInput);

    // Redirect to More info page
    if (accountType == "seller") {
      window.location.href = `../../RegisterInfo.html?id=${userName}`;
    } else {
      console.log("Buyer");
    }
  } catch (error) {
    // if (error.message.toString().includes("Key already exists")) {
    //   setLabel(userNameLabel, "Username already in use");
    //   addClass(userNameLabel, "warning");
    // }
    console.log(error);
  }
}

async function addUserDetail(itemToAdd) {
  try {
    let db = await openDB("Jobber", 1, {
      upgrade(db) {
        db.createObjectStore("UserDetail", { keyPath: "userName" });
      },
    });

    await db.add("UserDetails", itemToAdd);
    window.location.href = `../../home.html?id=${itemToAdd.userName}`;
  } catch (e) {
    console.log(e);
  }
}

async function getUser(id) {
  let db = await openDB("Jobber", 1);
  const user = await db.get("Users", id);
  return user;
}

async function getUserDetail(id) {
  let db = await openDB("Jobber", 1);
  const userDetail = await db.get("UserDetails", id);
  return userDetail;
}
// Clearing Function

// Helper Functions
function userNameValidator(userNameInput, userNameLabel) {
  let isValidated;
  let userNameRegEx = /^[a-zA-Z]{6,18}[a-zA-Z]$/;
  if (userNameRegEx.test(userNameInput.value)) {
    removeClass(userNameInput, "is-danger");
    addClass(userNameInput, "is-success");
    setLabel(userNameLabel);

    isValidated = "Validated";
  } else {
    removeClass(userNameInput, "is-success");
    addClass(userNameInput, "is-danger");
    if (userNameInput.value.length != 0) {
      setLabel(userNameLabel);
    }

    isValidated = "";
  }
  return isValidated;
}
// Password Validating Function
function passwordValidator(passwordInput, passwordLabel) {
  let isValidated;
  let passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/;
  if (passwordRegEx.test(passwordInput.value)) {
    removeClass(passwordInput, "is-danger");
    addClass(passwordInput, "is-success");

    isValidated = "Validated";
  } else {
    removeClass(passwordInput, "is-success");
    addClass(passwordInput, "is-danger");

    isValidated = "";
  }
  return isValidated;
}
// Validating Confirm Password
function confirmPasswordValidator(
  confirmPasswordInput,
  confirmPasswordLabel,
  passwordInput
) {
  let isValidated;
  let passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/;
  if (
    passwordRegEx.test(confirmPasswordInput.value) &&
    confirmPasswordInput.value == passwordInput
  ) {
    removeClass(confirmPasswordInput, "is-danger");
    addClass(confirmPasswordInput, "is-success");

    isValidated = "Validated";
  } else {
    removeClass(confirmPasswordInput, "is-success");
    addClass(confirmPasswordInput, "is-danger");
    isValidated = "";
  }

  return isValidated;
}
// Name Validating

// Password Hashing Function
function hashPassword(password) {
  let hashedPassword = "";
  let salt = "jobberBRT";
  password = `${salt}${password}${salt}`;
  for (let i = 0; i < password.length; i++) {
    hashedPassword += password.charCodeAt(i);
  }
  return hashedPassword;
  return password;
}

function setLabel(element, value = "") {
  element.innerText = value;
}
function setInput(element, value = "") {
  element.value = "";
}
function addClass(element, className) {
  element.classList.add(className);
}
function removeClass(element, className) {
  element.classList.remove(className);
}

// Exporting Functions
export {
  userNameValidator,
  passwordValidator,
  confirmPasswordValidator,
  hashPassword,
  setLabel,
  setInput,
  addClass,
  addUserToDB,
  addUserDetail,
  getUser,
  getUserDetail,
};
