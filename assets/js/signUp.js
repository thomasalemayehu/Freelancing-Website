// UI Variables
let signUpForm = document.querySelector(".sign-up-form");
let userNameInput = document.querySelector(".user-name-input");
let passwordInput = document.querySelector(".password-input");
let userNameRequirements = document.querySelector(".input-requirements");
let passwordRequirements = document.querySelectorAll(".input-requirements")[1];
let userNameLabel = document.querySelector(".userNameErrorLabel");
let passwordLabel = document.querySelector(".passwordErrorLabel");
let confirmPasswordInput = document.querySelector(".password-confirm-input");
let confirmPasswordRequirements = document.querySelectorAll(
  ".input-requirements"
)[2];

document.addEventListener("DOMContentLoaded", () => {
  // Adding Event Listeners
  userNameInput.addEventListener("keyup", validateUsername);
  passwordInput.addEventListener("keyup", validatePassword);
  confirmPasswordInput.addEventListener("keyup", validateConfirmPassword);

  // Show and hide requirement text on focus and blur
  userNameInput.addEventListener("focus", () => {
    userNameRequirements.classList.remove("hide");
    userNameRequirements.classList.add("show");
  });
  userNameInput.addEventListener("blur", () => {
    userNameRequirements.classList.remove("show");
    userNameRequirements.classList.add("hide");
  });

  passwordInput.addEventListener("focus", () => {
    passwordRequirements.classList.remove("hide");
    passwordRequirements.classList.add("show");
  });

  passwordInput.addEventListener("blur", () => {
    passwordRequirements.classList.remove("show");
    passwordRequirements.classList.add("hide");
  });

  confirmPasswordInput.addEventListener("focus", () => {
    confirmPasswordRequirements.classList.remove("hide");
    confirmPasswordRequirements.classList.add("show");
  });

  confirmPasswordInput.addEventListener("blur", () => {
    confirmPasswordRequirements.classList.remove("show");
    confirmPasswordRequirements.classList.add("hide");
  });

  signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (validateUsername() && validatePassword() && validateConfirmPassword()) {
      addUserToDB(userNameInput.value.toLowerCase(), passwordInput.value);
      console.log("Added User");
    } else {
      alert("Invalid");
    }
  });
});
