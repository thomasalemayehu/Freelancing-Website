// Exporting Functions
import {
  userNameValidator,
  passwordValidator,
  hashPassword,
  setLabel,
  setInput,
  addClass,
  addUserToDB,
  addUserDetail,
  getUser,
  getUserDetail,
  addJobToDB,
  getAllJobs,
  saveFiltered,
  getFiltered,
  getAllDBJobs,
} from "./Model.js";

function signUpMain() {
  // UI Variables
  let selectedUserType;

  let signUpForm = document.querySelector(".sign-up-form");
  let userNameInput = document.querySelector(".user-name-input");
  let passwordInput = document.querySelector(".password-input");
  let userNameRequirements = document.querySelector(".input-requirements");
  let passwordRequirements = document.querySelectorAll(
    ".input-requirements"
  )[1];
  let userNameLabel = document.querySelector(".userNameErrorLabel");
  let passwordLabel = document.querySelector(".passwordErrorLabel");
  let confirmPasswordLabel = document.querySelector(
    ".confirmPasswordErrorLabel"
  );
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

        console.log(
          userNameValidator(userNameInput, userNameLabel),
          passwordValidator(passwordInput, passwordLabel),
          confirmPasswordInput.value == passwordInput.value
        );

        if (
          userNameValidator(userNameInput, userNameLabel) &&
          passwordValidator(passwordInput, passwordLabel) &&
          confirmPasswordInput.value == passwordInput.value
        ) {
          console.log("Calling Add");
          addUserToDB(
            userNameInput.value.toLowerCase(),
            passwordInput.value,
            selectedUserType,
            userNameLabel,
            userNameInput,
            confirmPasswordInput,
            passwordInput
          );
        } else {
          if (userNameInput.value.length == 0) {
            userNameInput.classList.add("is-danger");
          } else {
            passwordInput.classList.add("is-danger");
            confirmPasswordInput.classList.add("is-danger");
          }
        }
      });
    }
  });

  function validateUsername() {
    return userNameValidator(userNameInput, userNameLabel);
  }

  function validatePassword() {
    return passwordValidator(passwordInput, passwordLabel);
  }

  function validateConfirmPassword() {
    passwordValidator(confirmPasswordInput, passwordInput.value);
  }
}

function loginMain() {
  // UI Variables
  let loginForm = document.querySelector(".login-form");
  let userNameInput = document.querySelector(".user-name-input");
  let passwordInput = document.querySelector(".password-input");
  let userNameRequirements = document.querySelector(".input-requirements");
  let passwordRequirements = document.querySelectorAll(
    ".input-requirements"
  )[1];
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
      // Clear Error Labels
      setLabel(userNameLabel);
      setLabel(passwordLabel);
    });
    userNameInput.addEventListener("blur", () => {
      userNameRequirements.classList.remove("show");
      userNameRequirements.classList.add("hide");
    });

    passwordInput.addEventListener("focus", () => {
      passwordRequirements.classList.remove("hide");
      passwordRequirements.classList.add("show");
      // Clear Error Labels
      setLabel(userNameLabel);
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
            passwordLabel.style.color = "Red";
            addClass(passwordLabel, "warning");
            setInput(passwordInput);
            setInput(userNameInput);
          }
        } else {
          setLabel(userNameLabel, "User is not Registered");
          userNameLabel.style.color = "Red";
          addClass(userNameLabel, "warning");
          setInput(userNameInput);
          setInput(passwordInput);
        }
      });
    }
  });
}

