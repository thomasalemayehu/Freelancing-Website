// UI Variables
let loginForm = document.querySelector(".user-detail-container");
let firstName = document.querySelector(".first-name-input");
let lastName = document.querySelector(".last-name-input");
let emailInput = document.querySelector(".email-input");
let institutionInput = document.querySelector(".education-institution-input");
let experinceInput = document.querySelector(".experience-institution-input");
let dateInput = document.querySelector(".date-of-birth-input");
let positionInput = document.querySelector(".experience-position-input")

document.addEventListener("DOMContentLoaded", () => {
    // Adding Event Listeners
    firstName.addEventListener("keyup", validatefirstname);
    lastName.addEventListener("keyup", validatelastname);
    emailInput.addEventListener("keyup", validatemail);
    institutionInput.addEventListener("keyup", validateinistitution);
    experinceInput.addEventListener("keyup", validatexperiance);
    dateInput.addEventListener("keyup", validateledate);
    positionInput.addEventListener("keyup", validateposition);

    //   Check on Login
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (validatelastname() && validatefirstname() && validatemail() && validateinistitution() && validatexperiance() && validateledate() && validateposition()) {
            login(firstName.value, lastName.value, emailInput.value, institutionInput.value, experinceInput.value, dateInput.value, positionInput.value);
        } else {
            alert("invalid input");
        }
    });

    //   Login Function
    function login(userName, lastName) {
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
                    if (cursor.value.firstName != firstName) {
                        firstName.innerText = "User not registered";
                        clearLabel(firstName);
                    }
                    if (cursor.value.lastName != lastName) {
                        lastName.innerText = "User not registered";
                        clearLabel(lastName);
                    }
                    if (cursor.value.emailInput != emailInput) {
                        emailInput.innerText = "User not registered";
                        clearLabel(emailInput);
                    }
                    if (cursor.value.institutionInput != institutionInput) {
                        institutionInput.innerText = "User not registered";
                        clearLabel(institutionInput);
                    }
                    if (cursor.value.experinceInput != experinceInput) {
                        experinceInput.innerText = "User not registered";
                        clearLabel(experinceInput);
                    }
                    if (cursor.value.dateInput != dateInput) {
                        dateInput.innerText = "User not registered";
                        clearLabel(dateInput);
                    }
                    if (cursor.value.positionInput != positionInput) {
                        positionInputs.innerText = "User not registered";
                        clearLabel(positionInput);

                    }
                }
                cursor.continue();
            }
        };
    };
}
);
