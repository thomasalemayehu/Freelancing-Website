import {
  openDB,
  deleteDB,
  wrap,
  unwrap,
} from "../../node_modules/idb/with-async-ittr.js";
//   Username Validating Function

//   Function to add new user to DB
async function addUserToDB(
  userName,
  password,
  accountType,
  userNameLabel,
  userNameInput,
  passwordInput,
  confirmPasswordInput
) {
  let db = await openDB("Jobber", 1, {
    upgrade(db) {
      db.createObjectStore("Users", { keyPath: "userName" });
      db.createObjectStore("UserDetails", { keyPath: "userName" });
      let objectStore = db.createObjectStore("Jobs", {
        keyPath: "id",
        autoIncrement: true,
      });
      db.createObjectStore("FilterSave", {
        keyPath: "id",
        autoIncrement: true,
      });
      db.createObjectStore("SortSave", {
        keyPath: "id",
        autoIncrement: true,
      });

      let objectStore2 = db.createObjectStore("NotificationsCenter", {
        keyPath: "id",
        autoIncrement: true,
      });

      objectStore2.createIndex("Status", "Status", { unique: false });

      objectStore.createIndex("Category", "jobCategory", { unique: false });
      objectStore.createIndex("Price", "payPrice", { unique: false });
      objectStore.createIndex("User", "jobAddedBy", { unique: false });
    },
  });

  try {
    await db.add("Users", {
      userName: userName,
      password: hashPassword(password),
      accountType: accountType,
    });

    db.close();
    // Redirect to More info page
    window.location.href = `../../RegisterInfo.html?id=${userName}&type=${accountType}`;
  } catch (e) {
    setInput(userNameInput);
    userNameInput.classList.add("is-danger");
    setLabel(userNameLabel, "Username in use");
    userNameLabel.style.color = "Red";
    setInput(passwordInput);
    passwordInput.classList.remove("is-success");
    setInput(confirmPasswordInput);
    confirmPasswordInput.classList.remove("is-success");
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
    window.location.href = `../../home.html?id=${itemToAdd.userName}&type=${itemToAdd.accountType}`;
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

async function addJobToDB(itemToAdd, userName, userType) {
  try {
    let db = await openDB("Jobber", 1, {
      upgrade(db) {
        let objectStore = db.createObjectStore("Jobs", {
          keyPath: "id",
          autoIncrement: true,
        });

        objectStore.createIndex("Category", "jobCategory", { unique: false });
        objectStore.createIndex("Price", "payPrice", { unique: false });
        objectStore.createIndex("User", "jobAddedBy", { unique: false });
      },
    });

    await db.add("Jobs", itemToAdd);
    window.location.href = `../../home.html?id=${userName}&type=${userType}`;
  } catch (e) {
    console.log(e);
  }
}

async function getAllJobs(filterValue) {
  let db = await openDB("Jobber", 1);
  let allJobs = await db.getAllFromIndex("Jobs", "Category", filterValue);
  return allJobs;
}

async function getAllDBJobs() {
  let db = await openDB("Jobber", 1);
  let values = await db.getAll("Jobs");
  return values;
}

async function saveFiltered(itemToSave) {
  let db = await openDB("Jobber", 1);

  await db.clear("FilterSave");
  await db.add("FilterSave", itemToSave);
}

async function getFiltered() {
  let db = await openDB("Jobber", 1);
  let value = await db.getAll("FilterSave");

  return value;
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
};