function homeMain() {
  let quotes = [
    [
      "All our dreams can come true, if we have the courage to pursue them.",
      "Walt Disney",
    ],
    [
      "Don’t limit yourself. Many people limit themselves to what they think they can do. You can go as far as your mind lets you. What you believe, remember, you can achieve.",
      "Mary Kay Ash",
    ],
    [
      "I wake up every morning and think to myself, ‘how far can I push this company in the next 24 hours.",
      "Leah Busque",
    ],
    [
      "You’ve gotta dance like there’s nobody watching, love like you’ll never be hurt, sing like there’s nobody listening, and live like it’s heaven on earth.",
      "William W. Purkey",
    ],
    [
      "Smart people learn from everything and everyone, average people from their experiences, stupid people already have all the answers.",
      "Socrates",
    ],
  ];

  const urlParams = new URLSearchParams(window.location.search);
  const userName = String(urlParams.get("id"));
  const userType = String(urlParams.get("type"));

  if (userType == "buyer") {
    const cardsContainer = Array.from(
      document.querySelectorAll(".cards-container")
    );

    //  Clearing Cards
    cardsContainer.forEach((card) => {
      card.innerHTML = "";
    });

    cardsContainer[0].innerHTML = `<button class="post-new-job">Post</button>`;
    let postButton = document.querySelector(".post-new-job");
    postButton.addEventListener("click", (e) => {
      e.preventDefault();
      // addJobToDB(
      //   {
      //     jobName: "Job-2",
      //     jobDescreption:
      //       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque quaerat reiciendis nemo, maiores excepturi est.",
      //     jobAddedBy: userName,
      //     jobAddedDate: new Date(),
      //     jobCategory: "Music and Audio",
      //     deadline: new Date(2021, 2, 25),
      //     payPrice: 62,
      //     payCurrency: "Birr",
      //     jobCountry: "Ethiopia",
      //     jobLanguage: ["English", "French", "Afan Oromo"],
      //   },
      //   userName,
      //   userType
      // ).then(() => {
      //   console.log("Posted Job");
      // });
      window.location.href = `../../addJob.html?id=${userName}`;
    });
  } else {
    const userNameSpace = document.querySelector(".welcome-card-greeting");
    const timeSpace = document.querySelector(".welcome-card-time");
    const quoteSpace = document.querySelector(".welcome-card-quote");
    const quoteAuthorSpace = document.querySelector(
      ".welcome-card-quote-person"
    );

    //   Fill Username space
    getUserDetail(userName).then((userDetail) => {
      let timeOfDay = getTimeOfDay();
      let firstName = userDetail.fullName[0];
      userNameSpace.innerText = `Good ${timeOfDay} ${firstName}`;
    });

    //   Start Timer
    (function startTime() {
      //retrieve date
      var today = new Date();
      var h = today.getHours();
      var m = today.getMinutes();
      //get the AM / PM value
      let am_pm = h > 12 ? "PM" : "AM";
      // Convert the hour to 12 format
      h = h % 12 || 12;
      // add zero

      // Assign to the UI [p]
      timeSpace.innerHTML = `${h}:${addZero(m)} ${am_pm}`;
      setTimeout(startTime, 500);
    })();

    //   Get Quote
    let quoteOfTheDay = getQuote();
    quoteSpace.innerHTML = quoteOfTheDay[0];
    quoteAuthorSpace.innerHTML = quoteOfTheDay[1];
  }

  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    } // add zero in front of numbers < 10
    return i;
  }
  function getQuote() {
    let index = Math.floor(Math.random() * 4.5);
    return quotes[index];
  }

  function getTimeOfDay() {
    let today = new Date();

    let time = today.getHours();
    if (time < 12) {
      return "Morning";
    } else if (time < 18) {
      return "Afternoon";
    } else {
      return "Evening";
    }
  }
}

