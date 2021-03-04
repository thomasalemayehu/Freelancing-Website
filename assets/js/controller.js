// Exporting Functions
import {
  userNameValidator,
  passwordValidator,
  hashPassword,
  setLabel,
  setInput,
  addClass,
  removeClass,
  addUserToDB,
  addUserDetail,
  getUser,
  getUserDetail,
  addJobToDB,
  getAllJobs,
  saveFiltered,
  getFiltered,
  getAllDBJobs,
  putUserDetail,
  getJobById,
  addItemToDB,
  getItemFromDB,
  putData,
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

async function homeMain() {
  // Array of Quotes
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

  const userNameSpace = document.querySelector(".welcome-card-greeting");
  const timeSpace = document.querySelector(".welcome-card-time");
  const quoteSpace = document.querySelector(".welcome-card-quote");
  const quoteAuthorSpace = document.querySelector(".welcome-card-quote-person");
  let badgeItem = document.querySelector(".badge");
  let notificationButton = document.querySelector(".notifications-redirect");

  //   Get Quote
  let quoteOfTheDay = getQuote();
  quoteSpace.innerHTML = quoteOfTheDay[0];
  quoteAuthorSpace.innerHTML = quoteOfTheDay[1];
  const cardsContainer = Array.from(
    document.querySelectorAll(".cards-container")
  );

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

  //   Fill Username space
  getUserDetail(userName).then((userDetail) => {
    let timeOfDay = getTimeOfDay();
    let firstName = userDetail.fullName[0];
    userNameSpace.innerText = `Good ${timeOfDay} ${firstName}`;
  });

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

  // If Admin
  if (userType == "buyer") {
    notificationButton.setAttribute(
      "href",
      `../../notification.html?type=buyer`
    );
    // Checking for Notifiactions
    let notifications = await getItemFromDB(
      "NotificationsCenterAdmin",
      "Status",
      "Unresolved"
    );

    console.log(notifications.length);
    if (notifications.length != 0) {
      badgeItem.innerText = notifications.length;
      badgeItem.classList.remove("hide");
    } else {
      badgeItem.innerText = notifications.length;
    }

    let cardsContainer = Array.from(
      document.querySelectorAll(".cards-container")
    );
    cardsContainer.forEach((cardContainer) => {
      cardContainer.innerHTML = "";
    });
    let container = document.querySelector(".cards-container");
    container.classList.add("row");
    container.innerHTML = `<h1> Your Posts</h1>`;
    let userPosts = await getItemFromDB("Jobs", "User", userName);
    userPosts.forEach((jobs) => {
      container.innerHTML += `
          <!-- Card 1 -->
          <div class="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-3 mt-3 job-box-main">
            <div class="single-job-box">
              <div class="job-box-header">${jobs.jobName}</div>
              <div class="job-box-sub-header">${jobs.jobAddedBy}</div>
              <p class="job-box-description">
                ${jobs.jobDescription.substr(0, 120)}
              </p>
               <p class="job-box-description">
                Level : ${jobs.skillLevel}
              </p>
            <div>
          </div>
`;
    });
  }
  // If User
  else {
    notificationButton.setAttribute(
      "href",
      `../../notification.html?type=seller`
    );
    async function updateNotifiaction() {
      // Checking for Notifiactions
      let notifications = await getItemFromDB(
        "NotificationsCenterUser",
        "Status",
        "Unresolved"
      );

      if (notifications.length != 0) {
        badgeItem.innerText = notifications.length;
        badgeItem.classList.remove("hide");
      }
    }
    updateNotifiaction();

    (async function getUserSkills() {
      let i = 0;
      let userDetail = await getUserDetail(userName);
      let userSkills = userDetail.skills;

      userSkills.forEach(async function (userSkill) {
        let allJobs = await getAllJobs("Category", userSkill);
        displayAllJobs(allJobs.reverse(), i);

        i++;
      });
    })();
  }

  function displayAllJobs(jobs, i) {
    let categoriesContainer = document.querySelectorAll(".cards-container");

    categoriesContainer[i].innerHTML = `
    <p class="job-box-titles">${jobs[0].jobCategory}</p>
        <div class="row">
          <!-- Card 1 -->
          <div class="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-3 mt-3 job-box-main">
            <div class="single-job-box">
              <div class="job-box-header">${jobs[0].jobName}</div>
              <div class="job-box-sub-header">${jobs[0].jobAddedBy}</div>
              <p class="job-box-description">
                ${jobs[0].jobDescription.substr(0, 120)}
              </p>
               <p class="job-box-description">
                Level : ${jobs[0].skillLevel}
              </p>

              

              <div class="job-box-container">
                <button class="apply-job-button">Apply</button>
                <p class="id-box hide" >${jobs[0].id} </p>
                <div class="job-pricing-container">
                  Starting At
                  <span class="job-pricing-container-price">$${
                    jobs[0].payPrice
                  }</span>
                  
                </div>
              </div>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-3 mt-3 job-box-main" >
            <div class="single-job-box">
              <div class="job-box-header">${jobs[1].jobName}</div>
              <div class="job-box-sub-header">${jobs[1].jobAddedBy}</div>
              <p class="job-box-description">
                ${jobs[1].jobDescription.substr(0, 120)}
              </p>
               <p class="job-box-description">
                Level : ${jobs[1].skillLevel}
              </p>

              <div class="job-box-container">
                <button class="apply-job-button">Apply</button>
               <p class="id-box hide" >${jobs[1].id} </p>
                
                <div class="job-pricing-container">
                  Starting At
                  <span class="job-pricing-container-price">${
                    jobs[1].payPrice
                  }</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Card 3 -->
         <div class="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-3 mt-3 job-box-main">
            <div class="single-job-box">
              <div class="job-box-header">${jobs[2].jobName}</div>
              <div class="job-box-sub-header">${jobs[2].jobAddedBy}</div>
              <p class="job-box-description">
                ${jobs[2].jobDescription.substr(0, 120)}
              </p>
               <p class="job-box-description">
                Level : ${jobs[2].skillLevel}
              </p>

              <div class="job-box-container">
                <button class="apply-job-button">Apply</button>
                 <p class="id-box hide" >${jobs[2].id} </p>
                <div class="job-pricing-container">
                  Starting At
                  <span class="job-pricing-container-price">${
                    jobs[2].payPrice
                  }</span>
                </div>
              </div>
            </div>
          </div>

         
          
        </div>
    `;

    i += 1;
  }

  // Adding Event Listener to Job cards
  let pageWrapper = document.querySelector(".page-wrapper");
  pageWrapper.addEventListener("click", async function (e) {
    if (e.target.classList.contains("apply-job-button")) {
      let wrapperOverlay = document.querySelector(".wrapper-overlay");
      let overlayCard = document.querySelector(".job-info-display");
      let nameContainer = document.querySelector(".job-name-info-box");
      let categoryContainer = document.querySelector(".job-category-info-box");
      let deadlineContainer = document.querySelector(".job-deadline-info-box");
      let languagesContainer = document.querySelector(
        ".job-langauges-info-box"
      );
      let descriptionContainer = document.querySelector(
        ".job-desription-info-box"
      );
      let priceContainer = document.querySelector(".job-price-info-box");
      let currencyContainer = document.querySelector(".job-currency-info-box");
      let countryContainer = document.querySelector(".job-country-info-box");
      let skillContainer = document.querySelector(".job-skill-level-info-box");
      let emailContainer = document.querySelector(".email-info-box");
      let applyButton = document.querySelector(".apply-info-box");
      let cancelButton = document.querySelector(".cancel-info-box");

      let jobId = e.target.parentElement.children[1].innerText;

      applyButton.addEventListener("click", async (e) => {
        e.preventDefault();
        pageWrapper.classList.add("no-pointer");
        let userDetails = await getUserDetail(userName);
        let jobDetails = (await getJobById(Number(jobId)))[0];
        console.log(jobDetails);
        let notificationData = {
          jobId: jobId,
          jobName: jobDetails.jobName,
          jobPrice: `${jobDetails.payPrice} ${jobDetails.payCurrency} `,
          jobCategory: jobDetails.jobCategory,
          jobLanguage: jobDetails.jobLanguage,
          jobSkillLevel: jobDetails.skillLevel,
          jobDescription: jobDetails.jobDescription,
          jobDeadline: jobDetails.deadline,

          applicantID: userName,
          applicantName: userDetails.fullName,
          applicantEmail: userDetails.email,
          applicantSkills: userDetails.skills,
          applicantSkillLevel: userDetails.skillLevel,
          applicantDescription: userDetails.description,
          applicantLanguages: userDetails.languages,

          Status: "Unresolved",
        };

        await addItemToDB("NotificationsCenterAdmin", notificationData);
        console.log(notificationData);
        // console.log(job);
        // console.log(userDetails, job);
        // await addItemToDB("NotificationsCenterAdmin", {});
      });

      cancelButton.addEventListener("click", (e) => {
        e.preventDefault();
        addClass(overlayCard, "hide");
        addClass(wrapperOverlay, "hide");
      });

      async function getUserSkillLevel() {
        let userDetail = await getUserDetail(userName);
        return userDetail.skillLevel;
      }

      function convertToNumber(level) {
        let value;
        if (level === "beginner") {
          value = 0;
        } else if (level === "intermediate") {
          value = 1;
        } else if (level === "advanced") {
          value = 2;
        } else if (level === "ninja") {
          value = 3;
        }
        return value;
      }

      await getJobById(Number(jobId)).then(async (response) => {
        let userLevel;
        let jobLevel;
        response = response[0];
        nameContainer.innerText = `Job Name : ${response.jobName}`;
        categoryContainer.innerText = `Job Category : ${response.jobCategory}`;
        deadlineContainer.innerText = `Job Deadline : ${response.deadline}`;
        languagesContainer.innerText = `Job Language : ${response.jobLanguage}`;
        descriptionContainer.innerText = `Job Description : ${response.jobDescription}`;
        priceContainer.innerText = `Pay Price : ${response.payPrice}`;
        countryContainer.innerText = `Job Country : ${response.jobCountry}`;
        currencyContainer.innerText = `Pay Currency : ${response.payCurrency}`;
        skillContainer.innerText = `Skill Level : ${response.skillLevel}`;

        jobLevel = convertToNumber(
          response.skillLevel.toString().toLowerCase()
        );

        await getUserSkillLevel().then((response) => {
          userLevel = convertToNumber(response.toString().toLowerCase());
        });

        if (jobLevel > userLevel) {
          applyButton.disabled = true;
          skillContainer.style.color = "red";
        } else {
          applyButton.disabled = false;
          skillContainer.style.color = "black";
        }

        removeClass(overlayCard, "hide");
        removeClass(wrapperOverlay, "hide");
      });
    }
  });
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
    let skillLevel = document.querySelector(".skill-drop");
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

        console.log(firstName);
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
          skillLevel: skillLevel.value,
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
    let firstName = document.querySelector(".first-name-input");
    let lastName = document.querySelector(".last-name-input");
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

      console.log(firstName);

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
    // When Clearing Filter
    if (e.target.classList.contains("clear-button")) {
      console.log("Clearing");
    }
    // Applying Filter
    else if (e.target.classList.contains("apply-button")) {
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
          clearDisplayTask();
          if (sortingOrder == "D") {
            newSortedData = sortData(response[0], sortingFactor).reverse();
            displayTasks(newSortedData);
          } else {
            newSortedData = sortData(response[0], sortingFactor);
            displayTasks(newSortedData);
          }
        });
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

  function sortData(dataToFilter, sortingFactor) {
    if (sortingFactor == "Price") {
      dataToFilter.sort(function (a, b) {
        return parseFloat(a.payPrice) - parseFloat(b.payPrice);
      });
    } else {
      dataToFilter.sort(function (a, b) {
        return a.jobAddedDate - b.jobAddedDate;
      });
    }
    return dataToFilter;
  }

  function displayTasks(dataToDisplay) {
    dataToDisplay.forEach((data) => {
      contentSection.children[0].innerHTML += `  
                   
                    <div class="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-3 mt-3">
                      <div class="single-job-box" job=${data.id}>
                        <div class="job-box-header">${data.jobName}</div>
                        <div class="job-box-sub-header">Username</div>
                        <p class="job-box-description">
                          ${data.jobCategory}
                        </p>

                        <div class="job-box-container">
                         
                          <div class="job-pricing-container">
                            Starting At
                            <span class="job-pricing-container-price">$${data.payPrice}</span>
                          </div>
                        </div>
                      </div>
                    </div>`;
    });
  }

  function clearDisplayTask() {
    console.log("Clearing");
    contentSection.children[0].innerHTML = "";
  }
}
function addPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const userName = String(urlParams.get("id"));

  setDeadlineDate();

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
  let skillLevel = document.querySelector(".skill-drop");

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
      skillLevel: skillLevel.value,
    };
    if (addJobFormValidate()) {
      addJobToDB(job, userName, "buyer").then((response) => {
        console.log("Added");
      });
    }
  });

  let descriptionInput = document.querySelector(".description-input");
  let categoryInputs = Array.from(
    document.querySelectorAll(".skills-checkbox")
  );
  let skillsTitle = document.querySelector(".skill-title");
  let categoryInputsContainers = Array.from(
    document.querySelectorAll(".skills-container-main")
  );

  let languageInputs = document.querySelectorAll(".languages-checkbox");
  let languageInputsContainers = Array.from(
    document.querySelectorAll(".language-container-inner")
  );
  let languagesTitle = document.querySelector(".language-title");

  // Validating Job Name
  function validateJobName() {
    let isValidated;
    // Check Job Name Input
    let jobNameRegEx = /^[a-zA-Z]{6,18}$/;
    if (jobNameRegEx.test(jobNameInput.value)) {
      removeClass(jobNameInput, "is-danger");
      addClass(jobNameInput, "is-success");
      isValidated = true;
    } else {
      removeClass(jobNameInput, "is-success");
      addClass(jobNameInput, "is-danger");
      isValidated = false;
    }
    return isValidated;
  }

  // Validating Email
  function validateEmail() {
    let isValidated;
    let emailRegEx = /^([A-Za-z0-9_\-\.]){1,}\@([A-Za-z0-9_\-\.]){1,}\.([A-Za-z]){2,4}$/;
    if (emailRegEx.test(emailInput.value)) {
      removeClass(emailInput, "is-danger");
      addClass(emailInput, "is-success");
      isValidated = true;
    } else {
      removeClass(emailInput, "is-success");
      addClass(emailInput, "is-danger");
      isValidated = false;
    }
    return isValidated;
  }

  // Validating Description
  function validateDescription() {
    let isValidated;
    if (descriptionInput.value.length >= 10) {
      removeClass(descriptionInput, "is-danger");
      addClass(descriptionInput, "is-success");
      isValidated = true;
    } else {
      removeClass(descriptionInput, "is-success");
      addClass(descriptionInput, "is-danger");
      isValidated = false;
    }
    return isValidated;
  }

  // Validating Skill Selection
  function validateSkills() {
    let isValidated;
    if (checkSelection(categoryInputs)) {
      skillsTitle.style.color = "black";
      isValidated = true;
    } else {
      skillsTitle.style.color = "red";
      isValidated = false;
    }
    return isValidated;
  }

  // Validating Languages Selection
  function validateLanguages() {
    let isValidated;
    if (checkSelection(languageInputs)) {
      languagesTitle.style.color = "black";
      isValidated = true;
    } else {
      languagesTitle.style.color = "red";
      isValidated = false;
    }
    return isValidated;
  }

  // Validating Price Input
  function validatePrice() {
    let isValidated;
    if (priceInput.value.length <= 0) {
      removeClass(priceInput, "is-success");
      addClass(priceInput, "is-danger");
      isValidated = false;
    } else {
      removeClass(priceInput, "is-danger");
      addClass(priceInput, "is-success");
      isValidated = true;
    }
    return isValidated;
  }

  // Deadline Validation
  function validateDeadline() {
    let isValidated;
    if (deadlineInput.value) {
      removeClass(deadlineInput, "is-danger");
      addClass(deadlineInput, "is-success");
      isValidated = true;
    } else {
      removeClass(deadlineInput, "is-success");
      addClass(deadlineInput, "is-danger");
      isValidated = false;
    }
    return isValidated;
  }

  languageInputsContainers.forEach((languageInputsContainer) => {
    languageInputsContainer.addEventListener("input", validateLanguages);
  });

  categoryInputsContainers.forEach((categoryInputsContainer) => {
    categoryInputsContainer.addEventListener("input", validateSkills);
  });

  // Job Name Validation
  jobNameInput.addEventListener("keyup", validateJobName);

  //  Email Input Validation
  emailInput.addEventListener("keyup", validateEmail);

  priceInput.addEventListener("keyup", validatePrice);
  deadlineInput.addEventListener("input", validateDeadline);

  descriptionInput.addEventListener("keyup", validateDescription);

  function addJobFormValidate() {
    let v1 = validateDescription();
    let v2 = validateEmail();
    let v3 = validateJobName();
    let v4 = validateSkills();
    let v5 = validateLanguages();
    let v6 = validatePrice();
    let v7 = validateDeadline();

    return v1 && v2 && v3 && v4 && v5 && v6 && v7;
  }
}

