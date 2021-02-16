//
import {
  userNameValidator,
  passwordValidator,
  confirmPasswordValidator,
  addUserToDB,
} from "./model.js";

// UI Variables
let selectedUserType;

let signUpForm = document.querySelector(".sign-up-form");
let userNameInput = document.querySelector(".user-name-input");
let passwordInput = document.querySelector(".password-input");
let userNameRequirements = document.querySelector(".input-requirements");
let passwordRequirements = document.querySelectorAll(".input-requirements")[1];
let userNameLabel = document.querySelector(".userNameErrorLabel");
let passwordLabel = document.querySelector(".passwordErrorLabel");
let confirmPasswordLabel = document.querySelector(".confirmPasswordErrorLabel");
let confirmPasswordInput = document.querySelector(".password-confirm-input");
let confirmPasswordRequirements = document.querySelectorAll(
  ".input-requirements"
)[2];
let userType = document.getElementsByName("userType");

document.addEventListener("DOMContentLoaded", (e) => {
  // Adding Event Listeners
  if (userNameInput) {
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

    // Sign Up Main Page Handling
    signUpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // Get Selected User Type
      if (userType[0].checked) {
        selectedUserType = userType[0].value;
      } else {
        selectedUserType = userType[1].value;
      }

      addUserToDB(
        userNameInput.value.toLowerCase(),
        passwordInput.value,
        selectedUserType
      );
    });
  }
});

function validateUsername() {
  userNameValidator(userNameInput, userNameLabel);
}

function validatePassword() {
  passwordValidator(passwordInput, passwordLabel);
}

function validateConfirmPassword() {
  passwordValidator(confirmPasswordInput, passwordInput.value);
}
