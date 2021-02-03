//   Username Validating Function
function validateUsername() {
  let isValidated;
  let userNameRegEx = /^[a-zA-Z]{6,18}[a-zA-Z]$/;
  if (userNameRegEx.test(userNameInput.value)) {
    userNameInput.classList.remove("is-danger");
    userNameInput.classList.add("is-success");
    isValidated = "Validated";
  } else {
    userNameInput.classList.remove("is-success");
    userNameInput.classList.add("is-danger");
    isValidated = "";
  }
  return isValidated;
}
// Password Validating Function
function validatePassword() {
  let isValidated;
  let passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/;
  if (passwordRegEx.test(passwordInput.value)) {
    passwordInput.classList.remove("is-danger");
    passwordInput.classList.add("is-success");
    isValidated = "Validated";
  } else {
    passwordInput.classList.remove("is-success");
    passwordInput.classList.add("is-danger");
    isValidated = "";
  }
  return isValidated;
}
// Validating Confirm Password
function validateConfirmPassword() {
  let isValidated;
  let passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/;
  if (
    passwordRegEx.test(confirmPasswordInput.value) &&
    confirmPasswordInput.value == passwordInput.value
  ) {
    confirmPasswordInput.classList.remove("is-danger");
    confirmPasswordInput.classList.add("is-success");
    isValidated = "Validated";
  } else {
    confirmPasswordInput.classList.remove("is-success");
    confirmPasswordInput.classList.add("is-danger");
    isValidated = "";
  }

  return isValidated;
}

// Password Hashing Function
function hashPassword(password) {
  let hashedPassword = "";
  let salt = "jobberBRT";
  password = `${salt}${password}${salt}`;
  for (let i = 0; i < password.length; i++) {
    hashedPassword += password.charCodeAt(i);
  }
  return hashedPassword;
}

//   Adding New User to DB
function addUserToDB(userName, password, accountType = "Seller") {
  let openRequest = indexedDB.open("UsersDB", 1);
  let dataBase;
  openRequest.onerror = function () {
    console.log("Error Opening DB");
  };
  openRequest.onsuccess = function () {
    dataBase = openRequest.result;
    let newUser = {
      userName: userName,
      password: hashPassword(password),
      accountType: accountType,
    };
    let addRequest = dataBase
      .transaction(["User"], "readwrite")
      .objectStore("User")
      .add(newUser);

    addRequest.onerror = function () {
      //    Handling Errors at SignUp
      if (addRequest.error.name == "ConstraintError") {
        if (addRequest.error.message.toString().includes("userName")) {
          userNameLabel.innerText = "Username already in use";
        }
      }
    };

    addRequest.onsuccess = function () {
      console.log("User Added");
      clearLabel(userNameLabel);
      clearInput(userNameInput);
      clearInput(passwordInput);
      clearInput(confirmPasswordInput);
    };
  };
  openRequest.onupgradeneeded = function (e) {
    dataBase = e.target.result;
    let objectStore = dataBase.createObjectStore("User", {
      keyPath: "id",
      autoIncrement: true,
    });
    objectStore.createIndex("userName", "userName", { unique: true });
    objectStore.createIndex("password", "password", { unique: false });
    objectStore.createIndex("accountType", "accountType", { unique: false });
    console.log("DB Created");
  };
}

// Clearing Function
function clearLabel(element) {
  element.innerText = "";
}
function clearInput(element) {
  element.value = "";
}
