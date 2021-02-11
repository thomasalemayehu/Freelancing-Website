import {
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
} from "./model.js";
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
    setLabel(userNameLabel);
  });
  userNameInput.addEventListener("blur", () => {
    userNameRequirements.classList.remove("show");
    userNameRequirements.classList.add("hide");
  });

  passwordInput.addEventListener("focus", () => {
    passwordRequirements.classList.remove("hide");
    passwordRequirements.classList.add("show");
    setLabel(passwordLabel);
  });

  passwordInput.addEventListener("blur", () => {
    passwordRequirements.classList.remove("show");
    passwordRequirements.classList.add("hide");
  });

  //   Check on Login
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    login(userNameInput, passwordInput);
  });

  function validateUsername() {
    userNameValidator(userNameInput, userNameLabel);
  }

  function validatePassword() {
    passwordValidator(passwordInput, passwordLabel);
  }
  //   Login Function
  function login(userNameInput, passwordInput) {
    getUser(userNameInput.value).then((user) => {
      if (user) {
        if (user.password == hashPassword(passwordInput.value)) {
          window.location.href = `../../home.html?id=${user.userName}&type=${user.accountType}`;
        } else {
          setLabel(passwordLabel, "Incorrect Password");
          addClass(passwordLabel, "warning");
          setInput(passwordInput);
        }
      } else {
        setLabel(userNameLabel, "User is not Registered");
        addClass(userNameLabel, "warning");
        setInput(userNameInput);
      }
    });
  }
});
