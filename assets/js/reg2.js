//   Username Validating Function
function validatefirstname() {
    let isValidated;
    let firstNameRegEx = /^[a-zA-Z][a-zA-Z]$/;
    if (firstnameRegEx.test(firstName.value)) {
        firstName.classList.remove("is-danger");
        firstName.classList.add("is-success");
        isValidated = "Validated";
    } else {
        firstName.classList.remove("is-success");
        firstName.classList.add("is-danger");
        isValidated = "";
    }
    return isValidated;
}
function validatelastname() {
    let isValidated;
    let lastNameRegEx = /^[a-zA-Z][a-zA-Z]$/;
    if (lastnameRegEx.test(lastName.value)) {
        lastName.classList.remove("is-danger");
        lastName.classList.add("is-success");
        isValidated = "Validated";
    } else {
        lastName.classList.remove("is-success");
        lastName.classList.add("is-danger");
        isValidated = "";
    }
    return isValidated;
}
function validatemail() {
    let isValidated;
    let emailInputRegEx = /^[a-zA-Z]{6,18}[@][a-zA-Z]$/;
    if (emailInputRegEx.test(emailInput.value)) {
        emailInput.classList.remove("is-danger");
        emailInput.classList.add("is-success");
        isValidated = "Validated";
    } else {
        emailInput.classList.remove("is-success");
        emailInput.classList.add("is-danger");
        isValidated = "";
    }
    return isValidated;
}
function validateinistitution() {
    let isValidated;
    let inistitutionInputRegEx = /^[a-zA-Z]{6,18}[a-zA-Z]$/;
    if (inistitutionInputRegEx.test(institutionInput.value)) {
        institutionInput.classList.remove("is-danger");
        institutionInput.classList.add("is-success");
        isValidated = "Validated";
    } else {
        institutionInput.classList.remove("is-success");
        institutionInput.classList.add("is-danger");
        isValidated = "";
    }
    return isValidated;
}
function validatexperiance() {
    let isValidated;
    let experianceInputRegEx = /^[a-zA-Z][a-zA-Z]$/;
    if (experianceInputRegEx.test(experinceInput.value)) {
        experinceInput.classList.remove("is-danger");
        experinceInput.classList.add("is-success");
        isValidated = "Validated";
    } else {
        experinceInput.classList.remove("is-success");
        experinceInput.classList.add("is-danger");
        isValidated = "";
    }
    return isValidated;
}
function validateledate() {
    let isValidated;
    let dateInputRegEx = /^{6,18}$/;
    if (dateInputRegEx.test(dateInput.value)) {
        dateInput.classList.remove("is-danger");
        dateInput.classList.add("is-success");
        isValidated = "Validated";
    } else {
        dateInput.classList.remove("is-success");
        dateInput.classList.add("is-danger");
        isValidated = "";
    }
    return isValidated;
}
function validateposition() {
    let isValidated;
    let positonInputRegEx = /^[a-zA-Z][a-zA-Z]$/;
    if (positonInputRegEx.test(positionInput.value)) {
        positionInput.classList.remove("is-danger");
        positionInput.classList.add("is-success");
        isValidated = "Validated";
    } else {
        positionInput.classList.remove("is-success");
        positionInput.classList.add("is-danger");
        isValidated = "";
    }
    return isValidated;
}


//   Adding New User to DB
function addUserToDB(firstName, lastName, emailInput, institutionInput, experinceInput, dateInput, positonInput) {
    let openRequest = indexedDB.open("UsersDB", 1);
    let dataBase;
    openRequest.onerror = function () {
        console.log("Error Opening DB");
    };
    openRequest.onsuccess = function () {
        dataBase = openRequest.result;
        let newUser = {
            firstName: firstName,
            lastName: lastName,
            email: emailInput,
            institution: institutionInput,
            experince: experinceInput,
            date: dateInput,
            position: positonInput,

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
            clearLabel(firstName);
            clearInput(lastName);
            clearInput(emailInput);
            clearInput(dateInput);
            clearInput(institutionInput);
            clearInput(positionInput);
            clearInput(experinceInput);
        };
    };
    openRequest.onupgradeneeded = function (e) {
        dataBase = e.target.result;
        let objectStore = dataBase.createObjectStore("User", {
            keyPath: "id",
            autoIncrement: true,
        });
        objectStore.createIndex("firstname", "firstname", { unique: false });
        objectStore.createIndex("lastname", "lastname", { unique: false });
        objectStore.createIndex("emailInput", "emailInput", { unique: false });
        objectStore.createIndex("dateInput", "dateInput", { unique: false });
        objectStore.createIndex("institutionInput", "institutionInput", { unique: false });
        objectStore.createIndex("experinceInput", "experinceInput", { unique: false });
        objectStore.createIndex("positionInput", "positionInput", { unique: false });
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