function registerInfoMain() {
  const urlParams = new URLSearchParams(window.location.search);
  const userName = String(urlParams.get("id"));
  const userType = String(urlParams.get("type"));

  // UI Variables
  let inputForm = document.querySelector(".user-detail-container");
  let firstName = document.querySelector(".first-name-input");
  let lastName = document.querySelector(".last-name-input");
  let emailInput = document.querySelector(".email-input");
  let dateOFBirth = document.querySelector(".date-of-birth-input");
  let country = document.querySelector(".country-input");
  let gender = document.querySelectorAll('input[type="radio"]');
  let experienceLevel = document.querySelector(".skill-drop");
  let selectedAvatarValue;

  // More Info
  let descriptionText = document.querySelector(".description-input");
  let currency = document.querySelector(".currency-drop");

  if (userType == "seller") {
    // / Skills info
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
    let experiencePosition = document.querySelector(
      ".experience-position-input"
    );
    let experienceFromDate = document.querySelector(".experience-from");
    let experienceToDate = document.querySelector(".experience-to");
    let experienceUpload = document.querySelector(".experience-file-upload");
    let experiencePreview = document.querySelector(".experience-preview");

    // Other Var
    let educationUploadFileUrl;
    let experienceUploadFileUrl;
    document.addEventListener("DOMContentLoaded", (e) => {
      let avatarContainer = document.querySelector(
        ".more-info-avatar-container"
      );

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
      // Event Listener for Form
      inputForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Function to Find Selected Gender

        // Function to Find Selected Checkbox

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
          accountType: userType,

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

          experienceLevel: experienceLevel.value,

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
    });
  }
  // Admin Reg Info
  else {
    inputForm.innerHTML = ` <!-- Full Name Input -->
      <div class="user-detail-name-container">
        <!-- First Name Input -->
        <div class="field user-detail-field">
          <label class="label">First Name :</label>
          <div class="control">
            <input
              class="input first-name-input"
              type="text"
              placeholder="John"
            />
          </div>
        </div>
        <!-- Last Name Input  -->
        <div class="field user-detail-field">
          <label class="label">Last Name :</label>
          <div class="control">
            <input
              class="input last-name-input"
              type="text"
              placeholder="Doe"
            />
          </div>
        </div>
      </div>

      <!-- Email , DOB and Country Input -->
      <div class="user-detail-name-container">
        <!-- Email Input -->
        <div class="field email-detail-field">
          <label class="label">Email :</label>
          <div class="control">
            <input
              class="input email-input"
              type="email"
              placeholder="johndoe21@gmail.com"
            />
          </div>
        </div>

        <div class="user-detail-field inner-detail-container">
          <!-- Date of Birth Input  -->
          <div class="field date-of-birth-detail-field">
            <label class="label">Date of Birth :</label>
            <div class="control">
              <input
                class="input date-of-birth-input"
                type="date"
                max="2003-11-02"
              />
            </div>
          </div>

          <!-- Country Input -->
          <div class="field country-detail-field">
            <label class="label">Country :</label>
            <div class="control">
              <div class="select">
                <select class="select-drop country-input">
                  <option value="Ethiopia">Ethiopia</option>
                  <option value="Kenya">Kenya</option>
                  <option value="South Sudan">South Sudan</option>
                  <option value="North Sudan">North Sudan</option>
                  <option value="Somalia">Somalia</option>
                  <option value="Tanzania">Tanzania</option>
                  <option value="Uganda">Uganda</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Gender -->
      <div class="user-detail-name-container">
        <div class="control">
          <label class="radio">
            <input type="radio" name="Gender" value="Male" />
            Male
          </label>
          <label class="radio">
            <input type="radio" name="Gender" value="Female" />
            Female
          </label>
        </div>
      </div>
        <!-- More Info -->
      <div class="user-detail-name-container">
        <div class="more-info-container">
          <p class="more-info-title">More Information</p>
          <div class="more-info-top-container">
            <div class="field description-field">
              <label for="" class="label">Description :</label>
              <textarea
                class="textarea description-input"
                placeholder="e.g. Hello world"
              ></textarea>
            </div>

            <div class="field currency-field">
              <label for="" class="label">Currency :</label>
              <div class="control">
                <div class="select">
                  <select name="" id="" class="currency-drop">
                    <option value="">Birr ETB</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="more-info-bottom">
            <p class="more-info-inner-title">Select Your Avatar</p>
            <div class="more-info-avatar-container">
              <div class="avatar-container avatar-1"></div>
              <div class="avatar-container avatar-2"></div>
              <div class="avatar-container avatar-3"></div>
              <div class="avatar-container avatar-4"></div>
              <div class="avatar-container avatar-5"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="button-container">
        <input type="submit" value="Continue" class="submit-detail-button" />
      </div>
      `;

    let avatarContainer = document.querySelector(".more-info-avatar-container");

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
    inputForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let userDetail = {
        userName: userName,
        fullName: [firstName.value, lastName.value],
        email: emailInput.value,
        dateOfBirth: dateOFBirth.value,
        dateOfRegistration: new Date(),
        country: country.value,
        gender: findCheckedGender(gender),
        accountType: userType,
        description: descriptionText.value,
        currency: currency.value,
        avatar: selectedAvatarValue,
      };

      addUserDetail(userDetail);
    });
  }
}