function profilePage() {
  let editIcon = document.querySelector(".fa-edit");
  editIcon.addEventListener("click", enableFormElements);
  let firstNameInput = document.querySelector(".first-name-input");
  let lastNameInput = document.querySelector(".last-name-input");
  let emailInput = document.querySelector(".email-input");
  let dateOfBirth = document.querySelector(".date-of-birth-input");
  let countryDrop = document.querySelector(".country-input");
  let genderRadios = Array.from(document.querySelectorAll(".gender-radio"));
  let skillsCheckboxes = Array.from(
    document.querySelectorAll(".skills-checkbox")
  );
  let languagesCheckboxes = Array.from(
    document.querySelectorAll(".languages-checkbox")
  );
  let educationInstitution = document.querySelector(
    ".education-institution-input"
  );

  let educationLevel = document.querySelector(".level-of-study");
  let educationNameOfCertification = document.querySelector(
    ".education-certification-input"
  );

  let educationPreview = document.querySelector(".education-preview");

  let experienceInstitution = document.querySelector(
    ".experience-institution-input"
  );

  let experiencePosition = document.querySelector(".experience-position-input");

  let experienceDateFrom = document.querySelector(".experience-from");
  let experienceDateTo = document.querySelector(".experience-to");
  let experiencePreview = document.querySelector(".experience-preview");

  let descriptionInput = document.querySelector(".description-input");
  let currencyField = document.querySelector(".currency-drop");
  let skillLevel = document.querySelector(".skill-drop");

  let avatarContainer = document.querySelector(".more-info-avatar-container");

  let educationUploadForm = document.querySelector(".education-upload-file");

  let experienceUploadFrom = document.querySelector(".experience-file-upload");

  let buttonContainer = document.querySelector(".button-container");

  // Other Var
  let educationUploadFileUrl;
  let experienceUploadFileUrl;
  // Event Listsner for image upload forms
  educationUploadForm.addEventListener("change", function (e) {
    const reader = new FileReader();
    educationPreview.classList.add("preview");

    reader.addEventListener("load", () => {
      educationUploadFileUrl = reader.result;
      educationPreview.setAttribute("src", educationUploadFileUrl);
    });
    reader.readAsDataURL(this.files[0]);
  });

  experienceUploadFrom.addEventListener("change", function (e) {
    const reader = new FileReader();
    experiencePreview.classList.add("preview");
    reader.addEventListener("load", () => {
      experienceUploadFileUrl = reader.result;
      experiencePreview.setAttribute("src", experienceUploadFileUrl);
    });
    reader.readAsDataURL(this.files[0]);
  });

  let avatarValue;
  const urlParams = new URLSearchParams(window.location.search);
  const userName = String(urlParams.get("id"));
  const userType = String(urlParams.get("type"));
  let saveButton = document.querySelectorAll(".submit-detail-button")[0];
  saveButton.addEventListener("click", async (e) => {
    e.preventDefault();
    await putUserDetail(
      collectData(avatarValue.classList[avatarValue.classList.length - 1])
    );
    disableFormElements();
  });

  let cancelButton = document.querySelectorAll(".submit-detail-button")[1];
  cancelButton.addEventListener("click", (e) => {
    e.preventDefault();
    fillData();
    disableFormElements();
  });

  // Function to disable all form elements
  function disableFormElements() {
    firstNameInput.disabled = true;
    lastNameInput.disabled = true;
    emailInput.disabled = true;
    dateOfBirth.disabled = true;
    countryDrop.disabled = true;
    educationInstitution.disabled = true;
    educationLevel.disabled = true;
    educationNameOfCertification.disabled = true;
    experienceInstitution.disabled = true;
    experiencePosition.disabled = true;
    experienceDateFrom.disabled = true;
    experienceDateTo.disabled = true;
    descriptionInput.disabled = true;
    currencyField.disabled = true;
    skillLevel.disabled = true;
    educationUploadForm.disabled = true;
    experienceUploadFrom.disabled = true;
    genderRadios.forEach((genderRadio) => {
      genderRadio.disabled = true;
    });

    languagesCheckboxes.forEach((languagesCheckbox) => {
      languagesCheckbox.disabled = true;
    });

    skillsCheckboxes.forEach((skillsCheckbox) => {
      skillsCheckbox.disabled = true;
    });
  }
  disableFormElements();

  // Function to enable all form Elements
  function enableFormElements() {
    firstNameInput.disabled = false;
    lastNameInput.disabled = false;
    emailInput.disabled = false;
    dateOfBirth.disabled = false;
    countryDrop.disabled = false;
    educationInstitution.disabled = false;
    educationLevel.disabled = false;
    educationNameOfCertification.disabled = false;
    experienceInstitution.disabled = false;
    experiencePosition.disabled = false;
    experienceDateFrom.disabled = false;
    experienceDateTo.disabled = false;
    descriptionInput.disabled = false;
    currencyField.disabled = false;
    skillLevel.disabled = false;
    educationUploadForm.disabled = false;
    experienceUploadFrom.disabled = false;
    genderRadios.forEach((genderRadio) => {
      genderRadio.disabled = false;
    });

    languagesCheckboxes.forEach((languagesCheckbox) => {
      languagesCheckbox.disabled = false;
    });

    skillsCheckboxes.forEach((skillsCheckbox) => {
      skillsCheckbox.disabled = false;
    });

    removeClass(buttonContainer, "hide");
  }

  // Function to fill user Data
  async function fillData() {
    let userDetail = await getUserDetail(userName);
    firstNameInput.value = userDetail.fullName[0];
    lastNameInput.value = userDetail.fullName[1];
    emailInput.value = userDetail.email;
    dateOfBirth.value = userDetail.dateOfBirth;
    countryDrop.value = userDetail.country;
    educationInstitution.value = userDetail.education.educationInstitution;
    educationLevel.value = userDetail.education.educationLevelOfStudy;
    educationNameOfCertification.value =
      userDetail.education.educationCertification;
    educationPreview.setAttribute(
      "src",
      userDetail.education.educationUploadFileUrl
    );

    experienceDateFrom.value = userDetail.experience.experienceFromDate;
    experienceDateTo.value = userDetail.experience.experienceToDate;
    experiencePosition.value = userDetail.experience.experiencePosition;
    experienceInstitution.value = userDetail.experience.experienceInstitution;
    experiencePreview.setAttribute(
      "src",
      userDetail.experience.experienceUploadFileUrl
    );
    descriptionInput.value = userDetail.description;
    currencyField.value = userDetail.currency;
    skillLevel.value = userDetail.experienceLevel;

    genderRadios.forEach((genderRadio) => {
      if (genderRadio.value == userDetail.gender) {
        genderRadio.checked = true;
      }
    });

    let userSkills = userDetail.skills;
    userSkills.forEach((userSkill) => {
      skillsCheckboxes.forEach((skillsCheckbox) => {
        if (skillsCheckbox.value == userSkill) {
          skillsCheckbox.checked = true;
        }
      });
    });

    let userLanguages = userDetail.languages;
    userLanguages.forEach((userLanguage) => {
      languagesCheckboxes.forEach((languageCheckbox) => {
        if (languageCheckbox.value == userLanguage) {
          languageCheckbox.checked = true;
        }
      });
    });

    let avatars = Array.from(avatarContainer.children);
    avatars.forEach((avatar) => {
      if (avatar.classList.contains(userDetail.avatar)) {
        avatarValue = avatar;
        removeClass(avatar, "hide");
      }
    });
  }

  function collectData(avatarValue) {
    let userDetail = {
      // To Find ID from User DB
      userName: userName,
      // Profile Info
      fullName: [firstNameInput.value, lastNameInput.value],
      email: emailInput.value,
      dateOfBirth: dateOfBirth.value,
      dateOfRegistration: new Date(),
      country: countryDrop.value,
      gender: findCheckedGender(genderRadios),
      accountType: userType,

      skills: findSelected(skillsCheckboxes),
      languages: findSelected(languagesCheckboxes),

      education: {
        educationInstitution: educationInstitution.value,
        educationLevelOfStudy: educationLevel.value,
        educationCertification: educationNameOfCertification.value,
        educationUploadFileUrl,
      },

      experience: {
        experienceInstitution: experienceInstitution.value,
        experiencePosition: experiencePosition.value,
        experienceFromDate: experienceDateFrom.value,
        experienceToDate: experienceDateTo.value,
        experienceUploadFileUrl,
      },

      experienceLevel: skillLevel.value,

      description: descriptionInput.value,
      currency: currencyField.value,
      avatar: avatarValue,
      skillLevel: skillLevel.value,
    };

    return userDetail;
  }

  fillData();
}

