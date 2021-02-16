import { addUserDetail } from "./model.js";

// import { addClass, removeClass } from "./model.js";

const urlParams = new URLSearchParams(window.location.search);
const userName = String(urlParams.get("id"));

// UI Variables
let inputForm = document.querySelector(".user-detail-container");
let firstName = document.querySelector(".first-name-input");
let lastName = document.querySelector(".last-name-input");
let emailInput = document.querySelector(".email-input");
let dateOFBirth = document.querySelector(".date-of-birth-input");
let country = document.querySelector(".country-input");
let gender = document.querySelectorAll('input[type="radio"]');

// Skills info
let skills = document.querySelectorAll(".skills-checkbox");

// Languages Info
let languages = document.querySelectorAll(".languages-checkbox");
// Education Info
let educationInstitution = document.querySelector(
  ".education-institution-input"
);
let educationLevelOfStudy = document.querySelector(".level-of-study");
let educationCertification = document.querySelector(
  ".education-certification-input"
);
let educationUpload = document.querySelector(".education-upload-file");
let educationPreview = document.querySelector(".education-preview");

// Experience Info
let experienceInstitution = document.querySelector(
  ".experience-institution-input"
);
let experiencePosition = document.querySelector(".experience-position-input");
let experienceFromDate = document.querySelector(".experience-from");
let experienceToDate = document.querySelector(".experience-to");
let experienceUpload = document.querySelector(".experience-file-upload");
let experiencePreview = document.querySelector(".experience-preview");
// More Info
let descriptionText = document.querySelector(".description-input");
let currency = document.querySelector(".currency-drop");
let avatarContainer = document.querySelector(".more-info-avatar-container");

// Other Var
let educationUploadFileUrl;
let experienceUploadFileUrl;
let selectedAvatarValue;
document.addEventListener("DOMContentLoaded", (e) => {
  // Event Listener for Form
  inputForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Function to Find Selected Gender
    function findCheckedGender() {
      if (gender[0].checked) {
        return gender[0].value;
      } else {
        return gender[1].value;
      }
    }

    // Function to Find Selected Checkbox
    function findSelected(checkboxes) {
      let selected = [];
      checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          selected.push(checkbox.value);
        }
      });

      return selected;
    }

    let userDetail = {
      // To Find ID from User DB
      userName: userName,
      // Profile Info
      fullName: [firstName.value, lastName.value],
      email: emailInput.value,
      dateOfBirth: dateOFBirth.value,
      dateOfRegistration: new Date(),
      country: country.value,
      gender: findCheckedGender(gender),

      skills: findSelected(skills),
      languages: findSelected(languages),

      education: {
        educationInstitution: educationInstitution.value,
        educationLevelOfStudy: educationLevelOfStudy.value,
        educationCertification: educationCertification.value,
        educationUploadFileUrl,
      },

      experience: {
        experienceInstitution: experienceInstitution.value,
        experiencePosition: experiencePosition.value,
        experienceFromDate: experienceFromDate.value,
        experienceToDate: experienceToDate.value,
        experienceUploadFileUrl,
      },

      description: descriptionText.value,
      currency: currency.value,
      avatar: selectedAvatarValue,
    };

    addUserDetail(userDetail);
  });

  // Event Listener For Education Upload
  educationUpload.addEventListener("change", function (e) {
    const reader = new FileReader();
    educationPreview.classList.add("preview");

    reader.addEventListener("load", () => {
      educationUploadFileUrl = reader.result;
      educationPreview.setAttribute("src", educationUploadFileUrl);
    });
    reader.readAsDataURL(this.files[0]);
  });

  // Event Listener For Experience Upload
  experienceUpload.addEventListener("change", function (e) {
    const reader = new FileReader();
    experiencePreview.classList.add("preview");
    reader.addEventListener("load", () => {
      experienceUploadFileUrl = reader.result;
      experiencePreview.setAttribute("src", experienceUploadFileUrl);
    });
    reader.readAsDataURL(this.files[0]);
  });

  // Event Listener for Avatar Selector
  avatarContainer.addEventListener("click", (e) => {
    // Removing Selection Indicator From all
    let avatars = Array.from(avatarContainer.children);

    avatars.forEach((avatar) => {
      avatar.classList.remove("selected-avatar");
    });

    // Adding Selection Indicator to selected
    let selectedAvatar = e.target;
    selectedAvatar.classList.add("selected-avatar");

    // Getting Class value for storage
    selectedAvatarValue = e.target.classList[1];
  });
});

// Validate Names
function validateName(name) {
  if (name.length >= 2) {
    return "Validated";
  } else {
    return "";
  }
}