function explorePage() {
  let filteredOnce = false;
  let priceRange = [];
  let categories = [];
  let languages = [];
  let deadline = [];
  let sortingFactor;
  let sortingOrder;
  let data;

  let filterContainer = document.querySelector(".filter-section");
  let filterTagContainer = document.querySelector(".filter-tag-section");
  let contentSection = document.querySelector(".content-section");

  let sortContainer = document.querySelector(".sort-section");

  sortContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("clear-button")) {
      console.log("Clearing");
    } else if (e.target.classList.contains("apply-button")) {
      let inputForms = e.target.parentElement.parentElement.parentElement;
      if (inputForms.classList.contains("sortBy")) {
        let values = [];
        let radioValues = Array.from(inputForms.children[1].children[0]);
        radioValues.forEach((radioValue) => {
          values.push(radioValue);
        });

        let newSortedData;
        sortingFactor = getChecked(values)[0];
        getFiltered().then((response) => {
          newSortedData = sortData(response[0], sortingFactor, sortingOrder);
          clearDisplayTask();
          // console.log(newSortedData);
          // console.log("Displaying");
          // console.log(newSortedData);
          // displayTasks(newSortedData);
          console.log(newSortedData);
          displaySorted(newSortedData);
        });

        // sortData(data, sortingFactor, sortingOrder);
        // console.log(sortingFactor);
      } else if (inputForms.classList.contains("sortOrder")) {
        let values = [];
        let radioValues = Array.from(inputForms.children[1].children[0]);
        radioValues.forEach((radioValue) => {
          values.push(radioValue);
        });

        sortingOrder = getChecked(values)[0];
        // sortData(data, sortingFactor, sortingOrder);
        console.log("Sort Order is : " + sortingOrder[0]);

        // console.log(sortingOrder);
      }
    } else {
      console.log("Out");
    }
  });

  // Events related to filtering
  filterContainer.addEventListener("click", (e) => {
    let inputForms = Array.from(
      e.target.parentElement.parentElement.children[0].children
    );
    // Clearing
    if (e.target.classList.contains("clear-button")) {
      // If Price
      if (inputForms[0].classList.contains("price")) {
        priceRange.push(inputForms[0].children[1].value);
        priceRange.push(inputForms[1].children[1].value);
        removeFilter("Price");
      }
      // If Category
      else if (inputForms[0].classList.contains("category")) {
        let leftContainers = Array.from(inputForms[0].children);
        let rightContainers = Array.from(inputForms[1].children);
        let values = [];
        leftContainers.forEach((leftContainer) => {
          values.push(leftContainer.children[0]);
        });
        rightContainers.forEach((rightContainer) => {
          values.push(rightContainer.children[0]);
        });
        removeFilter("Category");
      }
      // If Language
      else if (inputForms[0].classList.contains("language")) {
        let containers = Array.from(inputForms[0].children);
        let values = [];
        containers.forEach((container) => {
          values.push(container.children[0]);
        });

        languages = getChecked(values);
        removeFilter("Language");
      }

      // If Deadline
      else if (inputForms[0].classList.contains("deadline")) {
        let containers = Array.from(inputForms[0].parentElement);
        let values = [];
        containers.forEach((container) => {
          values.push(container);
        });

        //   console.log(values);
        deadline = getChecked(values);
        removeFilter("Deadline");
      }
    }
    // Applying
    else if (e.target.classList.contains("apply-button")) {
      // If Price
      if (inputForms[0].classList.contains("price")) {
        priceRange.push(inputForms[0].children[1].value);
        priceRange.push(inputForms[1].children[1].value);
        inputForms[0].parentElement.parentElement.parentElement.children[0].classList.add(
          "activated-filter"
        );
        let textValue = `$ ${priceRange[0]} - ${priceRange[1]}`;
        createFilterTag(textValue, "Price");
        let newData;
        if (filteredOnce) {
          getFiltered().then((response) => {
            newData = filterByPrice(response[0], priceRange[0], priceRange[1]);
            clearDisplayTask();
            displayTasks(newData);
            saveFiltered(newData);
          });
        } else {
          getAllJobs("Price").then((response) => {
            newData = filterByPrice(response, priceRange[0], priceRange[1]);
            clearDisplayTask();
            displayTasks(newData);
            filteredOnce = true;
            saveFiltered(newData);
          });
        }

        // let newData = filterByPrice(data, priceRange[0], priceRange[1]);

        // displayTasks(newData);
      }
      // If Category
      else if (inputForms[0].classList.contains("category")) {
        let leftContainers = Array.from(inputForms[0].children);
        let rightContainers = Array.from(inputForms[1].children);
        let values = [];
        leftContainers.forEach((leftContainer) => {
          values.push(leftContainer.children[0]);
        });
        rightContainers.forEach((rightContainer) => {
          values.push(rightContainer.children[0]);
        });
        categories = getChecked(values);

        inputForms[0].parentElement.parentElement.parentElement.children[0].classList.add(
          "activated-filter"
        );

        categories.forEach((category) => {
          createFilterTag(category, "Category");
        });
        let newData;

        if (filteredOnce) {
          getFiltered().then((response) => {
            newData = filterByQuality(response[0], categories, "Category");
            clearDisplayTask();
            displayTasks(newData);
            saveFiltered(newData);
          });
        } else {
          getAllJobs("Category").then((response) => {
            newData = filterByQuality(response, categories, "Category");
            clearDisplayTask();
            displayTasks(newData);
            saveFiltered(newData);
            filteredOnce = true;
            // console.log(response);
          });
        }
      }
      // If Language
      else if (inputForms[0].classList.contains("language")) {
        let leftContainers = Array.from(inputForms[0].children);
        let rightContainers = Array.from(inputForms[1].children);

        let values = [];
        leftContainers.forEach((leftContainer) => {
          values.push(leftContainer.children[0]);
        });
        rightContainers.forEach((rightContainer) => {
          values.push(rightContainer.children[0]);
        });
        languages = getChecked(values);
        inputForms[0].parentElement.parentElement.parentElement.children[0].classList.add(
          "activated-filter"
        );

        languages.forEach((langauge) => {
          createFilterTag(langauge, "Language");
        });

        let newData;
        if (filteredOnce) {
          getFiltered().then((response) => {
            newData = filterByQuality(response[0], languages, "Language");
            clearDisplayTask();
            displayTasks(newData);
            saveFiltered(newData);
          });
        } else {
          getAllDBJobs().then((response) => {
            newData = filterByQuality(response, languages, "Language");
            clearDisplayTask();
            displayTasks(newData);
            saveFiltered(newData);
            filteredOnce = true;
            // console.log(response);
          });
        }
      }
      // If Deadline
      else if (inputForms[0].classList.contains("deadline")) {
        let containers = Array.from(inputForms[0].parentElement);
        let values = [];
        containers.forEach((container) => {
          values.push(container);
        });

        //   console.log(values);
        deadline = getChecked(values);
        inputForms[0].parentElement.parentElement.parentElement.children[0].classList.add(
          "activated-filter"
        );
        //   console.log(checked);

        createFilterTag("Deadline", "Deadline");
      }
    } else {
      console.log("Out");
    }
  });

  function removeFilterTag(tagType) {
    let tags = Array.from(filterTagContainer.children);
    tags.forEach((tag) => {
      if (tag.getAttribute("tagType") == tagType) {
        tag.remove();
      }
    });
  }
  function checkFilterTag(tagType) {
    let tags = Array.from(filterTagContainer.children);
    if (tagType == "Deadline") {
      tags.forEach((tag) => {
        if (tag.getAttribute("tagType") == "Deadline") {
          tag.remove();
        }
      });
    } else if (tagType == "Price") {
      tags.forEach((tag) => {
        if (tag.getAttribute("tagType") == "Price") {
          tag.remove();
        }
      });
    }
  }
  function createFilterTag(textValue, tagType) {
    checkFilterTag(tagType);
    let tagDiv = document.createElement("div");
    tagDiv.classList.add("tag");
    tagDiv.setAttribute("tagType", tagType);

    let tagNameDiv = document.createElement("div");
    tagNameDiv.classList.add("tag-name");

    let tagNameText = document.createTextNode(textValue);

    // let removeTag = document.createElement("i");
    // removeTag.classList.add("fas");
    // removeTag.classList.add("fa-times");
    // removeTag.classList.add("remove-tag");

    tagNameDiv.appendChild(tagNameText);
    tagDiv.appendChild(tagNameDiv);
    // tagDiv.appendChild(removeTag);

    filterTagContainer.append(tagDiv);
  }

  function removeFilter(textValue) {
    let commonContainer = filterContainer.children;
    // Clearing Price
    if (textValue == "Price") {
      let inputForms = Array.from(
        commonContainer[0].children[1].children[0].children
      );
      // Clearing Input forms
      inputForms.forEach((inputForm) => {
        inputForm.reset();
      });

      // Removing Active Filter Class
      filterContainer.children[0].children[0].classList.remove(
        "activated-filter"
      );

      // Removing Filter Tag
      removeFilterTag("Price");

      // Clearing Price Range Data
      priceRange = [];

      console.log("Cleared Price");
    }
    // Clearing Category
    else if (textValue == "Category") {
      let leftContainer = Array.from(
        commonContainer[1].children[1].children[0].children[0].children
      );

      let rightContainer = Array.from(
        commonContainer[1].children[1].children[0].children[1].children
      );
      // Clearing Checkbox
      leftContainer.forEach((leftItem) => {
        leftItem.children[0].checked = false;
      });

      // Clearing Checkbox
      rightContainer.forEach((leftItem) => {
        leftItem.children[0].checked = false;
      });
      // Removing Active Filter Class
      commonContainer[1].children[0].classList.remove("activated-filter");

      // Removing Filter Tag
      removeFilterTag("Category");
      // Clearing Filtering Factor
      categories = [];
      console.log("Cleared Category");
    }
    // Clearing Language
    else if (textValue == "Language") {
      let leftContainer = Array.from(
        commonContainer[2].children[1].children[0].children[0].children
      );

      let rightContainer = Array.from(
        commonContainer[2].children[1].children[0].children[1].children
      );
      // Clearing Checkbox
      leftContainer.forEach((leftItem) => {
        leftItem.children[0].checked = false;
      });

      // Clearing Checkbox
      rightContainer.forEach((leftItem) => {
        leftItem.children[0].checked = false;
      });
      // Removing Active Filter Class
      commonContainer[2].children[0].classList.remove("activated-filter");

      // Removing Filter Tag
      removeFilterTag("Language");
      // Clearing Filtering Factor
      languages = [];
      console.log("Cleared Language");
    } else if (textValue == "Deadline") {
      console.log(commonContainer[3]);
    }
  }
  function getChecked(data) {
    let checked = [];
    data.forEach((datum) => {
      if (datum.checked) {
        checked.push(datum.value);
      }
    });
    return checked;
  }

  function filterByPrice(dataToFilter, minPrice, maxPrice) {
    let filteredResult = [];
    dataToFilter = Array.from(dataToFilter);
    if (maxPrice && minPrice) {
      dataToFilter.forEach((datum) => {
        if (
          Number(datum.payPrice) >= Number(minPrice) &&
          Number(datum.payPrice) <= Number(maxPrice)
        ) {
          filteredResult.push(datum);
        }
      });
    } else {
      filteredResult = dataToFilter;
    }
    return filteredResult;
  }

  function filterByQuality(dataToFilter, filteringFactors, filterBy) {
    let filteredResult = [];
    if (filteringFactors.length != 0) {
      filteringFactors.forEach((filteringFactor) => {
        if (filterBy == "Category") {
          dataToFilter.forEach((datum) => {
            if (datum.jobCategory == filteringFactor) {
              filteredResult.push(datum);
            }
          });
        } else if (filterBy == "Language") {
          console.log(dataToFilter);
          dataToFilter.forEach((datum) => {
            if (datum.jobLanguage.indexOf(filteringFactor)) {
            } else {
              filteredResult.push(datum);
            }
          });
        }
      });
    } else {
      filteredResult = dataToFilter;
    }
    return filteredResult;
  }

  // function filterByDeadline(dataToFilter, filteringDeadlineFactor) {}

  function sortData(dataToFilter, sortingFactor, sortingOrder = ["A"]) {
    let sortedPicks;
    dataToFilter.sort(function (a, b) {
      if (sortingFactor == "D") {
        console.log("Sorting By " + sortingFactor[0]);
        if (sortingOrder == "D") {
          sortedPicks = data.slice().sort((a, b) => b.date - a.date);
        } else {
          sortedPicks = data.slice().sort((b, a) => b.date - a.date);
        }
      } else if (sortingFactor == "P") {
        console.log("Sorting By " + sortingFactor[0]);
        if (sortingOrder == "D") {
          sortedPicks = data.sort(
            (a, b) => Number(b.payPrice) - Number(a.payPrice)
          );
        } else {
          sortedPicks = data.sort(
            (b, a) => Number(b.payPrice) - Number(a.payPrice)
          );
        }
      } else if (sortingFactor == "Pouplarity") {
        console.log("Sorting By " + sortingFactor[0]);
        if (sortingOrder == "D") {
          sortedPicks = data.slice().sort((a, b) => b.hitCount - a.hitCount);
        } else {
          sortedPicks = data.slice().sort((b, a) => b.hitCount - a.hitCount);
        }
      } else {
        sortedPicks = dataToFilter;
      }
    });
    // console.log(sortedPicks);
    return sortedPicks;
  }

  function displayTasks(dataToDisplay) {
    dataToDisplay.forEach((data) => {
      contentSection.children[0].innerHTML += `  
                   
                    <div class="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-3 mt-3">
                      <div class="single-job-box">
                        <div class="job-box-header">${data.jobName}</div>
                        <div class="job-box-sub-header">Username</div>
                        <p class=job-box-description">
                          ${data.jobCategory}
                        </p>

                        <div class="job-box-container">
                          <div class="job-bookmark-container">
                            <i class="far fa-bookmark"></i>
                          </div>
                          <div class="job-pricing-container">
                            Starting At
                            <span class="job-pricing-container-price">$${data.payPrice}</span>
                          </div>
                        </div>
                      </div>
                    </div>`;
    });
  }

  function displaySorted(dataToDisplay) {
    console.log("Displaying Sorted");
    // clearDisplayTask();
    // contentSection.children[0].innerHTML = "";
    // dataToDisplay.forEach((newData) => {
    //   contentSection.children[0].innerHTML += `

    //                 <div class="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-3 mt-3">
    //                   <div class="single-job-box">
    //                     <div class="job-box-header">${newData.jobCategory}</div>
    //                     <div class="job-box-sub-header">Username</div>
    //                     <p class=job-box-description">
    //                       ${newData.jobCategory}
    //                     </p>

    //                     <div class="job-box-container">
    //                       <div class="job-bookmark-container">
    //                         <i class="far fa-bookmark"></i>
    //                       </div>
    //                       <div class="job-pricing-container">
    //                         Starting At
    //                         <span class="job-pricing-container-price">$${newData.payPrice}</span>
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </div>`;
    // });
    console.log(dataToDisplay);
  }

  function clearDisplayTask() {
    console.log("Clearing");
    contentSection.children[0].innerHTML = "";
  }
}

function addPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const userName = String(urlParams.get("id"));

  // UI Variables
  let inputForm = document.querySelector(".user-detail-container");
  let jobNameInput = document.querySelector(".job-name-input");
  let priceInput = document.querySelector(".price-input");
  let emailInput = document.querySelector(".email-input");
  let deadlineInput = document.querySelector(".deadline-input");
  let categoryRadios = document.querySelectorAll(".skills-checkbox");
  let languageCheckbox = document.querySelectorAll(".languages-checkbox");
  let DescriptionInput = document.querySelector(".description-input");
  let currencyInput = document.querySelector(".currency-drop");
  let countryInput = document.querySelector(".country-input");

  inputForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let job = {
      jobName: jobNameInput.value,
      jobDescription: DescriptionInput.value,
      jobAddedBy: userName,
      jobAddedDate: new Date(),
      jobCategory: findSelected(categoryRadios)[0],
      deadline: deadlineInput.value,
      payPrice: priceInput.value,
      payCurrency: currencyInput.value,
      jobCountry: countryInput.value,
      jobLanguage: findSelected(languageCheckbox),
    };
    addJobToDB(job, userName, "buyer").then((response) => {
      console.log("Added");
    });
  });
}

function findSelected(checkboxes) {
  let selected = [];
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      selected.push(checkbox.value);
    }
  });

  return selected;
}

function findCheckedGender(gender) {
  if (gender[0].checked) {
    console.log(gender[0].value);
    return gender[0].value;
  } else {
    console.log(gender[1].value);
    return gender[1].value;
  }
}

export {
  signUpMain,
  loginMain,
  homeMain,
  registerInfoMain,
  explorePage,
  addPage,
};
