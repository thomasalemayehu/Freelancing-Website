// UI Variables
let loginForm = document.querySelector(".login-form");
let userNameInput = document.querySelector(".user-name-input");
let passwordInput = document.querySelector(".password-input");
let userNameRequirements = document.querySelector(".input-requirements");
let passwordRequirements = document.querySelectorAll(".input-requirements")[1];
let userNameLabel = document.querySelector(".userNameErrorLabel");
let passwordLabel = document.querySelector(".passwordErrorLabel");

document.addEventListener("DOMContentLoaded", () => {
  // Adding Event Listeners
  userNameInput.addEventListener("keyup", validateUsername);
  passwordInput.addEventListener("keyup", validatePassword);

  // Show and hide requirement text on focus and blur
  userNameInput.addEventListener("focus", () => {
    userNameRequirements.classList.remove("hide");
    userNameRequirements.classList.add("show");
    clearLabel(userNameLabel);
  });
  userNameInput.addEventListener("blur", () => {
    userNameRequirements.classList.remove("show");
    userNameRequirements.classList.add("hide");
  });

  passwordInput.addEventListener("focus", () => {
    passwordRequirements.classList.remove("hide");
    passwordRequirements.classList.add("show");
    clearLabel(passwordLabel);
  });

  passwordInput.addEventListener("blur", () => {
    passwordRequirements.classList.remove("show");
    passwordRequirements.classList.add("hide");
  });

  //   Check on Login
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validatePassword() && validateUsername()) {
      login(userNameInput.value, passwordInput.value);
    } else {
      alert("invalid input");
    }
  });

  //   Login Function
  function login(userName, password) {
    //   Opening DB
    let openRequest = indexedDB.open("UsersDB", 1);
    let dataBase;
    openRequest.onerror = function () {
      "Error Opening DB";
    };

    openRequest.onsuccess = function () {
      dataBase = openRequest.result;
      let readRequest = dataBase
        .transaction(["User"], "readonly")
        .objectStore("User")
        .openCursor();

      readRequest.onerror = function () {
        console.log("Error Reading Db");
      };

      readRequest.onsuccess = function (e) {
        let cursor = e.target.result;
        if (cursor) {
          if (cursor.value.userName != userName) {
            userNameLabel.innerText = "User not registered";
            clearLabel(passwordLabel);
          } else {
            if (cursor.value.password == hashPassword(password)) {
              window.location.href = `./index.html?id=${cursor.value.id}`;
              clearLabel(userNameLabel);
              clearLabel(passwordLabel);
              clearInput(userNameInput);
              clearInput(passwordInput);
            } else {
              passwordLabel.innerText = "Invalid Password";
              clearLabel(userNameLabel);
            }
          }
          cursor.continue();
        }
      };
    };
  }
});
