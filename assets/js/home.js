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
    card.innerHTML = "<h1>Buyer Account</h1>";
  });
} else {
  const userNameSpace = document.querySelector(".welcome-card-greeting");
  const timeSpace = document.querySelector(".welcome-card-time");
  const quoteSpace = document.querySelector(".welcome-card-quote");
  const quoteAuthorSpace = document.querySelector(".welcome-card-quote-person");

  //   Fill Username space
  getUserDetail(userName).then((userDetail) => {
    let timeOfDay = getTimeOfDay();
    let firstName = userDetail.fullName[0];
    console.log(firstName);
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
    m = addZero(m);
    // Assign to the UI [p]
    timeSpace.innerHTML = `${h}:${m} ${am_pm}`;
    setTimeout(startTime, 900);
  })();

  //   Get Quote
  let quoteOfTheDay = getQuote();
  quoteSpace.innerHTML = quoteOfTheDay[0];
  quoteAuthorSpace.innerHTML = quoteOfTheDay[1];
}

function addZero(i) {
  if (i < 10) {
    i = `0${i}`;
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