async function notificationPage() {
  let container = document.querySelector(".outer");
  let badgeItem = document.querySelector(".badge");

  const urlParams = new URLSearchParams(window.location.search);

  const userType = String(urlParams.get("type"));

  // Setting Values

  if (userType == "buyer") {
    let notificationData = await getItemFromDB(
      "NotificationsCenterAdmin",
      "Status",
      "Unresolved"
    );

    if (notificationData.length != 0) {
      badgeItem.innerText = notificationData.length;
      badgeItem.classList.remove("hide");
      container.classList.remove("empty");
      container.innerHTML = ``;
      notificationData.forEach((data) => {
        container.innerHTML += `
    <section class="notification-container">
      <div class="notification-job">
        <h1 class="notification-center-title">Job Listing</h1>
        <div class="job-id hid">${data.jobId}</div>
        <div class="job-name-container-text notification-center-text">
          Job Name : ${data.jobName}
        </div>
        <div class="job-category-container-text notification-center-text">
          Job Category : ${data.jobCategory}
        </div>
        <div class="job-languages-container-text notification-center-text">
          Job Languages : ${data.jobLanguage}
        </div>
        <div class="job-price-container-text notification-center-text">
          Job Price : ${data.jobPrice} 
        </div>
        <div class="job-skill-level-container notification-center-text">
          Required Skills : ${data.jobSkillLevel}
        </div>
        <div class="deadline-container-text notification-center-text">Deadline : ${data.jobDeadline}</div>
        <div class="description-container-text notification-center-text">
          Description : ${data.jobDescription}
        </div>

      </div>

      <div class="notification-user">
        <h1 class="notification-center-title">Job Applicant</h1>
        <div class = "applicant-id hid">${data.applicantID}</div>
        <div class="applicant-name notification-center-text">Full Name : ${data.applicantName[0]} ${data.applicantName[1]}</div>
        <div class="applicant-skill notification-center-text">Skills : ${data.applicantSkills}</div>
        <div class="applicant-langauges notification-center-text">
          Languages : ${data.applicantLanguages}
        </div>
        <div class="applicant-email notification-center-text">Email :${data.applicantEmail}</div>
        <div class="applicant-skill-level notification-center-text">
          Skill Level : ${data.applicantSkillLevel}
        </div>
        <div class="applicant-description notification-center-text">
          Description : ${data.applicantDescription}
        </div>
        
      </div>
    </section>
    <div class="main-buttons-container">
      <button class="accept-request-button" userId=${data.applicantID} jobId =${data.jobId}>Accept Request</button>
      <button class="reject-request-button" userId=${data.applicantID} jobId =${data.jobId}>Reject Request</button>
    </div>`;
      });
    } else {
      container.classList.add("empty");
    }

    // Adding event Listener
    container.addEventListener("click", (e) => {
      let targetValue = e.target.classList;

      if (targetValue.contains("accept-request-button")) {
        // putUserDetail("NotificationsCenterAdmin", notificationData);
        let notif;
        for (let i = 0; i < notificationData.length; i++) {
          if (
            Number(notificationData[i].jobId) ==
            Number(e.target.getAttribute("jobId"))
          ) {
            notif = notificationData[i];
            console.log("Found");
            break;
          } else {
            notif = null;
          }
        }

        notif.Status = "Resolved";

        putData("NotificationsCenterAdmin", notif);
        putData("NotificationsCenterUser", notif);
        location.reload();
      } else if (targetValue.contains("reject-request-button")) {
        let notif;
        for (let i = 0; i < notificationData.length; i++) {
          if (
            Number(notificationData[i].jobId) ==
            Number(e.target.getAttribute("jobId"))
          ) {
            notif = notificationData[i];
            console.log("Found");
            break;
          } else {
            notif = null;
          }
        }

        notif.Status = "Rejected";

        putData("NotificationsCenterAdmin", notif);
        putData("NotificationsCenterUser", notif);
        location.reload();
      } else if (targetValue.contains("view-applicant")) {
        console.log("Applicant");
      } else if (targetValue.contains("view-job")) {
        console.log("Job");
      }
    });
  } else {
    // let notificationData = await getItemFromDB(
    //   "NotificationsCenterUser",
    //   "Status",
    //   "Resolved"
    // );

    // // if (notificationData.length != 0) {
    // //   badgeItem.innerText = notificationData.length;
    // //   badgeItem.classList.remove("hide");
    // //   container.classList.remove("empty");
    // //   container.innerHTML = ``;
    // // }
    // console.log(notificationData);
    console.log("Here");
  }
}
function setDeadlineDate() {
  let unformattedDate = new Date();
  let fullYear = unformattedDate.getFullYear();
  let month = unformattedDate.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }

  let day = unformattedDate.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  let formattedDate = `${fullYear}-${month}-${day}`;
  let deadlineInput = document.querySelector(".deadline-input");

  deadlineInput.setAttribute("min", formattedDate);
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
    return gender[0].value;
  } else {
    console.log(gender[1].value);
    return gender[1].value;
  }
}

function checkSelection(checkboxes) {
  let oneSelected = false;
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      oneSelected = true;
    }
  });
  return oneSelected;
}

async function common() {
  const urlParams = new URLSearchParams(window.location.search);
  const userName = String(urlParams.get("id"));
  const userType = String(urlParams.get("type"));

  let dashboardLink = document.querySelector(".dashboard-link");
  dashboardLink.addEventListener("click", (e) => {
    dashboardLink.setAttribute(
      "href",
      `../../home.html?id=${userName}&type=${userType}`
    );
  });

  let exploreLink = document.querySelector(".explore-link");
  exploreLink.addEventListener("click", (e) => {
    exploreLink.setAttribute(
      "href",
      `../../explore.html?id=${userName}&type=${userType}`
    );
  });

  let profileRedirect = document.querySelector(".profile-redirect");
  profileRedirect.addEventListener("click", (e) => {
    profileRedirect.setAttribute(
      "href",
      `../../profile.html?id=${userName}&type=${userType}`
    );
  });

  let notificationRedirect = document.querySelector(".notifications-redirect");
  notificationRedirect.addEventListener("click", (e) => {
    notificationRedirect.setAttribute(
      "href",
      `../../notification.html?id=${userName}&type=${userType}`
    );
  });

  if (userType == "buyer") {
    let badgeItem = document.querySelector(".badge");

    // Checking for Notifiactions
    let notifications = await getItemFromDB(
      "NotificationsCenterAdmin",
      "Status",
      "Unresolved"
    );

    console.log(notifications.length);
    if (notifications.length != 0) {
      badgeItem.innerText = notifications.length;
      badgeItem.classList.remove("hide");
    } else {
      badgeItem.innerText = notifications.length;
    }
  }
}

export {
  signUpMain,
  loginMain,
  homeMain,
  registerInfoMain,
  explorePage,
  addPage,
  profilePage,
  notificationPage,
  common,
};
